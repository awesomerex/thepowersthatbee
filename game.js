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
		"admin-idle-right"  :{
			"strip" : "assets/images/sprites/bees/SMALL_administrator_idle_right.png",
			"frames" : 2,
			"msPerFrame" : 100,
		},
        "admin-idle-left"  :{
			"strip" : "assets/images/sprites/bees/SMALL_administrator_idle_left.png",
			"frames" : 2,
			"msPerFrame" : 100,
		},
        "warrior-idle-right"  :{
			"strip" : "assets/images/sprites/bees/SMALL_warrior_idle_right.png",
			"frames" : 2,
			"msPerFrame" : 100,
		},
        "warrior-idle-left"  :{
			"strip" : "assets/images/sprites/bees/SMALL_warrior_idle_left.png",
			"frames" : 2,
			"msPerFrame" : 100,
		},
        "item-girl"  :{
			"strip" : "assets/images/sprites/items/Magical_Girl.png",
			"frames" : 1,
			"msPerFrame" : 100,
		},
        "item-pocky"  :{
			"strip" : "assets/images/sprites/items/Pocky.png",
			"frames" : 1,
			"msPerFrame" : 100,
		},
        "item-dvd"  :{
			"strip" : "assets/images/sprites/items/Revengers_DVD.png",
			"frames" : 1,
			"msPerFrame" : 100,
		},
        "item-steam"  :{
			"strip" : "assets/images/sprites/items/Steam_Cards.png",
			"frames" : 1,
			"msPerFrame" : 100,
		},
        "item-vr"  :{
			"strip" : "assets/images/sprites/items/VR_Headset.png",
			"frames" : 1,
			"msPerFrame" : 100,
		}
	}
};

var game = new Splat.Game(canvas, manifest);

var itemGirlSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];
var itemPockySpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];
var itemDvdSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];
var itemSteamSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];
var itemVrSpawnPoints = [{x:10, y:10}, {x:20, y:20}, {x:30, y:30}, {x:40, y:40}, {x:50, y:50}];

function spawnItems(items){
    var rand;
    rand = Math.floor(Math.random() * (itemGirlSpawnPoints.length));
    items[0].x = itemGirlSpawnPoints[rand].x;
    items[0].y = itemGirlSpawnPoints[rand].y;
    
    rand = Math.floor(Math.random() * (itemPockySpawnPoints.length));
    items[1].x = itemPockySpawnPoints[rand].x;
    items[1].y = itemPockySpawnPoints[rand].y;
    
    rand = Math.floor(Math.random() * (itemDvdSpawnPoints.length));
    items[2].x = itemDvdSpawnPoints[rand].x;
    items[2].y = itemDvdSpawnPoints[rand].y;
    
    rand = Math.floor(Math.random() * (itemSteamSpawnPoints.length));
    items[3].x = itemSteamSpawnPoints[rand].x;
    items[3].y = itemSteamSpawnPoints[rand].y;
    
    rand = Math.floor(Math.random() * (itemVrSpawnPoints.length));
    items[4].x = itemVrSpawnPoints[rand].x;
    items[4].y = itemVrSpawnPoints[rand].y;
}

var placeOnCircle = function(object, circle, offset){
	object.x = circle.cx + circle.r * Math.sin(circle.theta + offset);
	object.y = circle.cy + circle.r * Math.cos(circle.theta + offset);
};

