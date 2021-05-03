//@input vec3 openAngle

script.createEvent("UpdateEvent").bind(Update);

var transform = script.getSceneObject().getTransform();

var desiredAngle = vec3.zero();
var moveSpeed = 1;
var DEG_TO_RAD = 0.0174533;

script.api.Move = function(shouldOpen){
    moveSpeed = shouldOpen ? 1 : 10;
    desiredAngle = shouldOpen ? script.openAngle : vec3.zero();
}

function Update(){    
    var rotation = quat.fromEulerVec(desiredAngle.uniformScale(DEG_TO_RAD));
    transform.setLocalRotation(quat.lerp(transform.getLocalRotation(),rotation, getDeltaTime() * moveSpeed));
}