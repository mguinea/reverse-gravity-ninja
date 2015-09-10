function Player(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.vx = 0;
	this.vy = 0;
	this.onGround = false;
	this.sprites = [];
	this.state = 0; // 0 = idle
	this.dir = 0; // 0 = right, 1 = left
}

Player.prototype.fill = function(){
	ctx.fillRect(this.x - cam.x, this.y - cam.y, this.width, this.height);
}

Player.prototype.intersects = function(rect){
	if (rect !== undefined) {
		return (this.x < rect.x + rect.width &&
				this.x + this.width > rect.x &&
				this.y < rect.y + rect.height &&
				this.y + this.height > rect.y);
	}
}

Player.prototype.draw = function(){
	switch(this.state){
		case 0: // IDLE
			animations['idle'].play(player.x, player.y, blockSize, blockSize, this.dir, gravity);
		break;
		case 1: // WALK
			animations['walk'].play(player.x, player.y, blockSize, blockSize, this.dir, gravity);
		break;
		case -1: // DEAD
			//dead
			animations['dead'].play(player.x, player.y, blockSize, blockSize, this.dir, gravity);
		break;
		default:
			animations['idle'].play(player.x, player.y, blockSize, blockSize, this.dir, gravity);
		break;
	}
}