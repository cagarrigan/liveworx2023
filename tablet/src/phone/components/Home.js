// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available

$scope.app.params.stepIndex = 0;
$scope.app.params.stepLabel = "(1/13) Power the machine down. Lock Out";
$scope.$on("newStep", function (evt, arg) {
  console.log('1',arg);
  $scope.app.params.stepLabel = arg;
});

$scope.$watch('view.wdg["hero-animation"].currentStep', function(val) {
  console.log('2',val);
  $scope.app.params.stepIndex = val - 1;
  $scope.app.params.waypointList[$scope.app.params.stepIndex].label = $scope.app.params.stepLabel;
    //addCG
  $scope.app.params.stepHeader = val + ' of 13';

//  tml3dRenderer.setProperties("activeWaypointLabel",{billboard:false, occluding: true});
//  tml3dRenderer.setScale("activeWaypointLabel",0.15,0.15,0.15);
//  tml3dRenderer.setRotation("activeWaypointLabel",0,90,0);

});

$scope.$on('stepstarted', function(evt, arg, arg2, arg3) { 
  console.log('3',arg3);
  var parsedArg3 = JSON.parse(arg3);
  $scope.view.wdg['textArea-1']['text'] = parsedArg3.stepDescription;
});

$scope.app.params.waypointList = 
  [ 
    {"position":{"x":3.367,"y":0.628,"z":-0.593},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step1"},
    {"position":{"x":1.839,"y":-0.392,"z":-0.645}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step4"},
    {"position":{"x":4.018,"y":-0.392,"z":-0.415}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step5"},
    {"position":{"x":4.071,"y":-0.392,"z":0.064},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step6"},
    {"position":{"x":4.071,"y":-0.392,"z":0.064},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step6a"},
    {"position":{"x":4.071,"y":-0.392,"z":-0.685}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step10"},
    {"position":{"x":4.123,"y":-0.406,"z":-1.046}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step11a"},
    {"position":{"x":4.071,"y":-0.392,"z":0.064},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step12"},
    {"position":{"x":4.071,"y":-0.392,"z":0.064},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step13"},
    {"position":{"x":4.071,"y":-0.392,"z":0.064},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step14"}, 
    {"position":{"x":1.839,"y":-0.392,"z":-0.645}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step15"},
    {"position":{"x":1.839,"y":-0.392,"z":-0.645}, "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step4"},
    {"position":{"x":3.367,"y":0.628,"z":-0.593},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step2"},
    {"position":{"x":3.367,"y":0.628,"z":-0.593},  "gaze":{"x":0,"y":0,"z":1},"up":{"x":0,"y":1,"z":0},"cutoff":0.5,"proximityThreshold":2,"label":"step1"},
  ];
  
$scope.$watch("app.view['Home'].wdg['wayfinder']['value']",function(changed) {
  console.log(changed);
});
$scope.init = function() {
  $scope.view.wdg['textArea-1']['text'] = "Let's get started - find the power switch. Disable power, and apply lock out tafg to ensure safety";
};

////////////////////////////////////////CG ADD////////////////////////////


            ////////////add from SG HL EXPERIENCE
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


           ////////////New code
var heroMode = false;

$scope.heroMode = function(){
 
  heroMode = true;
  // $scope.view.wdg['spatial-shell']['visible'] = true;
  $scope.view.wdg['hero-animation']['sequence'] = '';
  $scope.view.wdg['heroHL']['visible'] = true;
  $scope.view.wdg['heroHL']['sequence'] = 'app/resources/Uploaded/machine-illustration4c_Med/l-Creo%203D%20-%20hololens.pvi';
  $scope.view.wdg['wayfinder']['enabled'] = false;
  
    
  $timeout(function() {
       $scope.view.wdg['hero-animation']['visible'] = false;
       $scope.view.wdg['heroHL']['visible'] = true;
       $scope.view.wdg['insidesHL']['visible'] = true;
       $scope.view.wdg.heroHL.shader = xr(";r f 1.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.2");
       $scope.view.wdg.insidesHL.shader = xr(";r f 0.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.5");
  }, 300);
  
  
}

$scope.animationMode = function(){
  heroMode = false;
  $scope.view.wdg['hero-animation']['sequence'] = 'app/resources/Uploaded/S5503/l-Creo%203D%20-%20Figure%201.pvi';
  $scope.view.wdg['heroHL']['sequence'] = '';
  $scope.init();
   $scope.view.wdg['wayfinder']['enabled'] = true;
    
  $timeout(function() {
       $scope.view.wdg['hero-animation']['visible'] = false;
       $scope.view.wdg['heroHL']['visible'] = true;;
       $scope.view.wdg['insidesHL']['visible'] = true;
       $scope.view.wdg.heroHL.shader = xr(";r f 1.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.2");
       $scope.view.wdg.insidesHL.shader = xr(";r f 0.0;g f 1.0;b f 0.0;farFade f 3;nearFade f 0.5");
  }, 200);
  
  
}

$scope.showPanel = function(){
 if (heroMode==false) {
   $scope.app.fn.triggerWidgetService('popup-1','showpopup');
 }
  
}
