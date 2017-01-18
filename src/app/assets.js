module.exports = [
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
		position: [20 , 6, 6]
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