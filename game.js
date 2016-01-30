"use strict";

var Splat = require("splatjs");
var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
	},
	"sounds": {
	},
	"fonts": {
        "winter": "fronts/Frostys.TTF"
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
// 	var w = new Splat.AnimatedEntity(x, y, 10, 10);
// 	w.color = "red";
// 	w.attached = false;
// 	w.followMouse = function(){
// 	};
// };

var placeOnCircle = function(object, circle, offset){
	object.x = circle.cx + circle.r * Math.sin(circle.theta + offset);
	object.y = circle.cy + circle.r * Math.cos(circle.theta + offset);
	//console.log(object);
};


function drawEntity(context, drawable){
	context.fillStyle = drawable.color;
	context.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
}

function createWarriors(array, num, player){
    for(var x = 0; x < num ; x++){
	  	var warrior = new Splat.AnimatedEntity(Math.floor(Math.random() * canvas.width) +1, Math.floor(Math.random() * canvas.height) +1, 10, 10, null, 0,0);
	 	warrior.color ="red";
	 	warrior.type = "warrior";
	 	array.push(warrior);
	 }
	 player.warriors = array.length;
}

function createEnemy(array, scene){
	var enemy = new Splat.AnimatedEntity(50, 100, 25, 25, null, 0,0);
	enemy.type = "";
	enemy.move = function(){
		this.target();
		this.x += this.speedx;
		this.y += this.speedy;
	};
	enemy.target = function(){
		var targetx = scene.player.x + scene.player.width/2;
		var targety = scene.player.y + scene.player.height/2;
		this.speed = 1;
		var distance =  Math.sqrt( Math.pow((targetx - this.x), 2) + Math.pow((targety - this.y),2));
		if( distance < 500){
			this.speedx = Math.abs(targetx - this.x)/distance * this.speed;
			this.speedy = Math.abs(targety - this.y)/distance * this.speed;
			if (targetx - this.x < 0){
				this.speedx *= -1;
			}
			if (targety - this.y < 0){
				this.speedy *= -1;
			}
		}else{
			this.speedx = 0;
			this.speedy = 0;
		}
	};
	enemy.color = "yellow";
	enemy.collision = function(){
		this.health --;
		console.log("enemy", this.health);
	};
	enemy.update = function(){
		if(this.health <= 0){
			this.delete = true;
		}
		this.target();
		this.move();
	};
	enemy.delete = false;
	enemy.health = 30;
	array.push(enemy);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	//init
	var scene =this;
    //Game Variables
    scene.inHive = false;
    
    scene.timers.game = new Splat.Timer();
    scene.timers.game.expireMillis = 600000;
    scene.timers.game.start();
    
    scene.collectibles = [];
    scene.collectibleX = new Splat.AnimatedEntity(0, 0, 50, 50, null, 0,0);
	scene.collectibleX.color = "blue";
    scene.collectibleX.cost = 20;
    scene.collectibleY = new Splat.AnimatedEntity(0, 0, 50, 50, null, 0,0);
	scene.collectibleY.color = "aqua";
    scene.collectibleY.cost = 30;
    scene.collectibles.push(scene.collectibleX);
    scene.collectibles.push(scene.collectibleY);
    spawnCollectibles(scene.collectibles);
    
    scene.collectiblesGotten = [];
    scene.collectibles.forEach(function() {
        scene.collectiblesGotten.push(false);
    });

    scene.enemies = [];
    
    createEnemy(scene.enemies, scene);

	scene.player = new Splat.AnimatedEntity(canvas.width/2, canvas.height/2, 50, 50, null, 0,0);
	scene.player.color = "green";

    scene.player.baseSpeed = 3;
    scene.player.actualSpeed = 3;
    scene.player.minimumSpeed = 0.01;
    scene.player.workers = 0;
    scene.player.warriors = 0;
    scene.player.carryingItem = false;
    scene.player.itemCarried = -1;
    
    scene.hive = new Splat.AnimatedEntity(canvas.width/2, canvas.height-100, 50, 50, null, 0,0);
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
    
    scene.hive = new Splat.Entity(canvas.width/2, canvas.height-100, 50, 50);
    scene.hive.color = "red";
    
	scene.warriors = [];
	createWarriors(scene.warriors, 5, scene.player);
    
    scene.gameCamera = new Splat.EntityBoxCamera(scene.player, 500, 500, canvas.width/2 ,canvas.height/2);
    scene.camera = scene.gameCamera;

}, function() {
	// simulation
	var scene = this;
    scene.player.actualSpeed = scene.player.baseSpeed - (scene.player.baseSpeed * (scene.player.workers + scene.player.warriors) * 0.01);
    if (scene.player.actualSpeed < 0){
        scene.player.actualSpeed = scene.player.minimumSpeed;
    }
    
	if (game.keyboard.isPressed("a")) {
		scene.player.x -= scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("d")) {
		scene.player.x += scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("w")) {
		scene.player.y -= scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("s")) {
		scene.player.y += scene.player.actualSpeed;
	}
    if (game.keyboard.consumePressed("q")) {
        if (scene.inHive){
		  scene.player.warriors++;
          createWarriors(scene.warriors, 1);
        }
        else if (scene.player.warriors > 0){
          scene.player.warriors--; 
          scene.warriors.splice(scene.warriors.length-1 , 1);
        }
	}
    if (game.keyboard.consumePressed("e")) {
		if (scene.inHive){
		  scene.player.workers++;
        }
        else if (scene.player.workers > 0){
          scene.player.workers--; 
        }
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
    
    if (scene.timers.game.expired()){
        scene.timers.game.stop();
        console.log("You lose the game.  You suck.");
    }
    
    for (var i=0; i<scene.collectibles.length; i++){
        if (scene.collectibles[i] && scene.player.collides(scene.collectibles[i]) && !scene.player.carryingItem && scene.player.workers >= scene.collectibles[i].cost){
            scene.player.carryingItem = true;
            scene.player.itemCarried = i;
            scene.collectibles[i] = null;
        }
    }
    
    if (scene.player.collides(scene.hive)){
        scene.player.workers += scene.hive.workers;
        scene.player.warriors += scene.hive.warriors;
        createWarriors(scene.warriors, scene.hive.warriors, scene.player);
        scene.hive.workers = 0;
        scene.hive.warriors = 0;
        scene.inHive = true;
        
        if (scene.player.carryingItem){
            scene.player.carryingItem = false;
            scene.collectiblesGotten[scene.player.itemCarried] = true;
        }
    }
    else{
        scene.inHive = false;
    }

    //enemies update loop
    for( i = 0; i < scene.enemies.length; i++ ){
    	console.log("enemies update loop");
    	if(scene.enemies[i].collides(scene.player)){
    		console.log("administrator bee hit");
    	}
    	for( x = 0; x < scene.warriors.length; x++){
    		if(scene.enemies[i].collides(scene.warriors[x]) &&
    			scene.enemies[i].health > 0){
    			scene.enemies[i].collision();
    			scene.warriors.splice(x, 1);
    		}
    	}
    	scene.enemies[i].update();
    	if(scene.enemies[i].delete === true){
    		scene.enemies.splice(i,1);
    	}
    }

}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
    drawEntity(context, scene.hive);

    for (var i=0; i<scene.collectibles.length; i++){
        if (scene.collectibles[i]){
            drawEntity(context, scene.collectibles[i]);
            context.font = "20px winter";
            context.fillText(scene.collectibles[i].cost, scene.collectibles[i].x, scene.collectibles[i].y);
        }
    }
	drawEntity(context, scene.player);

	for(var x = 0; x< scene.warriors.length; x++){
		drawEntity(context, scene.warriors[x]);
	}

	for(x = 0; x < scene.enemies.length; x++){
		drawEntity(context, scene.enemies[x]);
	}
    
    context.fillStyle = "#ffffff";
    context.font = "20px winter";
    context.fillText(scene.player.workers, scene.player.x, scene.player.y);
    context.fillText(scene.player.warriors, scene.player.x+30, scene.player.y);
    if (scene.collectiblesGotten[0]){
        context.fillText("Collectible X: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 100);
    }
    else{
        context.fillText("Collectible X: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 100);
    }
    if (scene.collectiblesGotten[1]){
        context.fillText("Collectible Y: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 130);
    }
    else{
        context.fillText("Collectible Y: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 130);
    }
    context.fillText(Math.round((scene.timers.game.expireMillis-scene.timers.game.time)/1000), scene.camera.x + scene.camera.width/2,  scene.camera.y + 50);
}));

game.scenes.switchTo("loading");
