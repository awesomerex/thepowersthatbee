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

function drawEntity(context, drawable){
	context.fillStyle = drawable.color;
	context.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
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
    
    context.fillStyle = "#ffffff";
    context.font = "200px";
    context.fillText(scene.workersInUse, 100, 100);
    context.fillText(scene.warriorsInUse, canvas.width - 150, 100);
}));

game.scenes.switchTo("loading");
