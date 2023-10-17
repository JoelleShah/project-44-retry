var rocketShip;
var rocket;
var Asteriod;
var obstacle, obstacleGroup;
var blackBg;
var bkground;
var wrench;
var lifeSaver, lifeSaverGroup;
var bulletImg
var bullet, bulletGroup;
//var explosion
var life = 200;

function preload() {
  rocketShip = loadImage("./rocketShip.png");
  Asteriod = loadImage("./asteroid.png");
  blackBg = loadImage("./bg.jpeg");
  wrench = loadImage("./wrench.png");
  bulletImg = loadImage("./bullet.png");
  explosion = loadImage("./explosion.png");
}

function setup() {
  createCanvas(800, 800);

  bkground = createSprite(400, 300);
  bkground.addImage(blackBg);
  bkground.scale = 1.5;

  rocket = createSprite(50, 700, 200, 200);
  rocket.addImage("rocketShip", rocketShip);
  rocket.scale = 0.6;

  obstacleGroup = new Group();
  lifeSaverGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background("black");
  start();
  drawSprites();
  fill("white");
  rect(100, 50, 200, 10);
  fill("red");
  rect(100, 50, life, 10);

  if (keyDown("SPACE")){
    createBullet();
  }
}

function obstacles() {
  if (frameCount % 50 === 0) {
    obstacle = createSprite(random(50, 750), 0, 500, 400);
    obstacle.addImage("asteriod", Asteriod);
    obstacle.scale = 0.2;
    obstacle.velocityY = +3;
    obstacleGroup.add(obstacle);
  }
}

function lifeSavers() {
  if (frameCount % 100 == 0) {
    lifeSaver = createSprite(random(50, 750), 0, 300, 300);
    lifeSaver.addImage("wrench", wrench);
    lifeSaver.scale = 0.2;
    lifeSaver.velocityY = +3;
    lifeSaverGroup.add(lifeSaver)
  }
}

function createBullet() {
  bullet = createSprite(rocket.x,rocket.y,10,20)
  bullet.addImage("bullet", bulletImg)
  bullet.scale = 0.1
  bullet.velocityY =-4
  bullet.lifeTime = 300
  bulletGroup.add(bullet)
}

function gameOver() {
  obstacleGroup.setVelocityYEach(0);
  lifeSaverGroup.setVelocityYEach(0);
  bkground.velocityY = 0;
  textSize(30);
  fill("white");
  text("Game Over", 200, 200);
  restart = createButton("restart");
  restart.position(350, 350);
  restart.size(50, 50);
  restart.mousePressed(start);
}

function start() {
  rocket.x = mouseX;

  bkground.velocityY = 2;

  if (bkground.y >= 700) {
    bkground.y = 500;
  }
  obstacles();
  lifeSavers();

  if (rocket.isTouching(obstacleGroup)) {
    life -= 2;
  }
  if (rocket.isTouching(lifeSaverGroup)) {
    life += 1;
  }
  if (life <= 0) {
    gameOver();
    life = 0;
  }
}
