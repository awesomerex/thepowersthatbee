"use strict";

var Splat = require("splatjs");
var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
	},
	"sounds": {
	},
	"fonts": {
	},
	"animations": {
	}
};

var game = new Splat.Game(canvas, manifest);

// var generateWarrior = function(x, y){
// 	var w = new Splat.Entity(x, y, 10, 10);
// 	w.color = "red";
// 	w.attached = false;
// 	w.followMouse = function(){
// 	};
// };

var placeOnCircle = function(object, circle, offset){
	object.x = circle.cx + circle.r * Math.sin(circle.theta + offset);
	object.y = circle.cy + circle.r * Math.cos(circle.theta + offset);
	console.log(object);
};

function drawEntity(context, drawable){
	context.fillStyle = drawable.color;
	context.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	//init
	var scene =this;
    scene.workersAtHive = 0;
    scene.warriorsAtHive = 0;
    scene.workersInUse = 0;
    scene.warriorsInUse = 0;
    
    scene.timers.spawnbees = new Splat.Timer();
    scene.timers.spawnbees.expireMillis = 1000;
    scene.timers.spawnbees.start();
    
	scene.player = new Splat.Entity(canvas.width/2, canvas.height/2, 50, 50);
	scene.player.color = "green";
	scene.player.r = 100;
	scene.player.theta = 0;
	scene.player.getTheta = function(){
		this.cx = this.x + this.width/2;
		this.cy = this.y + this.height/2;
		this.theta = Math.atan2(game.mouse.x-this.cx, game.mouse.y-this.cy);
	};
	scene.warriors = [];
	 for(var x = 0; x < 5 ; x++){
	  	var warrior = new Splat.Entity(Math.floor(Math.random() * canvas.width) +1, 
									   Math.floor(Math.random() * canvas.height) +1,
									   10, 10);
	 	warrior.color ="red";
	 	scene.warriors.push(warrior);
	 }
	//scene.warriors.color = "red";
    
    scene.hive = new Splat.Entity(canvas.width/2, canvas.height-100, 50, 50);
    scene.hive.color = "red";
}, function() {
	// simulation
	var scene = this;
	if (game.keyboard.isPressed("left")) {
		scene.player.x -= 1;
	}
	if (game.keyboard.isPressed("right")) {
		scene.player.x += 1;
	}
	if (game.keyboard.isPressed("up")) {
		scene.player.y -= 1;
	}
	if (game.keyboard.isPressed("down")) {
		scene.player.y += 1;
	}

	scene.player.getTheta();
	var count = 0;
	for(var x = 0; x< scene.warriors.length; x++){
		//console.log(x);
		if(x === 0){
		placeOnCircle(scene.warriors[x], scene.player, x);
		}
		else if((x % 2) === 1){
			count++;
			placeOnCircle(scene.warriors[x], scene.player, (Math.PI/22.5)*count);
		}
		else{
			placeOnCircle(scene.warriors[x], scene.player, (Math.PI/22.5)* -count);
		}
	}
    
    if (scene.timers.spawnbees.expired()){
        scene.workersAtHive++;
        scene.warriorsAtHive++;
        scene.timers.spawnbees.reset();
        scene.timers.spawnbees.start();
    }
    
    if (scene.player.collides(scene.hive)){
        scene.workersInUse += scene.workersAtHive;
        scene.warriorsInUse += scene.workersAtHive;
        scene.workersAtHive = 0;
        scene.warriorsAtHive = 0;
    }
}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(0, 0, canvas.width, canvas.height);
    drawEntity(context, scene.hive);
	drawEntity(context, scene.player);

	for(var x = 0; x< scene.warriors.length; x++){
		drawEntity(context, scene.warriors[x]);
	}
    
    context.fillStyle = "#ffffff";
    context.font = "200px";
    context.fillText(scene.workersInUse, 100, 100);
    context.fillText(scene.warriorsInUse, canvas.width - 150, 100);
}));

game.scenes.switchTo("loading");
