var PLAY=1;
var END =0;

var gameState = "start";

var fruits;
var chocolates;
var vegetables;
var backgroundSprite;

var boy, gameOver, restart, gameOverImg,restartImg;

var invisibleGround;


var FruitsGroup ;
var GermsGroup ;

var lives = 3;
var highScore = 0

var boyAni,germImg1,germImg2,germImg3,germImg4, backgroundImg,groundImg,fruitImg1, fruitImg2, fruitImg3,fruitImg4, fruitImg5,fruitImg6, fruitImg7, boyCollided;

var startButton, startImg;

//score
var count = 0;


function preload(){

        backgroundImg = loadImage("images/backgroundImg.png");
        germImg1 = loadImage("images/germ1.png");
        germImg2 = loadImage("images/germ2.png");
        germImg3 = loadImage("images/germ3.png");
        germImg4 = loadImage("images/germ4.png");
        boyAni = loadAnimation("images/boy0.png","images/boy1.png","images/boy2.png","images/boy3.png");
        boyCollided = loadImage('images/boy0.png');
        groundImg = loadImage("images/ground.png");
        startImg = loadImage("images/startImg.png");
        startButtonImg = loadImage('images/START.PNG');
        fruitImg1 = loadImage('images/fruit1.png');
        fruitImg2 = loadImage('images/fruit2.png');
        fruitImg3 = loadImage('images/fruit3.png');
        fruitImg4 = loadImage('images/fruit4.png');
        fruitImg5 = loadImage('images/fruit5.png');
        fruitImg6 = loadImage('images/fruit6.png');
        fruitImg7 = loadImage('images/fruit7.png');
        gameOverImg = loadImage('images/gameOver.png');
        restartImg = loadImage('images/reset.png');

}



function setup(){
 
        createCanvas(400,400);


        backgroundSprite = createSprite(200,200,400,20);  
        backgroundSprite.addImage(backgroundImg);
        backgroundSprite.velocityX = -3;

        boy = createSprite(50, 320,20,20);
        boy.addAnimation("running", boyAni);
        boy.addImage("collided", boyCollided);
        
        invisibleGround = createSprite(200,385,400,5);


      
        boy.debug= true
        boy.setCollider("rectangle",0,0,40,200);
        boy.scale=0.5;

        


        invisibleGround.visible = false;

        FruitsGroup = new Group()
        GermsGroup = new Group()

        gameOver = createSprite(200,250);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.5; 
        
        restart = createSprite(200,340);
        restart.addImage(restartImg);
        restart.scale = 0.5;




        gameOver.visible = false;
        restart.visible = false;

        startButton = createSprite(250,300,80,20);
        startButton.addImage(startButtonImg);
        startButton.visible = false;

}



function draw(){


        if (gameState == 'start'){
                start()
                if(mousePressedOver(startButton)){
                  gameState = PLAY
                }
        }
        else{
                background('white');
                boy.collide(invisibleGround);
              
                if(gameState == PLAY){    
                  play();
                }
                
                if(lives == 0){
                  gameState = END;
                  
                  gameOver.visible = true;
                  restart.visible = true;
                  end();
                }
                
                fill("yellow");
                console.log(gameState);
                
                
                
                if (count>0 && count%100 === 0){
                  //playSound("checkPoint.mp3");
                }
        }


        drawSprites();
        //set text
        textSize(18);
        textFont("Georgia");
        textStyle(BOLD);
        
        text("\t\t Immunity Score: "+ count, 10, 200);
        text("\t\t Highscore: "+ highScore, 220, 80);

        fill("red")
        textSize(18);
        textFont("Georgia");
        textStyle(BOLD);
        text("Lives: "+lives,300,50 )
      
  
}


  
function play(){

        boy.visible= true;
        backgroundSprite.visible = true;
        startButton.visible = false;
        Fruits();
        Germs();
        //move the ground

        backgroundSprite.velocityX = -(6 + 3*count/100);
        //scoring
        for(var i=0;i<GermsGroup.length; i++){

              if(GermsGroup.get(i).isTouching(boy)){

                    GermsGroup.get(i).destroy();
                    lives -=1;
                    count = count-10;
              }   
        }

        for(var i=0;i<FruitsGroup.length; i++){
          
              if(FruitsGroup.get(i).isTouching(boy)){

                    FruitsGroup.get(i).destroy();
                    count = count+10;
              }

        }

        if (backgroundSprite.x < 0){
              
              backgroundSprite.x = backgroundSprite.width/2;
        }

        //jump when the space key is pressed
        if(keyDown("space") && boy.y >= 325){

              boy.velocityY = -15 ;
        // playSound("jump.mp3");
        }

        //add gravity
        boy.velocityY = boy.velocityY + 0.8;
        if(backgroundSprite.x<0){

              backgroundSprite.x = 200; 

        }
          
}



