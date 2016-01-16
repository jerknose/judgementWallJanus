var CameraControl = function(scene, camera, controls){
	this.scene = scene;
	this.camera = camera;
	this.controls = controls;

	this.current_beacon_viewed = 0;
	this.current_group_viewed = 0;
	this.flyType = "offset";

	this.graphOffsetY = 8;
	this.graphoffsetX = 15;

	this.isAnimating = false;

	this.pointsOfInterest = config.camera.pointsOfInterest;
	this.transition_speed = config.camera.transition_speed;

	this.panDistance = config.camera.panDistance;
	this.pushDistance = config.camera.pushDistance;
	this.zoomDistance = config.camera.zoomDistance;
};

CameraControl.prototype.reset = function() {
    this.fly_direct(config.camera.home, new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out,
      	focus: new THREE.Vector3(0,0,0)
    });
}

CameraControl.prototype.fly_near = function() {
    this.fly_direct(config.camera.near, new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Linear.None,
      	focus: new THREE.Vector3(0,0,0)
    });
}

CameraControl.prototype.fly_to_top = function() {
    this.fly_direct(new THREE.Vector3(0,55,0), new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Linear.None,
      	focus: new THREE.Vector3(0,0,0)
    });
}

CameraControl.prototype.fly_to_topLeft = function() {
    this.fly_direct(new THREE.Vector3(0,45,20), new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out,
      	focus: new THREE.Vector3(0,0,20)
    });
}

CameraControl.prototype.fly_to_topRight = function() {
    this.fly_direct(new THREE.Vector3(0,45,-20), new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out,
      	focus: new THREE.Vector3(0,0,-20)
    });
}

CameraControl.prototype.fly_to_bottom = function() {
    this.fly_direct(new THREE.Vector3(30,10,0), new THREE.Vector3(0,0,0), {
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out,
      	focus: new THREE.Vector3(0,0,0)
    });
}

CameraControl.prototype.fly_to_poi = function(idx) {
	if (this.isAnimating) {
		return;
	}
    this.fly_to(
    	this.pointsOfInterest[idx],
    	"offset"
    );
};

CameraControl.prototype.zoom = function(direction) {
	if (this.isAnimating) {
		return;
	}
	switch (direction) {
		case "in":
			this.zoomDistance = -Math.abs(this.zoomDistance);
		break;
		case "out":
			this.zoomDistance = Math.abs(this.zoomDistance);
		break;
	}

	this.fly_direct(world.controls.object.position.clone().add(new THREE.Vector3(0,this.zoomDistance,0)), new THREE.Vector3(0,0,0), {
      	focus: world.controls.target.clone().add(new THREE.Vector3(0,this.zoomDistance,0)),
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out
    });
}

CameraControl.prototype.pan = function(direction) {
	if (this.isAnimating) {
		return;
	}
	switch (direction) {
		case "left":
			this.panDistance = Math.abs(this.panDistance);
		break;
		case "right":
			this.panDistance = -Math.abs(this.panDistance);
		break;
	}

	this.fly_direct(world.controls.object.position.clone().add(new THREE.Vector3(0,0,this.panDistance)), new THREE.Vector3(0,0,0), {
      	focus: world.controls.target.clone().add(new THREE.Vector3(0,0,this.panDistance)),
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out
    });
}

CameraControl.prototype.push = function(direction) {
	if (this.isAnimating) {
		return;
	}
	switch (direction) {
		case "in":
			this.pushDistance = -Math.abs(this.pushDistance);
		break;
		case "out":
			this.pushDistance = Math.abs(this.pushDistance);
		break;
	}

    this.fly_direct(world.controls.object.position.clone().add(new THREE.Vector3(this.pushDistance,0,0)), new THREE.Vector3(0,0,0), {
      	focus: world.controls.target.clone().add(new THREE.Vector3(this.pushDistance,0,0)),
      	duration: this.transition_speed,
      	easing: TWEEN.Easing.Cubic.Out
    });
}

// CameraControl.prototype.fly_to_prev = function(type) {
// 	if (this.isAnimating) {
// 		return;
// 	}
// 	this.current_beacon_viewed--;
// 	if (this.current_beacon_viewed < 0) { this.current_beacon_viewed = this.pointsOfInterest[this.current_group_viewed].length-1; }
//     this.fly_to(
//     	this.pointsOfInterest[this.current_group_viewed][this.current_beacon_viewed],
//     	type
//     );
// };

