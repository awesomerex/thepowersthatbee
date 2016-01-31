"use strict";

var Splat = require("splatjs");
var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
	},
	"sounds": {
        "badger-growl" : "assets/sounds/growl.wav",
        "badger-snarl" : "assets/sounds/Snarl.wav",
        "frog-ribbit" : "assets/sounds/Ribbit.wav",
        "bird-kaw" : "assets/sounds/Kaw.wav",
        "mole-scuttle" : "assets/sounds/mole_noise.wav",
        "springOfMyHeart" : "assets/sounds/The_Spring_of_My_Heart.wav",
        "brrTheme" : "assets/sounds/Brr_Theme.wav",
        "winterTheme" : "assets/sounds/Wintry_Woods.ogg"
	},
	"fonts": {
        "Frostys": {
        	"truetype" : "assets/fonts/Frostys.TTF"
        } 
	},
	"animations": {
        "hive"  :{
			"strip" : "assets/images/sprites/misc/Hive.png",
			"frames" : 3,
			"msPerFrame" : 70,
		},
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
		},
        "world-bg" : {
            "strip" : "assets/images/world_map.jpg",
            "frames" : 1,
            "msPerFrame" : 100,
        },
        "world-bg-springtime" : {
            "strip" : "assets/images/world_map_springtime.jpg",
            "frames" : 1,
            "msPerFrame" : 100,
        },
        "enemy-krow-left"  :{
			"strip" : "assets/images/sprites/enemies/Krow_left.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-krow-right"  :{
			"strip" : "assets/images/sprites/enemies/Krow_right.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-cooljay-left"  :{
			"strip" : "assets/images/sprites/enemies/Cool_Jay_left.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-cooljay-right"  :{
			"strip" : "assets/images/sprites/enemies/Cool_Jay_right.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-brr-left"  :{
			"strip" : "assets/images/sprites/enemies/Brr_left.png",
			"frames" : 1,
			"msPerFrame" : 250,
		},
        "enemy-brr-right"  :{
			"strip" : "assets/images/sprites/enemies/Brr_right.png",
			"frames" : 1,
			"msPerFrame" : 250,
		},
        "enemy-frog-left"  :{
			"strip" : "assets/images/sprites/enemies/Frogue_left.png",
			"frames" : 1,
			"msPerFrame" : 250,
		},
        "enemy-frog-right"  :{
			"strip" : "assets/images/sprites/enemies/Frogue_right.png",
			"frames" : 1,
			"msPerFrame" : 250,
		},
        "enemy-badjer-walking-left"  :{
			"strip" : "assets/images/sprites/enemies/Badjer_Walking_left.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-badjer-walking-right"  :{
			"strip" : "assets/images/sprites/enemies/Badjer_Walking_right.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-mole-walking-left"  :{
			"strip" : "assets/images/sprites/enemies/mole_walking_left.png",
			"frames" : 2,
			"msPerFrame" : 250,
		},
        "enemy-mole-walking-right"  :{
			"strip" : "assets/images/sprites/enemies/mole_walking_right.png",
			"frames" : 2,
			"msPerFrame" : 250,
		}
	}
};
var game = new Splat.Game(canvas, manifest);


game.collisionboxfile = require("./assets/collision.json");

var itemGirlSpawnPoints = [{x:1287, y:8869}];
var itemPockySpawnPoints = [{x:608, y:1745}];
var itemDvdSpawnPoints = [{x:1273, y:11694}, {x:5246, y:11653}, {x:6839, y:11477}, {x:9882, y:11657}, {x:13082, y:11537}];
var itemSteamSpawnPoints = [{x:11582, y:1638}, {x:6830, y:1587}, {x:16772, y:1378}, {x:18566, y:2007}];
var itemVrSpawnPoints = [{x:13665, y:8883}, {x:18301, y:8904}, {x:13517, y:7464}, {x:12920, y:8874}];


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

function drawEntity(context, drawable, debug){

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

function createWarriors(array, num, player, sprite){
    for(var x = 0; x < num ; x++){
	  	var warrior = new Splat.AnimatedEntity(Math.floor(Math.random() * canvas.width) +1, Math.floor(Math.random() * canvas.height) +1, 59, 81, sprite, 0,0);
	 	array.push(warrior);
        player.warriors++;
	 }
}

function removeWarriors(array, num, player){
    if (array.length >= num){
        array.splice(0,num);
        player.warriors--;
    }
}

function createBird(array, scene, x, y, width, height, spriteLeft, spriteRight, health){
	var enemy = new Splat.AnimatedEntity(x, y, width, height, spriteRight, 0,0);
    enemy.hitting = false;
	enemy.go = function(){
		this.target();
		this.x += this.speedx;
		this.y += this.speedy;
        if (this.speedx < 0 && this.sprite !== spriteLeft){ 
            this.sprite = spriteLeft;
        }
        else if (this.speedx > 0 && this.sprite !== spriteRight){
            this.sprite = spriteRight;
        }
	};
	enemy.target = function(){
		var targetx = scene.player.x + scene.player.width/2;
		var targety = scene.player.y + scene.player.height/2;
		this.speed = 1;
		var distance =  Math.sqrt( Math.pow((targetx - this.x), 2) + Math.pow((targety - this.y),2));
		if( distance < 1000){
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
	enemy.collision = function(){
		this.health --;
	};
	enemy.update = function(){
		if(this.health <= 0){
			this.delete = true;
		}
        if (!this.hitting){
            this.target();
            this.go();
        }
	};
	enemy.delete = false;
	enemy.health = health;
	array.push(enemy);
}

function createGroundEnemy(array, scene, x, y, width, height, spriteLeft, spriteRight, health){
	var enemy = new Splat.AnimatedEntity(x, y, width, height, spriteRight, 0,0);
    enemy.hitting = false;
	enemy.go = function(){
		this.target();
		this.x += this.speedx;
        if (this.speedx < 0 && this.sprite !== spriteLeft){ 
            this.sprite = spriteLeft;
        }
        else if (this.speedx > 0 && this.sprite !== spriteRight){
            this.sprite = spriteRight;
        }
	};
	enemy.target = function(){
		var targetx = scene.player.x + scene.player.width/2;
		var targety = scene.player.y + scene.player.height/2;
		this.speed = 1;
		var distance =  Math.sqrt( Math.pow((targetx - this.x), 2) + Math.pow((targety - this.y),2));
		if( distance < 500){
			this.speedx = Math.abs(targetx - this.x)/distance * this.speed;
			if (targetx - this.x < 0){
				this.speedx *= -1;
			}
		}else{
			this.speedx = 0;
		}
	};
	enemy.collision = function(){
		this.health --;
	};
	enemy.update = function(){
		if(this.health <= 0){
			this.delete = true;
		}
        if (!this.hitting){
            this.target();
            this.go();
        }
	};
	enemy.delete = false;
	enemy.health = health;
	array.push(enemy);
}

function createBrr(array, scene, x, y, width, height, spriteLeft, spriteRight, health){
	var enemy = new Splat.AnimatedEntity(x, y, width, height, spriteRight, 0,0);
    enemy.hitting = false;
	enemy.go = function(){
		this.target();
        if (this.speedx < 0 && this.sprite !== spriteLeft){ 
            this.sprite = spriteLeft;
        }
        else if (this.speedx > 0 && this.sprite !== spriteRight){
            this.sprite = spriteRight;
        }
	};
	enemy.target = function(){
		var targetx = scene.player.x + scene.player.width/2;
		var targety = scene.player.y + scene.player.height/2;
		this.speed = 1;
		var distance =  Math.sqrt( Math.pow((targetx - this.x), 2) + Math.pow((targety - this.y),2));
		if( distance < 1000){
            //Brr Theme
            this.shutupnode = true;
		}else{
			//Stop Brr Theme
            this.shutupnode = true;
		}
	};
	enemy.collision = function(){
		this.health --;
	};
	enemy.update = function(){
		if(this.health <= 0){
			this.delete = true;
		}
        if (!this.hitting){
            this.target();
            this.go();
        }
	};
	enemy.delete = false;
	enemy.health = health;
	array.push(enemy);
}

// function createFrog(array, scene, x, y){
//     var frogimg = game.animations.get('frog');
//     var frog = new Splat.AnimatedEntity(100, 100, 30, 30, frogimg, 0, 0 );
//     frog.hitting = false;
//     frog.go = function(){
//         this.target();
//         this.x += this.speedx;
//         this.y += this.speedy;
//         if (this.speedx < 0 && this.sprite !== spriteLeft){ 
//             this.sprite = spriteLeft;
//         }
//         else if (this.speedx > 0 && this.sprite !== spriteRight){
//             this.sprite = spriteRight;
//         }
//     };
//     frog.target = function(){
//         var targetx = scene.player.x + scene.player.width/2;
//         var targety = scene.player.y + scene.player.height/2;
//         this.speed = 1;
//         var distance =  Math.sqrt( Math.pow((targetx - this.x), 2) + Math.pow((targety - this.y),2));
//         if( distance < 500){
//             this.speedx = Math.abs(targetx - this.x)/distance * this.speed;
//             this.speedy = Math.abs(targety - this.y)/distance * this.speed;
//             if (targetx - this.x < 0){
//                 this.speedx *= -1;
//             }
//             if (targety - this.y < 0){
//                 this.speedy *= -1;
//             }
//         }else{
//             this.speedx = 0;
//             this.speedy = 0;
//         }
//     };
//     frog.collision = function(){
//         this.health --;
//         console.log("frog", this.health);
//     };
//     frog.update = function(){
//         if(this.health <= 0){
//             this.delete = true;
//         }
//         if (!this.hitting){
//             this.target();
//             this.go();
//         }
//     };
//     frog.delete = false;
//     frog.health = 30;
//     array.push(frog);
// }

var enemyBadjerSpawnPoints = [{x:1497, y:1717}, {x:2775, y:5115}];
var enemyBrrSpawnPoints = [{x:1587, y:8564}];
var enemyCoolJaySpawnPoints = [{x:10335, y:3809}, {x:7784, y:2072}, {x:5583, y:8276}, {x:2365, y:2901}, {x:8327, y:4547}, {x:12515, y:4250}, {x:12085, y:1469}, {x:15626, y:3543}, {x:14252, y:1817}, {x:18517, y:3022}, {x:17759, y:1229}, {x:17258, y:4407}];
var enemyFrogSpawnPoints = [{x:14237, y:8915}, {x:14817, y:8915}, {x:15837, y:8915}, {x:16375, y:8915}, {x:16677, y:8915}];
var enemyKrowSpawnPoints = [{x:2365, y:2901}, {x:13333, y:7506}, {x:13673, y:4194}, {x:11908, y:7783}, {x:7124, y:4726}, {x:7026, y:7302}];
var enemyMoleSpawnPoints = [{x:2930, y:11546}, {x:3970, y:11546}, {x:5090, y:11546}, {x:9848, y:11557}, {x:12925, y:11421}];
function spawnEnemies(enemies, scene){
    var krowLeft = game.animations.get("enemy-krow-left");
    var krowRight = game.animations.get("enemy-krow-right");
    var coolJayRight = game.animations.get("enemy-cooljay-right");
    var coolJayLeft = game.animations.get("enemy-cooljay-left");
    var brrRight = game.animations.get("enemy-brr-right");
    var brrLeft = game.animations.get("enemy-brr-left");
    var frogRight = game.animations.get("enemy-frog-right");
    var frogLeft = game.animations.get("enemy-frog-left");
    var badjerRight = game.animations.get("enemy-badjer-walking-right");
    var badjerLeft = game.animations.get("enemy-badjer-walking-left");
    var moleRight = game.animations.get("enemy-mole-walking-right");
    var moleLeft = game.animations.get("enemy-mole-walking-left");
    enemyBadjerSpawnPoints.forEach(function(point) {
        createGroundEnemy(enemies, scene, point.x, point.y, 587, 238, badjerLeft, badjerRight, 15);
    });
    enemyBrrSpawnPoints.forEach(function(point) {
        createBrr(enemies, scene, point.x, point.y, 580, 495, brrLeft, brrRight, 1000000000);
    });
    enemyCoolJaySpawnPoints.forEach(function(point) {
        createBird(enemies, scene, point.x, point.y, 179, 168, coolJayLeft, coolJayRight, 10);
    });
    enemyFrogSpawnPoints.forEach(function(point) {
        createGroundEnemy(enemies, scene, point.x, point.y, 334, 197, frogLeft, frogRight, 15);
    });
    enemyKrowSpawnPoints.forEach(function(point) {
        createBird(enemies, scene, point.x, point.y, 169, 150, krowLeft, krowRight, 10);
    });
    enemyMoleSpawnPoints.forEach(function(point) {
        createGroundEnemy(enemies, scene, point.x, point.y, 439, 296, moleLeft, moleRight, 20);
    });
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	//init
	var scene =this;
    //Game Variables
    scene.debug = false;
    scene.inHive = false;
    scene.won = false;
    scene.collisionboxes = [];
    for (var x = 0; x < game.collisionboxfile.length; x++){
        var collidable = new Splat.Entity(game.collisionboxfile[x][0], game.collisionboxfile[x][1]-game.collisionboxfile[x][3], game.collisionboxfile[x][2], game.collisionboxfile[x][3]);
        scene.collisionboxes.push(collidable);
    }
    scene.timers.game = new Splat.Timer();
    scene.timers.game.expireMillis = 600000;
    scene.timers.game.start();
    
    scene.bgImage = game.animations.get("world-bg");
    scene.bgImageSpring = game.animations.get("world-bg-springtime");
    scene.background = new Splat.AnimatedEntity(0, 0, 0, 0, scene.bgImage, 0, 0);
    scene.backgroundSpring = new Splat.AnimatedEntity(0, 0, 0, 0, scene.bgImageSpring, 0, 0);
    
    scene.items = [];
    scene.itemGirlSprite = game.animations.get("item-girl");
    scene.itemGirl = new Splat.AnimatedEntity(0, 0, 170, 200, scene.itemGirlSprite, 0,0);
    scene.itemGirl.cost = 25;
    scene.itemPockySprite = game.animations.get("item-pocky");
    scene.itemPocky = new Splat.AnimatedEntity(0, 0, 170, 200, scene.itemPockySprite, 0,0);
    scene.itemPocky.cost = 10;
    scene.itemDvdSprite = game.animations.get("item-dvd");
    scene.itemDvd = new Splat.AnimatedEntity(0, 0, 180, 200, scene.itemDvdSprite, 0,0);
    scene.itemDvd.cost = 20;
    scene.itemSteamSprite = game.animations.get("item-steam");
    scene.itemSteam = new Splat.AnimatedEntity(0, 0, 260, 200, scene.itemSteamSprite, -10,0);
    scene.itemSteam.cost = 20;
    scene.itemVrSprite = game.animations.get("item-vr");
    scene.itemVr = new Splat.AnimatedEntity(0, 0, 270, 200, scene.itemVrSprite, -10,0);
    scene.itemVr.cost = 45;
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
    
    spawnEnemies(scene.enemies, scene);
    
    scene.adminIdleRight = game.animations.get("admin-idle-right");
    scene.adminIdleLeft = game.animations.get("admin-idle-left");

	scene.player = new Splat.AnimatedEntity(10046, 8337, 75, 100, scene.adminIdleLeft, 0,0);
    scene.player.baseSpeed = 2;
    scene.player.actualSpeed = 2;
    scene.player.minimumSpeed = 0.01;
    scene.player.facing = 0;    //0:left, 1:right
    scene.player.workers = 0;
    scene.player.warriors = 0;
    scene.player.itemCarried = -1;
	scene.player.r = 200;
	scene.player.theta = 0;
	scene.player.getTheta = function(){
		this.cx = (this.x );
		this.cy = (this.y );
		this.theta = Math.atan2(game.mouse.x-this.cx+scene.gameCamera.x, game.mouse.y-this.cy+scene.gameCamera.y);
	};
    
    scene.hiveSprite = game.animations.get("hive");
    scene.hive = new Splat.AnimatedEntity(10146, 8136, 240, 201, scene.hiveSprite, 0,0);
    
    scene.warriorIdleRight = game.animations.get("warrior-idle-right");
    scene.warriorIdleLeft = game.animations.get("warrior-idle-left");
	scene.warriors = [];
    
    scene.gameCamera = new Splat.EntityBoxCamera(scene.player, 500, 500, canvas.width/2 ,canvas.height/2);
    scene.camera = scene.gameCamera;
    
    game.sounds.play("winterTheme", true);

}, function(ellapsedMillis) {
	// simulation
	var scene = this;
    scene.player.vx *= 1/500;
    scene.player.vy *= 1/500;
    if (game.keyboard.isPressed("1")){
        if (scene.debug === true){
            scene.debug = false;
        }else{
            scene.debug = true;
        }
    }
    if (game.keyboard.isPressed("2")){
        game.scenes.switchTo("End");
    }

    scene.player.actualSpeed = scene.player.baseSpeed - (scene.player.baseSpeed * (scene.player.workers + scene.player.warriors) * 0.01);
    if (scene.player.actualSpeed < 0){
        scene.player.actualSpeed = scene.player.minimumSpeed;
    }
    
	if (game.keyboard.isPressed("a")) {
		scene.player.vx = -scene.player.actualSpeed;
        scene.player.facing = 0;
        scene.player.sprite = scene.adminIdleLeft;
        scene.warriors.forEach(function(element) {
            element.sprite = scene.warriorIdleLeft;
        });
	}
	if (game.keyboard.isPressed("d")) {
		scene.player.vx = scene.player.actualSpeed;
        scene.player.facing = 1;
        scene.player.sprite = scene.adminIdleRight;
        scene.warriors.forEach(function(element) {
            element.sprite = scene.warriorIdleRight;
        });
	}
	if (game.keyboard.isPressed("w")) {
		scene.player.vy = -scene.player.actualSpeed;
	}
	if (game.keyboard.isPressed("s")) {
		scene.player.vy = scene.player.actualSpeed;
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
	}

	scene.player.getTheta();
	var count = 0;
	for(var x = 0; x< scene.warriors.length; x++){
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
        scene.reset();
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
            scene.itemsGotten[scene.player.itemCarried] = true;
            scene.player.itemCarried = -1;
        }
        
        //Check for Game Win Condition
        var winCount=0;
        for (var w=0; w < scene.itemsGotten.length; w++){
            if (scene.itemsGotten[w]){
                winCount++;
            }
        }
        if (winCount===scene.itemsGotten.length){
            scene.won = true;
            game.sounds.stop("winterTheme");
            game.sounds.play("springOfMyHeart", true);
        }
    }
    else{
        scene.inHive = false;
    }

    //enemies update loop
    for( i = 0; i < scene.enemies.length; i++ ){
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
                    scene.reset();
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
    scene.hive.move(ellapsedMillis);
    scene.warriors.forEach(function(element) {
       element.move(ellapsedMillis); 
    });
    scene.enemies.forEach(function(element) {
       element.move(ellapsedMillis); 
    });
    for(x = 0; x < scene.collisionboxes.length; x++){
        if(scene.player.collides(scene.collisionboxes[x])){
            scene.player.x = Math.floor(scene.player.lastX);
            scene.player.y = Math.floor(scene.player.lastY);
        }
    }
    
}, function(context) {
	// draw
	var scene = this;
	context.fillStyle = "#092227";
	context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);

    if (!scene.won){
        drawAnimatedEntity(context, scene.background, scene.debug);
    }
    else{
        drawAnimatedEntity(context, scene.backgroundSpring, scene.debug);
    }
    drawAnimatedEntity(context, scene.hive, scene.debug);

    for (var i=0; i<scene.items.length; i++){
        if (scene.items[i].active){
            drawAnimatedEntity(context, scene.items[i], scene.debug);
            context.font = "20px Frostys";
            context.fillStyle = "#ffffff";
            context.fillText(scene.items[i].cost, scene.items[i].x, scene.items[i].y);
        }
    }

	for(var x = 0; x< scene.warriors.length; x++){
		drawAnimatedEntity(context, scene.warriors[x], scene.debug);
	}

	for(x = 0; x < scene.enemies.length; x++){
		drawAnimatedEntity(context, scene.enemies[x], scene.debug);
	}

	drawAnimatedEntity(context, scene.player, scene.debug);
    
    context.fillStyle = "#ffffff";
    context.font = "20px Frostys";
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
    if (scene.won){
        context.fillText("You've Won!  Have a Party!  With Honey!", scene.camera.x + scene.camera.width/2, scene.camera.y + 250);
    }
    context.fillText(Math.round((scene.timers.game.expireMillis-scene.timers.game.time)/1000), scene.camera.x + scene.camera.width/2,  scene.camera.y + 50);

    if(scene.debug === true){
        for( x = 0; x < scene.collisionboxes.length; x++){
            drawEntity(context, scene.collisionboxes[x], scene.debug);
        }
    }
}));
    
game.scenes.add("End", new Splat.Scene(canvas, function() {
    //init
    var scene = this;
    scene.drawables = [];
    



},function(){
    //simulation
    var scene = this;
    scene.debug = false;
    if (game.keyboard.isPressed("1")){
        if (scene.debug === true){
            scene.debug = false;
        }else{
            scene.debug = true;
        }
    }


},function(context){
    //draw
    var scene = this;
    context.fillStyle = "#092227";
    context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
    for(var x = 0; x < scene.drawables.length; x++){
        drawAnimatedEntity(context, scene.drawables[x], scene.debug);
    }
}));

game.scenes.switchTo("loading");
