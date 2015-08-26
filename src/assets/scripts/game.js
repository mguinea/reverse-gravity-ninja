// VARIABLES


var loadingTimer = 0;

var mainScene=new Scene();
var gameScene=new Scene();
var 
solidWalls = {},
gameLoops = 0,
frame = 0,
GAME_STATE	= {
	MAIN_PAGE : 0,
	SELECT_LEVEL : 1,
	PLAY : 2,
},
tiles = {
	background : {
		x : 0,
		y : 0,
	},
	top_left : {
		x : 16,
		y : 0,
	},
	top_middle : {
		x : 24,
		y : 0,
	},
	dead : {
		x : 40,
		y : 0,
	},
	target : {
		x : 56,
		y : 0,
	}
},
current_game_state = GAME_STATE.MAIN_PAGE,
player 		= new Player(64, 100, 29, 32),
gravity 	= 1,
blockSize	= 32,
spritesheet = new Image(),
wall		= [],
lava		= [],
decoTile	= [],
spawn		= {	
	x : 0,
	y : 0
},
target		= [],

map0 = [23,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 9, 9, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 
	4, 4, 4,-1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,-2, 4, 4, 4, 4, 
	4, 4, 4, 1, 1, 0, 0, 4, 4, 9, 4, 4, 9, 4, 4, 0, 0, 1, 1, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
];

map1 = [23,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 9, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 1, 
	4, 4, 4,-1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,-2, 1, 1, 1, 1, 
	4, 4, 4, 1, 1, 0, 0, 4, 4, 0, 4, 4, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
];

