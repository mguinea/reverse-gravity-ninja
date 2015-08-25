var animations = [];
function Animation(frames, velocity){
	this.frames = frames;
	this.velocity = velocity;
}
Animation.prototype.play = function(x, y, width, height, dir, grativy){
	if(dir == null)
		dir = 1;
	if(gravity == null)
		gravity = 1;
	
	var frame = (~~(gameLoops * this.velocity) % this.frames.length);
	ctx.save();
	//ctx.rotate(rotation * Math.PI/180);
	// ctx.globalAlpha = 1;
	ctx.translate(x + width / 2 - cam.x, y + height / 2 - cam.y);
	ctx.scale(dir, gravity);
	ctx.drawImage(spritesheet, 
		sprites[this.frames[frame]].x, 
		sprites[this.frames[frame]].y, 
		sprites[this.frames[frame]].width, 
		sprites[this.frames[frame]].height,    -width / 2, -height / 2, width, height);
	ctx.restore();
}