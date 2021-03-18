var man, oldman
var jungle
var blocks
var OMIimage, OMWimage, OMAimage, OMHimage, MIimage, MWimage, MAimage, jungleimage
var ground
var reverse
var player1Score, player2Score
var gameState="Play"
var gameOver, restart;
var gameOverImg, restartImg

function preload() {
OMIimage=loadAnimation("Images/1 Old_man/Idle/OMI1.png","Images/1 Old_man/Idle/OMI2.png","Images/1 Old_man/Idle/OMI3.png")
OMWimage=loadAnimation("Images/1 Old_man/Walk/OMW1.png","Images/1 Old_man/Walk/OMW2.png","Images/1 Old_man/Walk/OMW3.png","Images/1 Old_man/Walk/OMW4.png","Images/1 Old_man/Walk/OMW5.png")
OMAimage=loadAnimation("Images/1 Old_man/Attack/OMA1.png", "Images/1 Old_man/Attack/OMA2.png", "Images/1 Old_man/Attack/OMA3.png", "Images/1 Old_man/Attack/OMA4.png")
OMHimage=loadAnimation("Images/1 Old_man/Hurt/OMH1.png","Images/1 Old_man/Hurt/OMH2.png","Images/1 Old_man/Hurt/OMH1.png")
OMDimage=loadImage("Images/1 Old_man/Old_man_death.png")
jungleimage=loadImage("Images/Background.png")
MIimage=loadAnimation("Images/3 Man/Idle/MI1.png","Images/3 Man/Idle/MI2.png","Images/3 Man/Idle/MI3.png","Images/3 Man/Idle/MI4.png")
MWimage=loadAnimation("Images/3 Man/Walk/MW1.png","Images/3 Man/Walk/MW2.png","Images/3 Man/Walk/MW3.png","Images/3 Man/Walk/MW4.png", "Images/3 Man/Walk/MW5.png", "Images/3 Man/Walk/MW6.png")
MAimage=loadAnimation("Images/3 Man/Attack/MA1.png","Images/3 Man/Attack/MA2.png","Images/3 Man/Attack/MA3.png","Images/3 Man/Attack/MA4.png")
MHimage=loadAnimation("Images/3 Man/Hurt/MH1.png","Images/3 Man/Hurt/MH2.png","Images/3 Man/Hurt/MH1.png")
MDimage=loadImage("Images/3 Man/Man_death.png")
gameOverImg=loadImage("Images/gameOver.png");
restartImg=loadImage("Images/restart.png");
}

function setup() {
createCanvas(1200,800);
oldman=createSprite(30,750,50,50)
oldman.addAnimation("Oldmanidle",OMIimage)
oldman.addAnimation("Oldmanwalk",OMWimage);
oldman.addAnimation("Oldmanattack",OMAimage)
oldman.addAnimation("Oldmanhurt",OMHimage)
oldman.addImage("Oldmandeath",OMDimage)

man=createSprite(1170,750,50,50)
man.addAnimation("Manidle",MIimage)
man.addAnimation("Manwalk",MWimage)
man.addAnimation("Manattack",MAimage)
man.addAnimation("Manhurt",MHimage)
man.addImage("Mandeath",MDimage)

ground=createSprite(600,800,1200,5);
ground.visible=false;
reverse=0
player1Score=10
player2Score=10

gameOver = createSprite(550,400);
gameOver.addImage("Gameover",gameOverImg);

restart = createSprite(550,450);
restart.addImage("Restart",restartImg);

// gameOver.scale = 0.5;
// restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;



}

