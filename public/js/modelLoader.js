"use strict";

var modelLoader=function(modelFiles, callback, scope){

    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        //console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) {
    };

    var loader;
    if (modelFiles[0].split('.').pop() == "dae") {
      var loader = new THREE.ColladaLoader();
      loader.load(modelFiles[0], function (object) {
        callback( object.scene, scope );
      }, onProgress, onError );
    }
    if (modelFiles[0].split('.').pop() == "obj") {
      THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
      loader = new THREE.OBJMTLLoader();
      loader.load(modelFiles[0], modelFiles[1] , function ( object ) {
        //console.log("obj model loaded:", modelFiles[0]);
        callback( object, scope );
      }, onProgress, onError );
    }
    else if (modelFiles[0].split('.').pop() == "stl") {
      loader = new THREE.STLLoader();
      loader.load(modelFiles[0] , function ( event ) {
        // console.log("stl model loaded:", modelFiles[0]);
        // var geometry = event.content;
        var geometry = event;
        var material = new THREE.MeshPhongMaterial({wireframe:false});
        // var material = new THREE.MeshPhongMaterial( { transparent: true, opacity: 0.8, refractionRatio: 0.995, reflectivity: 0.5});
        var stlmesh = new THREE.Mesh( geometry, material );
        callback(stlmesh, scope);
      }, onProgress, onError );
    }
};