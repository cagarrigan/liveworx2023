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