var canvas, ctx, keysDown = {}, cam = null
worldWidth	= 0,
worldHeight	= 0,
i = null,
l = null;


window.addEventListener('load',init,false);

function init(){
	canvas	= document.getElementById('canvas');
	ctx		= canvas.getContext('2d');

	worldWidth 	= canvas.width;
	worldHeight = canvas.height;
	
	gameScene.load();
	gameLoop();
	render();
}
function gameLoop(){
	if(scenes.length)
		scenes[currentScene].update();
	
	setTimeout(gameLoop, 1000 / 60);
}

function render(){
	if(scenes.length){
		cleanCanvas('#000');
		
		// Draw what is in game
		scenes[currentScene].draw(ctx);
	}

	requestAnimationFrame(render);
}

function cleanCanvas(color){
	// Clean canvas
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame 	|| 
		window.webkitRequestAnimationFrame 	|| 
		window.mozRequestAnimationFrame 	|| 
		function(callback){window.setTimeout(callback,17);};
})();

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);