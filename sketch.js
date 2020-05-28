var trex, trex_running, trex_collided, cloudImage,
 obstacleSpawn, obstacleSpawn2, obstacleSpawn3, obstacleSpawn4, obstacleSpawn5, obstacleSpawn6 ;
var obstacleGroup, cloudGroup;
var ground, invisibleGround, groundImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png")
  obstacleSpawn = loadImage("obstacle1.png");
  obstacleSpawn2 = loadImage("obstacle2.png");
  obstacleSpawn3 = loadImage("obstacle3.png");
  obstacleSpawn4 = loadImage("obstacle4.png");
  obstacleSpawn5 = loadImage("obstacle5.png");
  obstacleSpawn6 = loadImage("obstacle6.png");
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  spawnClouds();
  spawnObstacles();
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,160,40,10);
    cloud.y = random(80, 100);
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
}
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,180,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6))   ;
    console.log(rand)
    switch(rand){
      case 1:obstacle.addImage("obstales", obstacleSpawn);
        break;
      case 2:obstacle.addImage("obstales2", obstacleSpawn2);
        break;
      case 3:obstacle.addImage("obstales3", obstacleSpawn3);
        break;
      case 4:obstacle.addImage("obstales4", obstacleSpawn4);
        break;
      case 5:obstacle.addImage("obstales5", obstacleSpawn5);
        break;
      case 6:obstacle.addImage("obstales6", obstacleSpawn6);
        break;
      default:console.log("random")
         break;
       
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}