localStorage["High.score"] = 0

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyrun, monkeycol;
var ground, invisibleGround, groundImage;

var fruitgroup, fruitimg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var bg,bgimg;

var score;

var gameOver,restart,gameOverimage,restartimage;

var fruit,fruitimg;

function preload(){
  monkeyrun =      loadAnimation("mon1.png","mon2.png","mon3.png","mon4.png","mon5.png");
  monkeycol = loadAnimation("moncol.png");
  
  groundImage = loadImage("land33.png");
  
  fruitimg = loadImage("banana.png");
  
  bgimg = loadImage("j2.png")
  
  obstacle1 = loadImage("1.png");
  obstacle2 = loadImage("2.png");
  obstacle3 = loadImage("3.png");
  obstacle4 = loadImage("4.png");
  obstacle5 = loadImage("5.png");
  obstacle6 = loadImage("6.png");
  
  gameOverimage = loadImage("gameOver.png")
  restartimage = loadImage("RESET.webp")
}

function setup() {
  createCanvas(600, 300);
  
  bg = createSprite (300,150,20,20)
  bg.addImage("bakground",bgimg)
  
  monkey = createSprite(50,250,20,50);
  monkey.addAnimation("running", monkeyrun);
  monkey.addAnimation("collided", monkeycol);
  monkey.scale = 0.12;
  
  ground = createSprite(300,400,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,260,400,10);
  invisibleGround.visible = false;
  
  fruitgroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  //place gameOver and restart icon on the screen
    gameOver = createSprite(300,100);
    restart = createSprite(300,140);
    gameOver.addImage(gameOverimage)
    gameOver.scale = 0.5;
    restart.addImage(restartimage)
    restart.scale = 0.09;

    gameOver.visible = false;
    restart.visible = false;
}

function draw() {
  background(99, 230, 55 );
  textSize(15);
  textFont("Georgia");
  fill("black");
  text("Score: "+ score, 500,50);
  text("highscore: "+ localStorage["High.score"],400,50 )
  
  monkey.debug=true
monkey.setCollider("rectangle",10,10,30,30);
  if (gameState===PLAY){
    
  //score = score + Math.round(getFrameRate()/60);
    
    
  
  if(keyDown("space")&& monkey.y>=245) {
    monkey.velocityY = -14;
  }
  
monkey.velocityY = monkey.velocityY + 0.6
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
    
      if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
    
  }
  
    if(fruitgroup.isTouching(monkey)){
    score=score+10
      fruitgroup.destroyEach();
      
    }
    
  ground.velocityX = -4;
    
  Fruit();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
    gameState=END
    }
  } else if(gameState===END){
    
      gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    fruitgroup.setVelocityXEach(0);
    
    //change the monkey animation
    monkey.changeAnimation("collided",monkeycol)
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    fruitgroup.setLifetimeEach(-1);
  
      if(mousePressedOver(restart)) {
    reset();
  }
  
  }
  monkey.collide(invisibleGround);
  drawSprites();
}

function Fruit() {
  //write code here to spawn the clouds
  if (frameCount % 217 === 0) {
   fruit = createSprite(600,240,40,10);
    fruit.y = Math.round(random(80,120));
    fruit.addImage(fruitimg);
    fruit.scale = 0.10 ;
    fruit.velocityX = -5;
    
     //assign lifetime to the variable
    fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    fruitgroup.add(fruit);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = -6;
    obstacle.scale=0.5
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  fruitgroup.destroyEach();
  
  monkey.changeAnimation("running",monkeyrun);
  
  if(localStorage["High.score"] < score){
  localStorage["High.score"] = score
  }
  
  score = 0;
  
  
}