var People = function(scene, params) {
	this.populous = new Array();
	this.locations = new Array();

	this.scene = scene;
	
	this.modelScale = params.modelScale;
	this.maxPopulation = params.maxPopulation;
	this.gridDimensions = params.gridDimensions;

	this.createLayout();
};

People.prototype.loadPopulous = function(peopleInfo) {
	console.log("Loading initial populous...");
	for (var i = 0; i < this.maxPopulation; i++) {
		this.add(peopleInfo[i]);
	};
	this.distributePopulous();
};

People.prototype.updatePopulous = function(peopleInfo) {
	console.log("Looking for new residents... ");
	
	var newPeople = new Array();
	var scope = this;

	for (var p=0; p<this.maxPopulation; p++) {
		var personInfo = peopleInfo[p];
		var match = false;
		var people = scope.populous;
		
		people.forEach(function(person){
			if (person.name == personInfo.name) {
				match = true;
			
			}
		});
		
		if (match == false) {
			scope.removeOldest();
			scope.addNewComer(personInfo);
			this.distributePopulous();
		}
	}
};

People.prototype.removeOldest = function() {
	var loser = this.populous[0];

	console.log("Exiling oldest resident...", loser);
	
	loser.hide();
	loser.delete();
	loser = null;
	this.populous.splice(0,1);
};

People.prototype.add = function(personInfo) {
	console.log("Adding resident...");
	personInfo.modelScale = this.modelScale;

	var person = new Person(this.scene, personInfo);
	this.populous.unshift(person);

	person.add();
};

People.prototype.addNewComer = function(personInfo) {
	console.log("Adding new resident...");
	personInfo.modelScale = this.modelScale;

	var person = new Person(this.scene, personInfo);
	this.populous.push(person);

	person.add();
};

People.prototype.update = function(pos) {
	for (var p = 0; p < this.populous.length; p++) {
		this.populous[p].update(pos);
	}
};

People.prototype.createLayout = function() {
	var sceneWidth = $("#container").width()*2.55;
	var sceneHeight = $("#container").height()*2;

	var xStart = -sceneWidth/2;
	var yStart = sceneHeight/2;

    var xInc = sceneWidth/(this.gridDimensions.width-1);
    var yInc = sceneHeight/(this.gridDimensions.height-1);

	var xPos = xStart;
	var yPos = yStart;
	for (var i=0; i<this.maxPopulation; i++) {

		this.locations.unshift(new THREE.Vector3(xPos, yPos, 0));
		xPos += xInc;
		if (i%this.gridDimensions.width == this.gridDimensions.width-1)
		{
			yPos -= yInc;
			xPos = xStart;
		}
	}
	// this.shuffleLocations();
}

People.prototype.shuffleLocations = function() {
  var currentIndex = this.locations.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this.locations[currentIndex];
    this.locations[currentIndex] = this.locations[randomIndex];
    this.locations[randomIndex] = temporaryValue;
  }
}

People.prototype.distributePopulous = function() {
	for (var i=0; i<this.populous.length; i++) {
		this.populous[i].targetPos = this.locations[i];
	}
}