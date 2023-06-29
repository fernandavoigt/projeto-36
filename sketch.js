var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }


function setup() {
 //chamar db aqui
 database = firebase.database();  
   
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //bd
  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value", readHeight)
   
  textSize(20); 
}

// função para exibir a interface do usuário
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   //imagem e direção do movimento
   
   balloon.addAnimation("./Images/HotAirBalloon",balloonImage2);
   updateHeight (-10, 0)
  }
   
  else if(keyDown(RIGHT_ARROW)){
  //
    balloon.addAnimation("./Images/HotAirBalloon",balloonImage2);
    updateHeight (10, 0)
  }
   
  else if(keyDown(UP_ARROW)){
   //
    balloon.scale=balloon.scale -0.005;
    balloon.addAnimation("./Images/HotAirBalloon",balloonImage2);
    updateHeight (0,-10)
  }
   
  else if(keyDown(DOWN_ARROW)){

    balloon.addAnimation("./Images/HotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
    updateHeight (0, 10)
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);

}


//função updateHeight
function updateHeight(x,y){
database.ref('balloon/height').update({
'x': height.x + x,
'y': height.y + y

})
}

function readHeight(data){
 // adicionar propriedades dessa função
 height = data.val();
 balloon.x = height.x;
 balloon.y = height.y;

 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
