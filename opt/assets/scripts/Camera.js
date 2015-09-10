function Camera() {
	this.x = 0;
	this.y = 0;
}

Camera.prototype.focus = function (x, y) {
	this.x = x - canvas.width / 2;
	this.y = y - canvas.height / 2;

	if (this.x < 0) {
		this.x = 0;
	} else if (this.x > worldWidth - canvas.width) {
		this.x = worldWidth - canvas.width;
	}
	if (this.y < 0) {
		this.y = 0;
	} else if (this.y > worldHeight - canvas.height) {
		this.y = worldHeight - canvas.height;
	}
}