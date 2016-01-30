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

//TODO: Once we know how many types, we need an array of spawn points for EACH type (mountain, burrow, tree, etc)
var collectibleXSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];
var collectibleYSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];

function spawnCollectibles(collectibles){
    var spawnPointX = Math.floor(Math.random() * (collectibleXSpawnPoints.length));
    collectibles[0].x = collectibleXSpawnPoints[spawnPointX].x;
    collectibles[0].y = collectibleXSpawnPoints[spawnPointX].y;
    
    var spawnPointY = Math.floor(Math.random() * (collectibleYSpawnPoints.length));
    collectibles[1].x = collectibleXSpawnPoints[spawnPointY].x;
    collectibles[1].y = collectibleXSpawnPoints[spawnPointY].y;
}

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
    //Game Variables
    scene.timers.spawnbees = new Splat.Timer();
    scene.timers.spawnbees.expireMillis = 1000;
    scene.timers.spawnbees.start();
    
    scene.collectibles = [];
    scene.collectibleX = new Splat.Entity(0, 0, 50, 50);
	scene.collectibleX.color = "blue";
    scene.collectibleY = new Splat.Entity(0, 0, 50, 50);
	scene.collectibleY.color = "aqua";
    scene.collectibles.push(scene.collectibleX);
    scene.collectibles.push(scene.collectibleY);
    spawnCollectibles(scene.collectibles);
    
    scene.player.carryingItem = false;
    scene.player.itemCarried = -1;
    scene.collectiblesGotten = [];
    scene.collectibles.forEach(function() {
        scene.collectiblesGotten.push(false);
    });
    
	scene.player = new Splat.Entity(canvas.width/2, canvas.height/2, 50, 50);
	scene.player.color = "green";

    scene.player.baseSpeed = 3;
    scene.player.actualSpeed = 3;
    scene.player.minimumSpeed = 0.01;
    scene.player.workers = 0;
    scene.player.warriors = 0;
    
    scene.hive = new Splat.Entity(canvas.width/2, canvas.height-100, 50, 50);
    scene.hive.color = "red";
    scene.hive.workers = 0;
    scene.hive.warriors = 0;


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

}, function() {
	// simulation
	var scene = this;
    scene.player.actualSpeed = scene.player.baseSpeed - (scene.player.baseSpeed * (scene.player.workers + scene.player.warriors) * 0.01);
    if (scene.player.actualSpeed < 0){
        scene.player.actualSpeed = scene.player.minimum;
    }
    
	if (game.keyboard.isPressed("left")) {
		scene.player.x -= scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("right")) {
		scene.player.x += scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("up")) {
		scene.player.y -= scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("down")) {
		scene.player.y += scene.player.actualSpeed;
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
        scene.hive.workers++;
        scene.hive.warriors++;
        scene.timers.spawnbees.reset();
        scene.timers.spawnbees.start();
    }
    
    //scene.collectibles.forEach(function(element, i) {
    for (var i=0; i<scene.collectibles.length; i++){
        if (scene.collectibles[i] && scene.player.collides(scene.collectibles[i]) && !scene.player.carryingItem){
            scene.player.carryingItem = true;
            scene.player.itemCarried = i;
            scene.collectibles[i] = null;
        }
    }
    
    if (scene.player.collides(scene.hive)){
        scene.player.workers += scene.hive.workers;
        scene.player.warriors += scene.hive.warriors;
        scene.hive.workers = 0;
        scene.hive.warriors = 0;
        
        if (scene.player.carryingItem){
            scene.player.carryingItem = false;
            scene.collectiblesGotten[scene.player.itemCarried] = true;
        }
    }
}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(0, 0, canvas.width, canvas.height);
    drawEntity(context, scene.hive);

    for (var i=0; i<scene.collectibles.length; i++){
        if (scene.collectibles[i]){
            drawEntity(context, scene.collectibles[i]);
        }
    }
	drawEntity(context, scene.player);

	for(var x = 0; x< scene.warriors.length; x++){
		drawEntity(context, scene.warriors[x]);
	}
    
    context.fillStyle = "#ffffff";
    context.font = "200px";
    context.fillText(scene.player.workers, 100, 100);
    context.fillText(scene.player.warriors, canvas.width - 150, 100);
    if (scene.collectiblesGotten[0]){
        context.fillText("Collectible X: CHECK!", canvas.width/2, 100);
    }
    else{
        context.fillText("Collectible X: Not Found", canvas.width/2, 100);
    }
    if (scene.collectiblesGotten[1]){
        context.fillText("Collectible Y: CHECK!", canvas.width/2, 110);
    }
    else{
        context.fillText("Collectible Y: Not Found", canvas.width/2, 110);
    }
}));

game.scenes.switchTo("loading");