function start(){

        background(startImg);
        startButton.visible = true;
        boy.visible= false;
        backgroundSprite.visible = false;

}



function end(){
    
        backgroundSprite.velocityX = 0;
        //background('blue');
        GermsGroup.setVelocityXEach(0);
        FruitsGroup.setVelocityXEach(0);
        GermsGroup.setLifetimeEach(-1);
        FruitsGroup.setLifetimeEach(-1);
        boy.changeAnimation("collided", boyCollided)
        
        if (mousePressedOver(restart)){
              
              reset()

        }
        if(count > highScore){
              
              highScore = count;

        }
        else{
              
              highScore= highScore;
        }


}



function reset(){

        gameState="start";
        gameOver.visible=false;
        restart.visible=false;
        GermsGroup.destroyEach();
        FruitsGroup.destroyEach();
        count=0;
        lives = 3;
        boy.changeAnimation("running", boyAni);

}




function Fruits(){
  
        if (World.frameCount % 60 === 0) {
              console.log("fruit frameCount")
              var fruit = createSprite(400,320,40,10);
              fruit.y = Math.round(random(280,320))
              fruit.scale=0.08;
              fruit.velocityX=-2;
              fruit.lifetime = 200;

              var rand = Math.round(random(1,7))

              console.log("RAnd: "+rand)

              switch(rand) {

                    case 1: fruit.addImage(fruitImg1);
                            console.log("img1")
                            break;
                    case 2: fruit.addImage(fruitImg2);
                            console.log("img2")
                            break;
                    case 3: fruit.addImage(fruitImg3);
                            console.log("img3")
                            break;
                    case 4: fruit.addImage(fruitImg4);
                            console.log("img4")
                            break;
                    case 5: fruit.addImage(fruitImg5);
                            console.log("img5")
                            break;
                    case 6: fruit.addImage(fruitImg6);
                            console.log("img6")
                            break;
                    case 7: fruit.addImage(fruitImg7);
                            console.log("img7")
                            break;
                            
                    default: break;

              }

              FruitsGroup.add(fruit);
        }
}



function Germs(){

        if (World.frameCount % 150 === 0) {
              console.log("germ frameCount");

              var germs = createSprite(400,320,40,10);
              germs.y = Math.round(random(280,320));
              germs.scale=0.1;
              germs.velocityX=-4;
              germs.lifetime = 200;
              var rand = Math.round(random(1,4));

              console.log("RAnd: "+rand);

              switch(rand) {
                    case 1: germs.addImage(germImg1);
                            console.log("img1")
                            break;
                    case 2: germs.addImage(germImg2);
                            console.log("img2")
                            break;
                    case 3: germs.addImage(germImg3);
                            console.log("img3")
                            break;
                    case 4: germs.addImage(germImg4);
                            console.log("img4")
                            break;
                    default: break;
              }
              //germs.setAnimation('germ' + rand);
              germs.lifetime = 250
              GermsGroup.add(germs);


        }
}
