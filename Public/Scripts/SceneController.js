//@input Component.RenderMeshVisual[] faces
//@input Component.ScriptComponent[] items
//@input Component.RenderMeshVisual[] insides
//@input Component.Camera picCam
//@input Asset.Texture camTexture

script.createEvent("TouchStartEvent").bind(ToggleAction);

var delayedClose = script.createEvent("DelayedCallbackEvent");
delayedClose.bind(function() {
    OpenFace(false)
});

var delayedOpen = script.createEvent("DelayedCallbackEvent");
delayedOpen.bind(function() {
    ToggleAction();
});

var isOpen = false;
OpenFace(false)
delayedOpen.reset(.25);

function ToggleAction(){
    if (isOpen){
        MoveItems(false);
        delayedClose.reset(.4);
    } else {
        TakeSnapShots();
        OpenFace(true)
        MoveItems(true);
    }
    
    isOpen = !isOpen;
}

function MoveItems(shouldOpen){
    script.items.forEach(function(element) {
        element.api.Move(shouldOpen);
    });
}

function OpenFace(open){
    EnableElements(script.faces,open);
    EnableElements(script.insides,open);
}

function EnableElements(rends,active){
    rends.forEach(function(element) {
        element.enabled = active;
    });
}

function TakeSnapShots(){
	script.faces.forEach(function(element) {
		element.mainPass.baseTex = script.camTexture.copyFrame();
		element.snap(script.picCam);
	});
}