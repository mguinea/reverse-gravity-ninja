function Enemy(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.direction = DIR_LEFT;
}

Enemy.prototype.fill = function(){
	ctx.fillRect(this.x - cam.x, this.y - cam.y, this.width, this.height);
}

Enemy.prototype.draw = function(){
			animations['enemy'].play(this.x, this.y, blockSize, blockSize, this.direction, 1);
}

Enemy.prototype.intersects = function(rect){
	if (rect !== undefined) {
		return (this.x < rect.x + rect.width &&
				this.x + this.width > rect.x &&
				this.y < rect.y + rect.height &&
				this.y + this.height > rect.y);
	}
}