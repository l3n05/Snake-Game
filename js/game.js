// set up the game arena with canvas
// executes once when the program begins
function setup() {
	createCanvas(600, 400);
	setUpSnake();
}

let speed_x = 0,speed_y = 0,collapsed = false,tail = [],score = 0,frames = 5,bordercolor1 = 255,bordercolor2 = 0,scorecolor1 = 255,scorecolor2 = 0;

class Border {
	constructor(_x, _y, _sizex, _sizey) {
		this.x = _x;
		this.y = _y;
		this.sizex = _sizex;
		this.sizey = _sizey;
	}

	show() {
		fill(0, bordercolor2, bordercolor1);
		noStroke();
		rect(this.x, this.y, this.sizex, this.sizey);
	}
}

let rightborder = new Border (580, 0, 20, 400);
let leftborder = new Border (0, 0, 20, 400);
let topborder = new Border (0, 0, 600, 20);
let bottomborder = new Border (0, 380, 600, 20);

// function to change direction based on key pressed
function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		if(speed_x == 0) {
			speed_x -= 20;
			speed_y = 0;
		}
	} else if (keyCode === RIGHT_ARROW) {
			if(speed_x == 0) {
				speed_x += 20;
				speed_y = 0;
			}
	} else if (keyCode === UP_ARROW) {
			if(speed_y == 0) {
				speed_y -= 20;
				speed_x = 0;
			}
	} else if (keyCode === DOWN_ARROW) {
			if(speed_y == 0) {
				speed_y += 20;
				speed_x = 0;
			}
	}
}

class Food {
	constructor(_x, _y, _size) {
		this.x = _x;
		this.y = _y;
		this.size = _size;
	}

	show() {
		fill(255, 0, 0);
		noStroke();
		rect(this.x, this.y, this.size, this.size);
	}

	eatFood(head) {
		if((this.x == head.x) && (this.y == head.y)) {
			this.x = Math.floor((Math.random() * 28) + 1) * 20;
			this.y = Math.floor((Math.random() * 18) + 1) * 20;
			score += 100;
			frames += 0.5;
			addBlock();
		}
	}
}

// create the first food at random location in the canvas between the borders
let X = Math.floor((Math.random() * 28) + 1) * 20;
let Y = Math.floor((Math.random() * 18) + 1) * 20;
let food = new Food(X, Y, 20);

class Block {
	constructor(_x, _y, _size) {
		this.x = _x,
		this.y = _y,
		this.size = _size
	}

	show() {
		fill(255);
		stroke(255, 200, 0);
		rect(this.x, this.y, this.size, this.size);
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}
}

// initialize the snake with the first block as head
function setUpSnake() {
		tail[0] = new Block(100, 200, 20);
}

// adds a new block into the snake in order to make it grow
function addBlock() {
	xlCoor = tail[tail.length - 1].getX();
	ylCoor = tail[tail.length - 1].getY();
	tail.push(new Block(xlCoor - speed_x, ylCoor - speed_y, 20));
}

// displays current score and speed
function showScoreAndSpeed() {
	fill(scorecolor2, scorecolor1, 0);
	text('Score : ' + score + ' Speed : ' + frames, 20, 14);
}

// executes when the game ends
function gameEnded() {
	bordercolor1 = 0;
	bordercolor2 = 255;
	scorecolor1 = 0;
	scorecolor2 = 255;
	rightborder.show();
	leftborder.show();
	topborder.show();
	bottomborder.show();
	showScoreAndSpeed();
	setTimeout(function(){ location.reload(true); }, 800);
}

// checks if the snake head collapsed with the tail or went out of canva's borders
// if not, then it just keeps moving forward else, the game ends
function update() {
	let xCoor,yCoor;
	xCoor = tail[0].getX();
	yCoor = tail[0].getY();
	for(let i = 1; i < tail.length; i++) {
		if((xCoor == tail[i].x) && (yCoor == tail[i].y)) {
			collapsed = true;
			break;
		}
	}
	if(tail[0].x >= width - 20 || tail[0].y >= height - 20 || tail[0].x < 0 + 20 || tail[0].y < 0 + 20 || collapsed == true) {
		gameEnded();
	}
	else {
		tail.unshift(new Block(xCoor + speed_x, yCoor + speed_y, 20));
		tail.pop();
	}
}

// executes continuously until the program stops
function draw() {
	background(0);
	rightborder.show();
	leftborder.show();
	topborder.show();
	bottomborder.show();
	frameRate(frames);
	food.show();
	food.eatFood(tail[0]);
	update();
	for(let i = 0; i < tail.length; i++) {
		tail[i].show();
	}
	showScoreAndSpeed();
}
