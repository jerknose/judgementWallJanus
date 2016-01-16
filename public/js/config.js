"use strict";
var DEBUG = false;   //------------------------------------------------

var config={
	camera:{
		home:new THREE.Vector3(0, 0, -5000),
		near:new THREE.Vector3(0, 0, -3500),
		transition_speed: 20,
		panDistance:10,
		pushDistance:10,
		zoomDistance:15,
		pointsOfInterest:[
			new THREE.Vector3(10,0,20),
			new THREE.Vector3(12,0,-3),
			new THREE.Vector3(10,0,-18),
			new THREE.Vector3(-6,0,21),
			new THREE.Vector3(-5,0,0),
			new THREE.Vector3(-5,0,-20),
			new THREE.Vector3(50,40,0),
			new THREE.Vector3(0,0,0),
			new THREE.Vector3(0,0,0)
		]
	},
	controls:{
		mouseTimeout:1000,
		kinectTimeout:2000
	},
	person:{
		moveDuration:1000
	}
};