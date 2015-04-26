"use strict";

var OscControl = function(){
	this.socket = null;
	this.init();
};

OscControl.prototype.init=function(){
	var scope = this;
	if(typeof io !== "undefined") { //Failover for running on non Node server / Web Demo
		this.socket = io.connect(window.location.origin);
		this.socket.on('oscdata', function(msg){
			// console.log(msg);
			scope.processOSCData(msg);
			console.log(""+msg[1] + " "+msg[2]+" "+motionVector.x +" "+motionVector.y);
		});
	}
};

OscControl.prototype.processOSCData=function(msg){
	var z=0.9;
	if(msg[1]>0){
		motionVector.x = z*motionVector.x + (1-z)*map(msg[1], 0, 640, -1, 1);
		motionVector.y = z*motionVector.y + (1-z)*map(msg[2], 0, 480, 1, -1);
		bFoundTarget = true;
	}else{
		bFoundTarget = false;
	}
};

var map=function(val, inMin, inMax, outMin, outMax){
	if(val<inMin) return outMin;
	if(val>inMax) return outMax;

	return (val-inMin)/(inMax-inMin) * (outMax-outMin) + outMin;
};