function draw() {
  background(jungleimage)
  if(gameState==="Play"){

gameOver.visible = false;
restart.visible = false;

  //Walk Animations for Oldman
   if(keyWentUp("D")){
    oldman.changeAnimation("Oldmanidle",OMIimage)
  }
  if(keyWentUp("A")){
    oldman.changeAnimation("Oldmanidle",OMIimage)
  }
  if(keyWentDown("A")){
    oldman.changeAnimation("Oldmanwalk",OMWimage);
  }
  if(keyWentDown("D")){
    oldman.changeAnimation("Oldmanwalk",OMWimage);
  }

  if(keyDown("A")){
    oldman.x=oldman.x-4;
  }
  if(keyDown("D")){
    oldman.x=oldman.x+4;
  }

//Walk Animations for Man
  //Walk Animations for Oldman
  if(keyWentUp("J")){
    man.changeAnimation("Manidle",MIimage)
  }
  if(keyWentUp("L")){
    man.changeAnimation("Manidle",MIimage)
  }
  if(keyWentDown("J")){
    man.changeAnimation("Manwalk",MWimage);
  }
  if(keyWentDown("L")){
    man.changeAnimation("Manwalk",MWimage);
  }

  if(keyDown("J")){
    man.x=man.x-4;
  }
  if(keyDown("L")){
    man.x=man.x+4;
  }

  //Jump animations for Oldman
  if(keyWentDown("Q") && oldman.y>550){
    oldman.velocityY=-10;
    oldman.changeAnimation("Oldmanidle",OMIimage);
  }
  oldman.velocityY=oldman.velocityY+0.8
  //fighting animations for oldman
  if(keyWentDown("W")){
    oldman.changeAnimation("Oldmanattack",OMAimage);
    }

     //Jump animations for Man
  if(keyWentDown("O") && man.y>550){
    man.velocityY=-10;
    man.changeAnimation("Manidle",MIimage);
  }
  man.velocityY=man.velocityY+0.8
  //fighting animations for Man
  if(keyWentDown("I")){
    man.changeAnimation("Manattack",MAimage);
    }

//reverse
if(oldman.x>man.x){
  if(reverse===0){
  oldman.mirrorX(oldman.mirrorX() * -1);
  man.mirrorX(man.mirrorX() * -1);
  reverse=1;
  }
}
if(oldman.x<man.x){
  if(reverse===1){
  oldman.mirrorX(oldman.mirrorX() * -1);
  man.mirrorX(man.mirrorX() * -1);
  reverse=0;
  }
}

//scoring

   if(oldman.isTouching(man) && keyWentDown("W")){
    player2Score=player2Score-1;
    man.changeAnimation("Manhurt",MHimage);
  }
  if(man.isTouching(oldman) && keyWentDown("I")){
    player1Score=player1Score-1;
    oldman.changeAnimation("Oldmanhurt",OMHimage)
  }
  if(player1Score===0 || player2Score===0){
    gameState="End"
  }
  }
//game end

if(player2Score===0 && gameState==="End"){
  fill("white");
  rect(400,200,400,400)
  textSize(50);
  fill("grey");
  text("Player 1 wins", 450, 300);
 
  oldman.changeAnimation("Oldmanidle",OMIimage);
  man.changeImage("Mandeath",MDimage);
  gameOver.visible = true;
  restart.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}


if(player1Score===0 && gameState==="End"){
  fill("white");
  rect(300,200,500,400)
  textSize(50);
  fill("grey");
  text("Player 2 wins", 450, 300);

  man.changeAnimation("Manidle",MIimage);
  oldman.changeImage("Oldmandeath",OMDimage);
  gameOver.visible = true;
  restart.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}

oldman.collide(ground);
man.collide(ground);
  drawSprites();
console.log(frameRate);
   //display scores
   textSize(20);
   noStroke();
   fill("white")
   text("Player 1 Hearts "+player1Score,0,40);
   text("Player 2 Hearts "+player2Score,1020,40);
 
}

function reset(){
  gameState = "Play";
  gameOver.visible = false;
  restart.visible = false;
  
  oldman.changeAnimation("Oldmanidle",OMIimage);
  man.changeAnimation("Manidle",MIimage);
  oldman.x=30
  man.x=1170
  player1Score = 10;
  player2Score = 10;
  
}