<<<<<<< HEAD
function drawEntity(context, drawable){
=======

function drawEntity(context, drawable, debug){
>>>>>>> 53ddbacbf9045658e878b243db698a1d21c3687e
	context.fillStyle = drawable.color;
	context.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
    if(debug){
        context.strokeStyle = "Green";
        context.strokeRect(drawable.x, drawable.y, drawable.width, drawable.height);
    }
}

function drawAnimatedEntity(context, drawable, debug){
	drawable.draw(context);
    if(debug){
        context.strokeStyle = "Green";
        context.strokeRect(drawable.x, drawable.y, drawable.width, drawable.height);
    }
}

function createWarriors(array, num, player, initialSprite){
    for(var x = 0; x < num ; x++){
	  	var warrior = new Splat.AnimatedEntity(Math.floor(Math.random() * canvas.width) +1, Math.floor(Math.random() * canvas.height) +1, 10, 10, initialSprite, 0,0);
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
        console.log("Tried to remove more warriors than there are.  Do Better");
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
    scene.debug = false;
    scene.inHive = false;
    
    scene.timers.game = new Splat.Timer();
    scene.timers.game.expireMillis = 600000;
    scene.timers.game.start();
    
    scene.items = [];
    scene.itemGirlSprite = game.animations.get("item-girl");
    scene.itemGirl = new Splat.AnimatedEntity(0, 0, 50, 50, scene.itemGirlSprite, 0,0);
    scene.itemGirl.cost = 30;
    scene.itemPockySprite = game.animations.get("item-pocky");
    scene.itemPocky = new Splat.AnimatedEntity(0, 0, 50, 50, scene.itemPockySprite, 0,0);
    scene.itemPocky.cost = 30;
    scene.itemDvdSprite = game.animations.get("item-dvd");
    scene.itemDvd = new Splat.AnimatedEntity(0, 0, 50, 50, scene.itemDvdSprite, 0,0);
    scene.itemDvd.cost = 30;
    scene.itemSteamSprite = game.animations.get("item-steam");
    scene.itemSteam = new Splat.AnimatedEntity(0, 0, 50, 50, scene.itemSteamSprite, 0,0);
    scene.itemSteam.cost = 30;
    scene.itemVrSprite = game.animations.get("item-vr");
    scene.itemVr = new Splat.AnimatedEntity(0, 0, 50, 50, scene.itemVrSprite, 0,0);
    scene.itemVr.cost = 30;
    scene.items.push(scene.itemGirl);
    scene.items.push(scene.itemPocky);
    scene.items.push(scene.itemDvd);
    scene.items.push(scene.itemSteam);
    scene.items.push(scene.itemVr);
    scene.items.forEach(function(element) {
        element.active = true;
    });
    spawnItems(scene.items);
    
    scene.itemsGotten = [];
    scene.items.forEach(function() {
        scene.itemsGotten.push(false);
    });

    scene.enemies = [];
    
    createEnemy(scene.enemies, scene);
    
    scene.adminIdleRight = game.animations.get("admin-idle-right");
    scene.adminIdleLeft = game.animations.get("admin-idle-left");
	scene.player = new Splat.AnimatedEntity(canvas.width/2, canvas.height/2, 50, 50, scene.adminIdleLeft, 0,0);

    scene.player.baseSpeed = 3;
    scene.player.actualSpeed = 3;
    scene.player.minimumSpeed = 0.01;
    scene.player.facing = 0;    //0:left, 1:right
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
    
    scene.warriorIdleRight = game.animations.get("warrior-idle-right");
    scene.warriorIdleLeft = game.animations.get("warrior-idle-left");
	scene.warriors = [];
    
    scene.gameCamera = new Splat.EntityBoxCamera(scene.player, 500, 500, canvas.width/2 ,canvas.height/2);
    scene.camera = scene.gameCamera;

}, function(ellapsedMillis) {
	// simulation
	var scene = this;

    if (game.keyboard.isPressed("1")){
        if (scene.debug === true){
            scene.debug = false;
        }else{
            scene.debug = true;
        }
    }

    scene.player.actualSpeed = scene.player.baseSpeed - (scene.player.baseSpeed * (scene.player.workers + scene.player.warriors) * 0.01);
    if (scene.player.actualSpeed < 0){
        scene.player.actualSpeed = scene.player.minimumSpeed;
    }
    
	if (game.keyboard.isPressed("a")) {
		scene.player.x -= scene.player.actualSpeed;
        scene.player.facing = 0;
        scene.player.sprite = scene.adminIdleLeft;
        scene.warriors.forEach(function(element) {
            element.sprite = scene.warriorIdleLeft;
        });
	}
	if (game.keyboard.isPressed("d")) {
		scene.player.x += scene.player.actualSpeed;
        scene.player.facing = 1;
        scene.player.sprite = scene.adminIdleRight;
        scene.warriors.forEach(function(element) {
            element.sprite = scene.warriorIdleRight;
        });
	}
	if (game.keyboard.isPressed("w")) {
		scene.player.y -= scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("s")) {
		scene.player.y += scene.player.actualSpeed;
	}
    if (game.mouse.consumePressed(2)) {
        if (scene.inHive){
            if (scene.player.facing === 0){
                createWarriors(scene.warriors, 1, scene.player, scene.warriorIdleLeft);
            }
            else{
                createWarriors(scene.warriors, 1, scene.player, scene.warriorIdleRight);
            }
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
    
    for (var i=0; i<scene.items.length; i++){
        if (scene.items[i].active && scene.player.collides(scene.items[i]) && scene.player.itemCarried < 0 && scene.player.workers >= scene.items[i].cost){
            scene.player.itemCarried = i;
            scene.items[i].active = false;
        }
    }
    
    if (scene.player.collides(scene.hive)){
        scene.inHive = true;
        
        if (scene.player.itemCarried > -1){
            scene.player.itemCarried = -1;
            scene.itemsGotten[scene.player.itemCarried] = true;
        }
        
        //Check for Game Win Condition
        var winCount=0;
        for (var w=0; w < scene.itemsGotten.length; w++){
            if (scene.itemsGotten[w]){
                winCount++;
            }
        }
        if (winCount===scene.itemsGotten.length){
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
                        if (scene.player.workers < scene.items[scene.player.itemCarried].cost){
                            scene.items[scene.player.itemCarried].x = scene.player.x;
                            scene.items[scene.player.itemCarried].y = scene.player.y;
                            scene.items[scene.player.itemCarried].active = true;
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
    scene.items.forEach(function(element) {
       element.move(ellapsedMillis); 
    });

}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
    drawEntity(context, scene.hive, scene.debug);

    for (var i=0; i<scene.items.length; i++){
        if (scene.items[i].active){
            drawAnimatedEntity(context, scene.items[i], scene.debug);
            context.font = "20px winter";
            context.fillText(scene.items[i].cost, scene.items[i].x, scene.items[i].y);
        }
    }

	for(var x = 0; x< scene.warriors.length; x++){
		drawAnimatedEntity(context, scene.warriors[x], scene.debug);
	}

	for(x = 0; x < scene.enemies.length; x++){
		drawEntity(context, scene.enemies[x], scene.debug);
	}

	drawAnimatedEntity(context, scene.player, scene.debug);
    
    context.fillStyle = "#ffffff";
    context.font = "20px winter";
    context.fillText(scene.player.workers, scene.player.x, scene.player.y);
    context.fillText(scene.player.warriors, scene.player.x+30, scene.player.y);
    if (scene.itemsGotten[0]){
        context.fillText("Magical Girl: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 100);
    }
    else{
        context.fillText("Magical Girl: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 100);
    }
    if (scene.itemsGotten[1]){
        context.fillText("Pocky: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 130);
    }
    else{
        context.fillText("Pocky: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 130);
    }
    if (scene.itemsGotten[2]){
        context.fillText("Revengers DVD: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 160);
    }
    else{
        context.fillText("Revengers DVD: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 160);
    }
    if (scene.itemsGotten[3]){
        context.fillText("Steam Cards: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 190);
    }
    else{
        context.fillText("Steam Cards: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 190);
    }
    if (scene.itemsGotten[4]){
        context.fillText("VR Headset: CHECK!", scene.camera.x + scene.camera.width/2, scene.camera.y + 220);
    }
    else{
        context.fillText("VR Headset: Not Found", scene.camera.x + scene.camera.width/2, scene.camera.y + 220);
    }
    context.fillText(Math.round((scene.timers.game.expireMillis-scene.timers.game.time)/1000), scene.camera.x + scene.camera.width/2,  scene.camera.y + 50);

    

}));

game.scenes.switchTo("loading");
