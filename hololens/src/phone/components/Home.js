// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available



function xr(xp,override) {
  var shader = override != undefined || twx.app.isPreview() ? 'xray2gl'+xp : 'xray2hl'+xp;
  return shader;
}


function hl(xp,override) {
  var shader = override != undefined || twx.app.isPreview() ? 'desaturatedgl'+xp : 'desaturatedhl'+xp;
  return shader;
}


function ps(xp,override) {
  var shader = override != undefined || twx.app.isPreview() ? 'panelHilite2gl'+xp : 'panelHilite2hl'+xp;
  return shader;
}


$scope.app.params.xray = true;
$scope.onplay = function() {
  $scope.app.params.xray = ! $scope.app.params.xray;
  if ($scope.app.params.xray) {
    $scope.view.wdg.hero.shader = xr(";r f 0.0;g f 1.0;b f 0.0;cutoffDepth f 3;cutoutDepth f 1");
    $scope.view.wdg.insides.visible = true;
  } else {
    $scope.view.wdg.hero.shader = xr(";r f 1.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 1");
    $scope.view.wdg.insides.visible = false;
  }
}

$scope.onload = function() {
  $scope.view.wdg.hero.shader = xr(";r f 1.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.2");
  $scope.view.wdg.insides.shader = xr(";r f 0.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.5");
  //$scope.view.wdg.outside.shader = hl(";blend f 0;nearFade f 0.5");
}
	
$scope.setUI = function(node,icon, append, nf, ff, state, shader) {
 
  var indicator = 'r f '+(state<=2?1:0)+';g f '+(state>=2?1:0)+';b f 0';
  var tnode = node.trim();
  var bname = tnode;
  var tname = icon + ' ' + append;
  var wdg   = $scope.view.wdg[bname];
  
  wdg.src = tname;
  wdg.shader = shader+";"+indicator+";nf f "+nf+";ff f "+ff;
  
  //cache these values for later
  wdg.nf = nf;
  wdg.ff = ff;
  
  $scope.$applyAsync();
}


encodeImg = function(objctx, src, textAttrs, callback) {
  //debugger;
  var retImg;
  if (src === undefined) { callback(retImg); return; }
  var image = new Image();
  image.onload = function () {
    var canvas    = document.createElement('canvas');
    canvas.width  = image.width;
    canvas.height = image.height;
     
    // Get drawing context for the Canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
     
    // Draw the actual text
    textAttrs.forEach(function(ta) {
      ctx.font      = ta.font;
      ctx.fillStyle = ta.fillcolor;
      // todo: should we allow images as well as text?
	  ctx.fillText(ta.text, ta.x, ta.y);
    });
     
    var retImg = canvas.toDataURL();
    callback(objctx, retImg, image.width, image.height);
  };
  image.src = src;
};

$scope.go = function() {
 
    $scope.count+=1;
    $scope.panelText('sensor1',1,[ 
              {title:'Sealing pressure'}, 
			  {value:42, x:950}
                            ],0.5,3,1);
    $scope.panelText('sensor2',1,[ 
              {title:'Vacuum pressure'}, 
              {alert:'Low pressure'} ,
                            ],0.5,13,2);
    $scope.panelText('sensor3',3,[ 
              {title:'Sealing temp 1'}, 
			  {value:42, x:950}
                            ],0.5,3,3);
    $scope.panelText('sensor4',3,[ 
              {title:'Sealing temp 2'}, 
              {value:42, x:950}
                            ],0.5,3,3);
 
}


$scope.panelText = function(panel,idx,text,nf,ff,state) {
  
  var tblock = []; 
  var yline  = 500;
  let rgbindicator = 'rgba('+(state<=2?255:0)+','+(state>=2?255:0)+',0,1)';
  
  // build up the text bloc
  text.forEach(function (line) {
    if      (line.title!=undefined) tblock.push({text:line.title, x:500, y:365, font:'120px Arial', fillcolor:'rgba(254,150,6,1)'});
    else if (line.alert!=undefined) tblock.push({text:line.alert, x:500, y:165, font:'120px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor : rgbindicator });
    else if (line.text !=undefined) {
      tblock.push({text:line.text, x:350, y:yline, font:'96px Arial', fillcolor:'rgba(255,168,36,1)'}); yline+=150;
    }
    else if (line.value != undefined) tblock.push({text:line.value, x:line.x!=undefined?line.x :660, y:1000, font:'300px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor :'rgba(196,196,4,1)'});
  });
  
  //keep these around for the async callbac
  var cnf    = nf;
  var cff    = ff;
  var cstate = state;
  
  // async update the factory line indicator to show that we are now simulating production changes ith new line in place...
  encodeImg(panel,
            'app/resources/Uploaded/panelInfo'+idx+'.png', 
            tblock,
            function(target,img,w,h) {

              $scope.setUI(target, img, 'app/resources/Uploaded/panelInfo'+idx+'mask.png', cnf, cff, cstate, ps(''));

            }
  );
}
