var Person = function(scene, personInfo) {
	this.scene = scene;

	this.name = personInfo.name;
	this.fullPath = personInfo.fullPath;
	this.modelScale = personInfo.modelScale;

	this.personObj = null;

	this.targetPos = new THREE.Vector3(0,0,0);

	this.duration = config.person.moveDuration;
	this.isMoving = false;
	this.wonderRateX = 0.0;
	this.wonderRateY = 0.0;
	this.wonderRateZ = 0.0;
};

Person.prototype.add = function() {
	modelLoader([this.fullPath], this.modelLoaded, this);
};

Person.prototype.move=function(pos, duration) {
	this.isMoving = true;
	this.personObj.position.copy(pos);
	this.show();
};

Person.prototype.moveTween=function(pos, duration) {
	var scope = this;
	var cPos = this.personObj.position.clone();
	
	scope.isMoving = true;

	var movePerson = new TWEEN.Tween(cPos)
		.to(pos, duration)
		.onUpdate(function(){
			scope.personObj.position.copy(cPos);
		})
		.easing(TWEEN.Easing.Cubic.Out)
		.onComplete(function(){
			scope.isMoving = false;
		})
	.start();
};

Person.prototype.show = function(){
	// this.personObj.visible = true;
};

Person.prototype.hide=function() {
	// this.personObj.visible = false;
};

Person.prototype.delete=function() {
	this.scene.remove(this.personObj);
};

Person.prototype.modelLoaded = function(obj, scope){
	scope.personObj = obj;
	// scope.personObj.visible = false;

	scope.personObj.rotation.y = -Math.PI;

	scope.personObj.scale.x = scope.personObj.scale.y = scope.personObj.scale.z = scope.modelScale;

	scope.scene.add(scope.personObj);
};

Person.prototype.update = function(pos) {
	if (this.personObj==null) {
		return;
	}
	if (this.personObj.position !== this.targetPos && this.isMoving == false) {
		this.moveTween(this.targetPos, this.duration);
	}

	this.personObj.lookAt(pos);
	this.wonderRateX *=0.99;
	this.wonderRateY *=0.99;
	this.wonderRateZ *=0.99;
};

Person.prototype.wonder = function(){
	if (this.personObj==null) {
		return;
	}
	this.wonderRateX += (Math.random()-0.5)*0.0025;
	this.wonderRateX = limit(this.wonderRateX, -0.05, 0.05);

	this.wonderRateY += (Math.random()-0.5)*0.0025;
	this.wonderRateY = limit(this.wonderRateY, -0.05, 0.05);

	this.wonderRateZ += (Math.random()-0.5)*0.0025;
	this.wonderRateZ = limit(this.wonderRateZ, -0.05, 0.05);

	this.personObj.rotateX(this.wonderRateX);
	this.personObj.rotateY(this.wonderRateY);
	this.personObj.rotateZ(this.wonderRateZ);
	if (this.personObj.position !== this.targetPos && this.isMoving == false) {
		this.moveTween(this.targetPos, this.duration);
	}
};

var limit=function(val, min, max){
	if(val < min) return min;
	if(val > max) return max;
	return val;
};
