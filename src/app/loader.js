define([
	'colladaLoader'
	], function() {
	var loader = {
		load: function(game) {
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load('assets/monkey.dae', function(collada){
				collada.scene.scale.set(5, 5, 5);
				var objectToRemove = [];
				collada.scene.traverse(function(child){
					if (child.colladaId !== 'Suzanne') {
						objectToRemove.push(child);
					} else {
						child.position.set(0, 1.5, 0);
						game.monkey = child;
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
				collada.scene.updateMatrix()
				game.dae = collada.scene;
				game.start();
			});
		}
	};

	return loader;
});