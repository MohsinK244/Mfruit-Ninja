var PLAY=1;
var END=0;
var gameState=1;

var sword , swordImage;
var fruitGroup , fruitA , fruitB , fruitC , fruitD;
var enemyGroup , enemyA, enemyB;

var score = 0;
var gameOver , gameOverImage;

var swordSwooshSound, gameOverSound;

function preload(){
  swordImage = loadImage("sword.png");
  fruitA = loadImage("fruit1.png");
  fruitB = loadImage("fruit2.png");
  fruitC = loadImage("fruit3.png");
  fruitD = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  enemyAlien = loadAnimation("alien1.png","alien2.png");
  swordSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600, 600);
  
  sword = createSprite(100,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
 background('lightblue');
  
 if(gameState===PLAY){
  sword.y = mouseY;
  sword.x = mouseX;
  fruits();
  Enemy();
   
   if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     swordSwooshSound.play();
     score=score+2;
   }
   if(enemyGroup.isTouching(sword)){
     sword.addImage(gameOverImage);
     sword.y = 250;
     sword.x = 300;
     gameOverSound.play();
     gameState=END;
   }
 }
 
  else if(gameState===END){
    
  }
  
  drawSprites();
  text("Score: "+ score, 280,30);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
     
    fruit.scale=0.2;
    fruit.debug=true;
    r=Math.round(random(1,4));
   if(r==1){
     fruit.addImage(fruitA);
   } else if(r==2){
     fruit.addImage(fruitB);
   }else if(r==3){
     fruit.addImage(fruitC);
   }else if(r==4){
     fruit.addImage(fruitD);
   }
    position = Math.round(random(1,2));
   if(position==1)
     {
      fruit.x=400;
      fruit.velocityX=-(7+score/4);
     }
    else
     {
      if(position==2){
        fruits.x=0;
        fruit.velocityX=-(7+score/4);
      }
     } 
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    enemy=createSprite(400,200,20,20);
    enemy.addAnimation("moving",enemyAlien);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-(8+score/10);
    enemy.setLifetime=50;
    
    enemyGroup.add(enemy);
  }
}

