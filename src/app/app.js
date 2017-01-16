define([
	'vendor/three.min', 
	'vendor/dat.gui.min'
	], function(THREE, dat){
	var app = {
		init: function() {
			console.log('init');
			var width = window.innerWidth,
				height = window.innerHeight,
				container = $('#app-container'),
				ratio = width/height,
				scene = new THREE.Scene(),
				camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 500),
				renderer = new THREE.WebGLRenderer();

			renderer.setClearColor(0xdddddd);
			renderer.setSize(width, height);
			renderer.shadowMap.enabled = true;
			renderer.shadowMapSoft = true;
			renderer.shadowMap.type = THREE.PCFShadowMap;

			var axis = new THREE.AxisHelper(10);

			scene.add(axis);

			var color = new THREE.Color('rgb(255, 0 0)');
			var grid = new THREE.GridHelper(50, 5, color, 0x000000);

			scene.add(grid);

			var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
			var cubeMaterial = new THREE.MeshPhongMaterial({
				color: 0xff33000,
				shininess: 150,
            	specular: 0x222222,
				shading: THREE.SmoothShading
			});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.position.set(2.5, 2.5, 2.5);
			cube.castShadow = true;
			scene.add(cube);

			var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
			var planeMaterial = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				shininess: 150,
	            specular: 0xffffff,
	            shading: THREE.SmoothShading
			});
			var plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.position.set(0, 0, 0);
			plane.rotation.x = -0.5*Math.PI;
			plane.castShadow = false;
			plane.receiveShadow = true;
			scene.add(plane);

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
			scene.add(light);

			camera.position.set(40, 40, 40);
			camera.lookAt(scene.position);

			container.append(renderer.domElement);

			var guiControls = new function() {
				this.rotationX = 0.01;
				this.rotationY = 0.01;
				this.rotationZ = 0.01;
			};

			datGUI = new dat.GUI();
			datGUI.add(guiControls, 'rotationX', 0, 0.5);
			datGUI.add(guiControls, 'rotationY', 0, 0.5);
			datGUI.add(guiControls, 'rotationZ', 0, 0.5);

			function render() {
			    cube.rotation.x += guiControls.rotationX;
			    cube.rotation.y += guiControls.rotationY;
			    cube.rotation.z += guiControls.rotationZ;
			     
			    requestAnimationFrame( render );
			    renderer.render( scene, camera );
			}
			render();
		}
	};

	return app;
});