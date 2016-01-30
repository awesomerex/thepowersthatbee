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
	scene.player = new Splat.Entity(canvas.width/2, canvas.height/2, 50, 50);
	scene.player.color = "red";

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
}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(0, 0, canvas.width, canvas.height);
	drawEntity(context, scene.player);
}));

game.scenes.switchTo("loading");