// CameraControl.prototype.fly_to_next = function(type) {
// 	if (this.isAnimating) {
// 		return;
// 	}
// 	this.current_beacon_viewed++;
// 	if (this.current_beacon_viewed > this.pointsOfInterest[this.current_group_viewed].length-1) { this.current_beacon_viewed = 0; }
// 	this.fly_to(
//     	this.pointsOfInterest[this.current_group_viewed][this.current_beacon_viewed],
//     	type
//     );
// };

// CameraControl.prototype.fly_to_prev_group = function(type) {
// 	if (this.isAnimating) {
// 		return;
// 	}
// 	this.current_group_viewed--;
// 	if (this.current_group_viewed < 0) { this.current_group_viewed = this.pointsOfInterest.length-1; }
//     this.fly_to(
//     	this.pointsOfInterest[this.current_group_viewed][this.current_beacon_viewed],
//     	type
//     );
// };

// CameraControl.prototype.fly_to_next_group = function(type) {
// 	if (this.isAnimating) {
// 		return;
// 	}
// 	this.current_group_viewed++;
// 	if (this.current_group_viewed > this.pointsOfInterest.length-1) { this.current_group_viewed = 0; }
// 	this.fly_to(
//     	this.pointsOfInterest[this.current_group_viewed][this.current_beacon_viewed],
//     	type
//     );
// };

CameraControl.prototype.fly_to=function(targetPos, type){
	if (this.isAnimating) {
		return;
	}
	switch(type) {
		case "offset":
			this.fly_direct(targetPos, new THREE.Vector3(15,8,0), {
		      	focus: targetPos,
		      	duration: this.transition_speed,
		      	easing: TWEEN.Easing.Cubic.Out
		    });
		break;
		case "top":
			this.fly_direct(targetPos, new THREE.Vector3(0,10,0), {
		      	focus: targetPos,
		      	duration: this.transition_speed,
		      	easing: TWEEN.Easing.Cubic.Out
		    });
		break;
		case "front":
			this.fly_direct(targetPos, new THREE.Vector3(10,0,0), {
		      	focus: targetPos,
		      	duration: this.transition_speed,
		      	easing: TWEEN.Easing.Cubic.Out
		    });
		break;
		case "path":
			this.fly_arc(targetPos, new THREE.Vector3(15,8,0), {
		      	arcHeight: 0.25,
				visible:false,
				easing:TWEEN.Easing.Cubic.Out,
				duration:this.transition_speed,
				focus: targetPos
		    });
		break;
	}
};

CameraControl.prototype.fly_direct=function(targetPos, offset, params) {
	var scope = this;
	var posCamera = scope.controls.object.position.clone();
	// console.log(posCamera, targetPos);
	if (posCamera.x == targetPos.x
		&& posCamera.y == targetPos.y
		&& posCamera.z == targetPos.z) {
		console.log("cam already there...");
	}
	else {
		// camera location
		var tcamera = new TWEEN.Tween(posCamera)
			.to(targetPos.clone().add(offset), params.duration)
			.onUpdate(function(){
				scope.controls.object.up.x = -1;
				scope.controls.object.up.z = 0;
				scope.controls.object.position.copy(posCamera);
				scope.isAnimating = true;
			})
			.easing(params.easing)
			.onComplete(function(){
				scope.isAnimating = false;
			})
		.start();

		// camera focus
		var centerCam = scope.controls.target.clone();
		var tcenter = new TWEEN.Tween(centerCam)
			.to(params.focus, params.duration)
			.onUpdate(function(){
				scope.controls.target.copy(centerCam);
				scope.isAnimating = true;
			})
			.easing(params.easing)
			.onComplete(function(){
				scope.isAnimating = false;
			})
		.start();
	}
};

CameraControl.prototype.fly_arc = function fly_arc(targetPos, offset, params) {
	var scope = this;
	this.isAnimating = true;
	
	var animateAlongSpline = new AnimateAlongSpline(this.controls.object, this.controls.object.position.clone(), targetPos.clone().add(offset), params);
	animateAlongSpline
		.onComplete(function(){
			scope.isAnimating = false;
		})
	.start();

}