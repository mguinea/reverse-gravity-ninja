function Rectangle(x, y, width, height, type){
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				this.type = type;
			}
			
			Rectangle.prototype.fill = function(){
				ctx.fillRect(this.x - cam.x, this.y - cam.y, this.width, this.height);
			}
			
			Rectangle.prototype.draw = function(){
				var cood;
				switch(this.type){
					case -2:
						coord = tiles.target;
					break;
					case 1:
						coord = sprites['grass_2'];
					break;
					case 2:
						coord = sprites['skewers'];
					break;
					case 3:
						coord = sprites['grass_2'];
					break;
					case 4:
						coord = sprites['grass_3'];
					break;
					case -4:
						coord = sprites['skewers'];
					break;
					default:
						
					break;
				}
				ctx.drawImage(spritesheet, coord.x, coord.y, 8, 8,    this.x - cam.x, this.y - cam.y, this.width, this.height);
			}