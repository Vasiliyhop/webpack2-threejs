define([
	'datgui',
	'loader'
	], function(dat, loader){
	var game = {
		before: function() {
			game.load();
		},
		start: function() {
			game.init();
			game.create();
			game.render();
		},
		load: function() {
			loader.load(game);
		},
		init: function() {
			game.width = window.innerWidth,
			game.height = window.innerHeight,
			game.container = $('#app-container'),
			game.ratio = game.width / game.height,
			game.scene = new THREE.Scene(),
			game.camera = new THREE.PerspectiveCamera(45, game.ratio, 0.1, 500),
			game.renderer = new THREE.WebGLRenderer();

			game.renderer.setClearColor(0xdddddd);
			game.renderer.setSize(game.width, game.height);
			game.renderer.shadowMap.enabled = true;
			game.renderer.shadowMapSoft = true;
			game.renderer.shadowMap.type = THREE.PCFShadowMap;
		},
		create: function() {
			//dae
			game.scene.add(game.dae);

			//axis
			var axis = new THREE.AxisHelper(10);
			game.scene.add(axis);

			//grid
			var color = new THREE.Color(0xff0000);
			var grid = new THREE.GridHelper(50, 5, color, 0x000000);
			game.scene.add(grid);

			//plane
			var planeGeometry = new THREE.PlaneGeometry(60, 60, 60);
			var planeMaterial = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				shininess: 150,
	            specular: 0xffffff,
	            shading: THREE.SmoothShading
			});
			var plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.position.set(0, 0, 0);
			plane.rotation.x = -0.5*Math.PI;
			plane.castShadow = true;
			plane.receiveShadow = true;
			game.scene.add(plane);

			//spot light
			var light = new THREE.SpotLight(0xffffff);
			light.castShadow = true;
			light.shadow.camera.near = 8;
	        light.shadow.camera.far = 30;
	        light.shadow.camera.fov = 30;
	        light.shadow.bias = 0.0001;
	        light.shadow.mapSize.width = 2048;
	        light.shadow.mapSize.height = 2048;
	        light.name = 'Spot Light';
			light.position.set(15, 30, 50);
			game.scene.add(light);

			//camera
			game.camera.position.set(40, 40, 40);
			game.camera.lookAt(game.scene.position);

			//dat.gui
			game.guiControls = new function() {
				this.rotationX = 0.00001;
				this.rotationY = 0.01;
				this.rotationZ = 0.00001;
			};
			datGUI = new dat.GUI();
			datGUI.add(game.guiControls, 'rotationX', -0.1, 0.1);
			datGUI.add(game.guiControls, 'rotationY', -0.1, 0.1);
			datGUI.add(game.guiControls, 'rotationZ', -0.1, 0.1);

			//append
			game.container.append(game.renderer.domElement);
		},
		render: function() {
		 	game.monkey.rotation.x += game.guiControls.rotationX;
		    game.monkey.rotation.y += game.guiControls.rotationY;
		    game.monkey.rotation.z += game.guiControls.rotationZ;

		    requestAnimationFrame( game.render );
		    game.renderer.render( game.scene, game.camera );
		}
	};

	return game;
});