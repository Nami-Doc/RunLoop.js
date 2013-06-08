var cells = document.getElementsByClassName('cell');

function startWorld() {
	// how many time between refreshes
	var loopTime = 300; // ms

	var character = new Character;
	cells[0].innerHTML = 'X';
	setTimeout(function runWorld() {
		run(character);
		setTimeout(runWorld, loopTime);
	}, loopTime);
}

function run(character) {
	cells[character.x].innerHTML = '';

	var x = character.x; // caching
	x += character.getSpeed();

	if (x < 0)
	{ // out of bound (to the left)
		x = 0;
	}
	if (x > cells.length)
	{ // out of bound (to the right)
		x = cells.length - 1;
	}

	cells[x].innerHTML = 'X';
	character.x = x;
}

function Character() {
	this.x = 0;
	this.xSpeed = 1;
}
Character.prototype.getSpeed = function () {
	// could use modifiers, etc
	var speed = 0;

	if (buttonPressed.LEFT)
		speed = -1;
	if (buttonPressed.RIGHT)
		speed = 1;

	return speed;
};

var buttonPressed = {};
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