map2 = [23,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,				
	1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-2, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
var maps = [map0, map1, map2];
var current_map = 0;

// SCENES

gameScene.load = function(map){
	canvas.width 	= 512; // 32 cols
	canvas.height 	= 384; // 24 cols
	spritesheet.src = 'assets/media/spritesheet.png';
	cam = new Camera();
	
	solidWalls[1] = true;
	solidWalls[3] = true;
	solidWalls[4] = true;
	
	if(map == null)
		map = map0;
	setMap(map, blockSize);
	player.x = spawn.x;
	player.y = spawn.y;
	player.animation = 0;
	sprites['skewers'] = new Sprite(16, 0, 8, 8);
	
	sprites['grass_2'] = new Sprite(0, 0, 8, 8);
	sprites['grass_3'] = new Sprite(8, 0, 8, 8);
	
	sprites['idle_1'] = new Sprite(0, 8, 8, 8);
	sprites['idle_2'] = new Sprite(8, 8, 8, 8);
	sprites['idle_3'] = new Sprite(16, 8, 8, 8);
	animations['idle'] = new Animation(['idle_1', 'idle_2', 'idle_3', 'idle_2'], 0.1);
	
	sprites['walk_1'] = new Sprite(24, 8, 8, 8);
	sprites['walk_2'] = new Sprite(32, 8, 8, 8);
	sprites['walk_3'] = new Sprite(40, 8, 8, 8);
	animations['walk'] = new Animation(['walk_1', 'walk_2', 'walk_3', 'walk_2'], 0.15);
	
	sprites['lava_1'] = new Sprite(56, 0, 8, 8);
	sprites['lava_2'] = new Sprite(64, 0, 8, 8);
	sprites['lava_3'] = new Sprite(72, 0, 8, 8);
	sprites['lava_4'] = new Sprite(48, 8, 8, 8);
	sprites['lava_5'] = new Sprite(56, 8, 8, 8);
	sprites['lava_6'] = new Sprite(64, 8, 8, 8);
	sprites['lava_7'] = new Sprite(72, 8, 8, 8);
	animations['lava'] = new Animation(['lava_1', 'lava_2', 'lava_3', 'lava_4', 'lava_5', 'lava_6', 'lava_7'], 0.09);
	
	reset_level();
	
	// Load sprites
	//player.sprites.push(new Sprite(0, 0, 130, 180));
	//player.sprites.push(new Sprite(130, 0, 130, 180));
	ctx.globalAlpha = 0;
	++loadingTimer;

}

function input(){
	if(68 in keysDown || 39 in keysDown){ // INPUT RIGHT
		if (player.vx < 5) {
			player.vx += 1;
			player.state = 1;
			player.dir = 1;
		}
	} else if (player.vx > 0) {
		player.vx -= 1;
		player.state = 0;
	}
	if(65 in keysDown || 37 in keysDown){ // INPUT LEFT
		if (player.vx > -5) {
			player.vx -= 1;
			player.state = 1;
			player.dir = -1;
		}
	} else if (player.vx < 0) {
		player.vx += 1;
		player.state = 0;
	}
	if(87 in keysDown || 38 in keysDown){ // INPUT UP
		if(player.onGround){
			gravity = -1;
		}
	}
	if(83 in keysDown || 40 in keysDown){ // INPUT DOWN
		if(player.onGround){
			gravity = 1;
		}
	}
}

gameScene.update = function(){
	++gameLoops;
	
	frame = (~~(gameLoops * 0.1) % 4);
	if(loadingTimer >= 1){
		++loadingTimer;
		ctx.globalAlpha += loadingTimer / 300;
	}
	if(loadingTimer >= 100){
		loadingTimer = 0;	
	}
	if(loadingTimer == 0){// IF we are not loading a level
		ctx.globalAlpha = 1;
		input();
	}
	
	// Set gravity
	if(gravity == 1){
		player.vy += 1;
		if (player.vy > 10) {
			player.vy = 10;
		}
	}
	if(gravity == -1){
		player.vy -= 1;
		if (player.vy < -10) {
			player.vy = -10;
		}
	}
	
	// Move player in x
	player.x += player.vx;
	for (i = 0, l = wall.length; i < l; i += 1) {
		if (player.intersects(wall[i])) {
			if (player.vx > 0) {
				player.x = wall[i].x - wall[i].width;
			} else {
				player.x = wall[i].x + wall[i].width;
			}
			player.vx = 0;
		}
	}
	
	// Move player in y
	player.onGround = false;
	player.y += player.vy;
	for (i = 0, l = wall.length; i < l; ++i) {
		if(gravity == 1){
			if (player.intersects(wall[i])) {
				if (player.vy > 0) {
					player.y = wall[i].y - wall[i].height;
					player.onGround = true;
				} 
				player.vy = 0;
			}
		}
		if(gravity == -1){
			if (player.intersects(wall[i])) {
				if (player.vy < 0) {
					player.y = wall[i].y + wall[i].height;
					player.onGround = true;
				} 
				player.vy = 0;
			}
		}
	}
	
	// Player in lava
	for (i = 0, l = lava.length; i < l; ++i) {
		if (player.intersects(lava[i])) {
			reset_level();
		}
	}
	
	// Player in target
	for (i = 0, l = target.length; i < l; ++i) {
		if (player.intersects(target[i])) {
			++current_map;
			if(current_map >= maps.length){// Si llegamos al tope es que hemos ganado
				console.log("Win");
			}
			loadScene(gameScene, maps[current_map]);
		}
	}
	
	// Focus player
	cam.focus(player.x, player.y);
}

gameScene.draw = function(){
	// Pixel art enabled
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	if(loadingTimer == 0){
		// Draw Background
		/*for(i = 0; i < 16; ++i){
			for(j = 0; j < 12; ++j){
				ctx.drawImage(spritesheet, tiles.background.x, tiles.background.y, 8, 7,  i * blockSize, j * blockSize, 32, 32);
			}
		}*/
		// Create gradient
		var grd = ctx.createLinearGradient(0,0,0,canvas.height);
		grd.addColorStop(0,"#8ED6FF");
		grd.addColorStop(1,"#004CB3");

		// Fill with gradient
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		
		// Draw walls
		for (i = 0, l = wall.length; i < l; i += 1) {
			wall[i].draw();
		}
		
		// Draw decoTiles
		for (i = 0, l = decoTile.length; i < l; i += 1) {
			decoTile[i].draw();
		}
		
		// Draw lava
		ctx.fillStyle = '#f00';
		for (i = 0, l = lava.length; i < l; i += 1) {
			lava[i].draw();
		}
		
		// Draw target
		ctx.fillStyle = '#f0f';
		for (i = 0, l = target.length; i < l; i += 1) {
			target[i].draw();
		}
		
		// Draw player
		ctx.fillStyle = '#0f0';
		player.draw();
	}else{
		ctx.font = '30pt Calibri';
		ctx.textAlign='center';
		ctx.fillStyle = '#ecf0f1';
		ctx.fillText('Level ' + current_map, canvas.width / 2,canvas.height / 2);
	}
}

mainScene.update=function(){
	++gameLoops;
	if(13 in keysDown){
		loadScene(gameScene ,map0);
	}
}

mainScene.draw=function(){	
	// Pixel art enabled
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.globalAlpha = 1;
	//
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 70;

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
	// Clean canvas
	ctx.fillStyle = '#efefef';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//				
	ctx.fillStyle='#000';
	ctx.font = '30pt Calibri';
	ctx.textAlign='center';
	ctx.fillText('Reverse Gravity Ninja', canvas.width / 2,60);
	ctx.font = '12pt Calibri';
	ctx.textAlign ='center';
	if((~~(gameLoops * 0.1) % 2) == 0)
		ctx.fillText('> Press Enter <',canvas.width - 200, 250);
	animations['idle'].play(50, 200, 128, 128, 1, 1);
}


// OTHER FUNCTIONS
function setMap(map, blockSize) {
	var col = 0,
		row = 0
		columns = map[0];
	wall.length = 0;
	decoTile.length = 0;
	lava.length = 0;
	for (i = 1, l = map.length; i < l; i += 1) {
		if (map[i] in solidWalls) { // Solid wall
			wall.push(new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize, map[i]));
		} 
		if (map[i] === 4) { // Solid wall
			decoTile.push(new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize, map[i]));
		} 
		if (map[i] === 2 || map[i] === 9) { // Dead
			lava.push(new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize, map[i]));
		} 
		if (map[i] === -1){ // Spawn
			spawn.x = col * blockSize;
			spawn.y = row * blockSize;
		} 
		if (map[i] === -2){ // Target
			target.push(new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize, map[i]));
		}
		col += 1;
		if (col >= columns) {
			row += 1;
			col = 0;
		}
	}
	worldWidth = columns * blockSize;
	worldHeight = row * blockSize;
}

function reset_level(){
	player.x = spawn.x;
	player.y = spawn.y;
	player.vy = 0;
	player.vx = 0;
	player.dir = 1;
	player.state = 0;
	gravity = 1;
}