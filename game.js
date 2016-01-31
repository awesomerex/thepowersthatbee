"use strict";

var Splat = require("splatjs");
var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
	},
	"sounds": {
	},
	"fonts": {
        "Frostys": {
        	"truetype" : "assets/fonts/Frostys.TTF"
        } 
	},
	"animations": {
		"admin-idle"  :{
			"strip" : "assets/images/SMALL_administrator_idle.png",
			"frames" : 2,
			"msPerFrame" : 100,
		},
        "warrior-idle"  :{
			"strip" : "assets/images/SMALL_warrior_idle.png",
			"frames" : 2,
			"msPerFrame" : 100,
		}
	}
};

var game = new Splat.Game(canvas, manifest);

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

var placeOnCircle = function(object, circle, offset){
	object.x = circle.cx + circle.r * Math.sin(circle.theta + offset);
	object.y = circle.cy + circle.r * Math.cos(circle.theta + offset);
};


function drawEntity(context, drawable){
	context.fillStyle = drawable.color;
	context.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
}

function drawAnimatedEntity(context, drawable){
	drawable.draw(context);
}

function createWarriors(array, num, player){
    for(var x = 0; x < num ; x++){
        var warriorIdle = game.animations.get("warrior-idle");
	  	var warrior = new Splat.AnimatedEntity(Math.floor(Math.random() * canvas.width) +1, Math.floor(Math.random() * canvas.height) +1, 10, 10, warriorIdle, 0,0);
	 	warrior.type = "warrior";
	 	array.push(warrior);
        player.warriors++;
	 }
}

function removeWarriors(array, num, player){
    if (array.length >= num){
        array.splice(0,num);
        player.warriors--;
    }
    else{
        console.log("Tried to remove more warriors than there are");
    }
}

function createEnemy(array, scene){
	var enemy = new Splat.AnimatedEntity(50, 100, 25, 25, null, 0,0);
	enemy.type = "";
    enemy.hitting = false;
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
        if (!this.hitting){
            this.target();
            this.move();
        }
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
    scene.collectibleX.active = true;
    scene.collectibleY = new Splat.AnimatedEntity(0, 0, 50, 50, null, 0,0);
	scene.collectibleY.color = "aqua";
    scene.collectibleY.cost = 30;
    scene.collectibleY.active = true;
    scene.collectibles.push(scene.collectibleX);
    scene.collectibles.push(scene.collectibleY);
    spawnCollectibles(scene.collectibles);
    
    scene.collectiblesGotten = [];
    scene.collectibles.forEach(function() {
        scene.collectiblesGotten.push(false);
    });

    scene.enemies = [];
    
    createEnemy(scene.enemies, scene);
    
    scene.adminIdle = game.animations.get("admin-idle");
	scene.player = new Splat.AnimatedEntity(canvas.width/2, canvas.height/2, 50, 50, scene.adminIdle, 0,0);

    scene.player.baseSpeed = 3;
    scene.player.actualSpeed = 3;
    scene.player.minimumSpeed = 0.01;
    scene.player.workers = 0;
    scene.player.warriors = 0;
    scene.player.itemCarried = -1;
    
    scene.hive = new Splat.AnimatedEntity(canvas.width/2, canvas.height-100, 50, 50, null, 0,0);
    scene.hive.color = "red";

	scene.player.r = 100;
	scene.player.theta = 0;
	scene.player.getTheta = function(){
		this.cx = (this.x + this.width/2);
		this.cy = (this.y + this.height/2);
		this.theta = Math.atan2(game.mouse.x-this.cx+scene.gameCamera.x, game.mouse.y-this.cy+scene.gameCamera.y);
	};
    
    scene.hive = new Splat.Entity(canvas.width/2, canvas.height-100, 50, 50);
    scene.hive.color = "red";
    
	scene.warriors = [];
    
    scene.gameCamera = new Splat.EntityBoxCamera(scene.player, 500, 500, canvas.width/2 ,canvas.height/2);
    scene.camera = scene.gameCamera;

}, function(ellapsedMillis) {
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
    if (game.mouse.consumePressed(2)) {
        if (scene.inHive){
          createWarriors(scene.warriors, 1, scene.player);
        }
        else if (scene.player.warriors > 0){
          removeWarriors(scene.warriors, 1, scene.player);
        }
	}
    if (game.mouse.consumePressed(0)) {
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
        if (scene.collectibles[i].active && scene.player.collides(scene.collectibles[i]) && scene.player.itemCarried < 0 && scene.player.workers >= scene.collectibles[i].cost){
            scene.player.itemCarried = i;
            scene.collectibles[i].active = false;
        }
    }
    
    if (scene.player.collides(scene.hive)){
        scene.inHive = true;
        
        if (scene.player.itemCarried > -1){
            scene.player.itemCarried = -1;
            scene.collectiblesGotten[scene.player.itemCarried] = true;
        }
        
        //Check for Game Win Condition
        var winCount=0;
        for (var w=0; w < scene.collectiblesGotten.length; w++){
            if (scene.collectiblesGotten[w]){
                winCount++;
            }
        }
        if (winCount===scene.collectiblesGotten.length){
            console.log("You Win!  Insert win action here");
        }
    }
    else{
        scene.inHive = false;
    }

    //enemies update loop
    for( i = 0; i < scene.enemies.length; i++ ){
    	//console.log("enemies update loop");
    	if(scene.enemies[i].collides(scene.player)){
            if (!scene.enemies[i].hitting){
                if (scene.player.workers > 0){
                    scene.player.workers--;
                    scene.enemies[i].hitting = true;
                    
                    //drop item if too weak
                    if (scene.player.itemCarried > -1){
                        if (scene.player.workers < scene.collectibles[scene.player.itemCarried].cost){
                            scene.collectibles[scene.player.itemCarried].x = scene.player.x;
                            scene.collectibles[scene.player.itemCarried].y = scene.player.y;
                            scene.collectibles[scene.player.itemCarried].active = true;
                            scene.player.itemCarried = -1;
                        }
                    }
                }
                else{
                console.log("Administrator bee hit, You Lose. You Suck.");
                }
            }
    	}
        else{
            scene.enemies[i].hitting = false;
        }
    	for( x = 0; x < scene.warriors.length; x++){
    		if(scene.enemies[i].collides(scene.warriors[x]) &&
    			scene.enemies[i].health > 0){
    			scene.enemies[i].collision();
                removeWarriors(scene.warriors, 1, scene.player);
    		}
    	}
    	scene.enemies[i].update();
    	if(scene.enemies[i].delete === true){
    		scene.enemies.splice(i,1);
    	}
    }
    scene.player.move(ellapsedMillis);
    scene.warriors.forEach(function(element) {
       element.move(ellapsedMillis); 
    });

}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
    drawEntity(context, scene.hive);

    for (var i=0; i<scene.collectibles.length; i++){
        if (scene.collectibles[i].active){
            drawEntity(context, scene.collectibles[i]);
            context.font = "20px winter";
            context.fillText(scene.collectibles[i].cost, scene.collectibles[i].x, scene.collectibles[i].y);
        }
    }

	for(var x = 0; x< scene.warriors.length; x++){
		drawAnimatedEntity(context, scene.warriors[x]);
	}

	for(x = 0; x < scene.enemies.length; x++){
		drawEntity(context, scene.enemies[x]);
	}

	drawAnimatedEntity(context, scene.player);
    
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
