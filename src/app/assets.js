module.exports = [
	{
		type: 'model',
		src: 'models/exported.json',
		name: 'Suzanne',
		id: 'monkey0',
		scale: 6,
		position: [10 , 4, -12]
	},
	{
		type: 'model',
		src: 'models/monkey.dae',
		name: 'Suzanne',
		id: 'monkey1',
		scale: 5,
		position: [0 , 6, 0]
	},
	{
		type: 'model',
		src: 'models/monkey.dae',
		name: 'Suzanne',
		id: 'monkey2',
		scale: 4,
		position: [20 , 6, -6]
	},
	{
		type: 'model',
		src: 'models/monkey.dae',
		name: 'Suzanne',
		id: 'monkey3',
		scale: 3,
		position: [-20 , 6, -6]
	},
	{
		type: 'model',
		src: 'models/cube.dae',
		name: 'Cube',
		id: 'cube',
		scale: 3,
		position: [-1 , 3, 15]
	},
	{
		type: 'model',
		src: 'models/torus.dae',
		name: 'Torus',
		id: 'torus',
		scale: 5,
		position: [18 , 3, 18]
	},
	{
		type: 'scene',
		src: 'scenes/scene1.dae',
		name: 'Scene',
		id: 'scene',
		scale: 3,
		position: [-10 , 3, 34]
	},
	{
		type: 'texture',
		src: 'textures/blocks.JPG',
		id: 'blocks'
	},
	{
		type: 'texture',
		src: 'textures/blocks_normal.JPG',
		id: 'blocks_n'
	},
	{
		type: 'sound',
		src: 'sounds/monkey.wav',
		id: 'sound',
		source: 'monkey1',
		setLoop: true,
		volume: 0.5,
		distance: 10
	}
];