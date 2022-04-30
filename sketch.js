const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var bg
var rabbit
var melon

var blink
var sad
var eat


function preload(){
  bg = loadImage("background.png")
  melon = loadImage("melon.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png")

  eat.looping = false
  sad.looping = false
}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  imageMode (CENTER)
  ellipseMode(RADIUS);
  textSize(50)
  ground = Bodies.rectangle(250,690, 500,20, {isStatic:true})
  World.add(world,ground)
  rope = new Rope(5,{x:250,y:30})
  fruit = Bodies.circle(250,50,20)
  Composite.add(rope.body, fruit)
  fruit_con = new Link(rope, fruit)

  blink.frameDelay = 20
  eat.frameDelay = 20
  bunny = createSprite(50,600,10,10)
  bunny.addAnimation("blink", blink);
  bunny.addAnimation("sad",sad);
  bunny.addAnimation("eat",eat);
  bunny.changeAnimation("blink");
  bunny.scale = 0.2;
  //creating button
  button = createImg("cut_button.png")
  button.position(235,40)
  button.size(35,35)
  button.mouseClicked(drop)
}

function draw() 
{
  
  background(51);
  image(bg,width/2,height/2,500,700)
  Engine.update(engine);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y,500,20)
   rope.show()
   if(fruit!==null){
     ellipseMode(RADIUS)
     ellipse(fruit.position.x,fruit.position.y,20,20)
    //image (melon, fruit.position.x, fruit.position.y, 60,60)
   }
   if(collBm(fruit,bunny)==true){
     bunny.changeAnimation("eat")
   }
   if(collBm(fruit,ground)==true){
     bunny.changeAnimation("sad")
     console.log("prisha")
   }
   if(fruit!==null){
   var x = dist(fruit.position.x,fruit.position.y,ground.position.x,ground.position.y)
   console.log(x)
   }
   drawSprites()
}
function drop(){
  rope.break()
  fruit_con.linkBreaker()
  fruit_con = null
}

function collBm(body,sprite){
  if(body!==null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    
    if(d<=80){
      World.remove(world,fruit)
     fruit = null
     return true
    }
    else{
      return false
    }
  }
}


