function startWorld() {
	// how many time between refreshes
	var loopTime = 100; // ms

	var character = new Character;
	var cells = document.getElementsByClassName('cell');
	var world = new World(character, cells);

	setTimeout(function runWorld() {
		world.run();
		setTimeout(runWorld, loopTime);
	}, loopTime);
}

function World(character, cells) {
	this.character = character;
	this.cells = cells;

	cells[character.x].innerHTML = 'X';
}

World.prototype.run = function () {
	var character = this.character;
	var cells = this.cells;

	var speed = character.getSpeed();
	if (!speed) {
		return;
	}

	var x = character.x; // caching
	cells[x].innerHTML = '';

	x += speed;

	if (x < 0)
	{ // out of bound (to the left)
		x = 0;
	}
	if (x == cells.length)
	{ // out of bound (to the right)
		x = cells.length - 1;
	}

	cells[x].innerHTML = 'X';
	character.x = x;
}

function Character() {
	this.x = 0;
}

Character.prototype.getSpeed = function () {
	// could use modifiers, etc
	var speed = 0;

	if (buttonPressed.RIGHT)
		speed = 1;
	if (buttonPressed.LEFT)
		speed = -1;

	return speed;
};

var buttonPressed = {
	RIGHT: false,
	LEFT: false
};
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

var keyMap = {
	39: 'RIGHT',
	37: 'LEFT',
}

function onKeyDown(e) {
	var key = keyMap[e.which];
	if (!key) {
		return;
	}

	console.log('Press: ' + key);
	buttonPressed[key] = true;
}
function onKeyUp(e) {
	var key = keyMap[e.which];
	if (!key) {
		return;
	}

	console.log('Release: ' + key);
	buttonPressed[key] = false;
}