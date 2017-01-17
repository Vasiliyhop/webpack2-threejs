define([
	'colladaLoader'
	], function() {
	var loader = {
		loadAssets: function(game, assets) {
			var defs = [];
			assets.forEach(function(asset){
				var def = $.Deferred();
				defs.push(def);
				//TODO manage types
				if (asset.type === 'model') {
					loader.load(game, asset, def);
				}
			});
			$.when.apply(null, defs).done(function(){
				game.start();
			});
			//var tex = THREE.ImageUtils.loadTexture( textureURL );
		},
		load: function(game, asset, def) {
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
						game.assets[asset.id] = child;
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
				//TODO different behavior for types
				//game.dae = collada.scene;
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