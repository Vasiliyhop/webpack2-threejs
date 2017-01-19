define([
	'colladaLoader'
	], function() {
	var loader = {
		loadAssets: function(game, assets) {
			var texLoader = new THREE.TextureLoader();
			var listener = new THREE.AudioListener();
			var defs = [];
			assets.forEach(function(asset){
				var def = $.Deferred();
				defs.push(def);
				if (asset.type === 'model') {
					var ext = asset.src.split('.')[1];
					if (ext === 'dae') {
						loader.loadModel(game, asset, def);
					} else if (ext === 'json') {
						loader.loadJSON(game, asset, def);
					}
				} else if (asset.type === 'texture') {
					game.assets[asset.id] = asset;
					loader.loadTexture(texLoader, asset, def);
				} else if (asset.type === 'sound') {
					game.assets[asset.id] = asset;
					loader.loadAudio(listener, asset, def);
				} else if (asset.type === 'scene') {
					loader.loadScene(game, asset, def);
				}
			});
			$.when.apply(null, defs).done(function(){
				game.start();
			});
		},
		loadJSON: function(game, asset, def) {
			var loader = new THREE.JSONLoader();

			loader.load(
				'assets/' + asset.src,
				function ( geometry, materials ) {
					var isMorph = geometry.morphTargets.length > 0 ? true : false;
					if (isMorph) {
						materials.forEach(function(material){
							material.morphTargets = true;
						});
					} 
					
					var material = new THREE.MultiMaterial(materials);
					material.morphTargets = true;
					var object = new THREE.Mesh(geometry, material);

					if (isMorph) {
						asset.mixer = new THREE.AnimationMixer(object);
						var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'gallop', geometry.morphTargets, 30 );
						asset.mixer.clipAction( clip ).setDuration( 1 ).play();
					}

					game.assets[asset.id] = asset;
					var scale = asset.scale || 1,
					positionX = asset.position[0] || 0,
					positionY = asset.position[1] || 0,
					positionZ = asset.position[2] || 0;
					object.position.set(positionX, positionY, positionZ);
					object.scale.set(scale, scale, scale);
					object.castShadow = true;
					object.receiveShadow = true;
					asset.instance = object;
					def.resolve();
				}
			);
		},
		loadTexture: function(texLoader, asset, def) {
			texLoader.load('assets/' + asset.src, 
				function(texture){
					asset.instance = texture;
					def.resolve();
				});
		},
		loadAudio: function(listener, asset, def) {
			var sound;
			if (asset.distance) {
				sound = new THREE.PositionalAudio( listener );
			} else {
				sound = new THREE.Audio( listener );
			}

			var audioLoader = new THREE.AudioLoader();

			audioLoader.load('assets/' + asset.src, function(buffer) {
				sound.setBuffer(buffer);
				sound.setLoop(asset.setLoop);
				sound.setVolume(asset.volume);
				if (asset.distance) {
					sound.setRefDistance(asset.distance);
				}
				asset.listener = listener;
				asset.instance = sound;
				def.resolve();
			});
		},
		loadScene: function(game, asset, def) {
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load('assets/' + asset.src, function(collada){
				var scale = asset.scale || 1,
					positionX = asset.position[0] || 0,
					positionY = asset.position[1] || 0,
					positionZ = asset.position[2] || 0;
				collada.scene.position.set(positionX, positionY, positionZ);
				collada.scene.scale.set(scale, scale, scale);
				game.assets[asset.id] = asset;
				asset.instance = collada.scene;
				collada.scene.traverse(function(child){
					child.traverse(function(e){
						e.castShadow = true;
						e.receiveShadow = true;
						if (e.material instanceof THREE.MeshPhongMaterial) {
							e.material.needsUpdate = true;
						}
					});
					
				});
				collada.scene.updateMatrix();
				if (def) {
					def.resolve();
				} else {
					game.start();
				}
			});
		},
		loadModel: function(game, asset, def) {
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load('assets/' + asset.src, function(collada){
				var scale = asset.scale || 1,
					positionX = asset.position[0] || 0,
					positionY = asset.position[1] || 0,
					positionZ = asset.position[2] || 0;
				collada.scene.scale.set(scale, scale, scale);
				var objectToRemove = [];
				collada.scene.traverse(function(child){
					if (child.colladaId !== asset.name) {
						objectToRemove.push(child);
					} else {
						child.position.set(positionX, positionY, positionZ);
						child.scale.set(scale, scale, scale);
						game.assets[asset.id] = asset;
						asset.instance = child;
						child.traverse(function(e){
							e.castShadow = true;
							e.receiveShadow = true;
							if (e.material instanceof THREE.MeshPhongMaterial) {
								e.material.needsUpdate = true;
							}
						});
					}
				});
				objectToRemove.forEach(function(object){
					collada.scene.remove(object);
				});
				collada.scene.updateMatrix();
				if (def) {
					def.resolve();
				} else {
					game.start();
				}
			});
		}
	};

	return loader;
});