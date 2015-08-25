var currentScene = 0, scenes = [];

function Scene(){
	this.id = scenes.length;
	scenes.push(this);
}

Scene.prototype.load=function(){};
Scene.prototype.update=function(){};
Scene.prototype.draw=function(){};

function loadScene(scene, map){
	currentScene=scene.id;
	scenes[currentScene].load(map);
}