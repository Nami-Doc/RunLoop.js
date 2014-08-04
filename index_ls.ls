function startWorld
	loop-time = 100ms
	character = new Character
	cells = document.getEmentsByClassName 'cell'
	world = new World character, cells

	:runWorld let
		(`setTimeout` loop-time) <| -> # remove <| when bug is fixed
			world.run!
			runWorld!

class World
	(@character, @cells) ->
		cells[character.x]inner-HTML = 'X'

	run: ->
		{character: {x}, cells} = this
		return unless speed = character.get-speed!

		cells[x]innerHTML = ''
		x += speed

		x <?= 0
		x = cells.length - 1 if x is cells.length

		cells[x]innerHTML = 'X'
		character.x = x

class Character
	-> @x = 0

	get-speed: ->
		| buttonPressed.RIGHT => 1
		| buttonPressed.LEFT  => -1
		| _                   => 0

button-pressed =
	RIGHT: false
	LEFT: false

key-map =
	39: 'RIGHT'
	37: 'LEFT'

for let name, value in {keydown: true keyup: false}
	document.addEventListener name, !->
		return unless key = key-map[it.which]

		console.log "#name: #key"
		button-pressed[key] = value
