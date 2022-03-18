let backgroundShade = 80

function setup() {
  createCanvas(windowWidth/20*19, windowHeight/20*19); //canvas
  push()
  angel = 90//sets angel
  background(backgroundShade)
  line(width/2, height, width/2, -height)
}

let running = true //stops program
function draw() {
  angel = angel % 360
  if(!running) return
  background(backgroundShade)
  line(width/2, height, width/2, -height)
  addWeigth() //adds weight to system
  angelCalc(calcEffect()) //creates the next angel
  drawScene() //draws the current scene
}

function mousePoint(axes){//makes weight size base on mouse
  if(axes) return(Math.floor((mouseX-width/2)/20))//left - right
  return (Math.floor(mouseY/20))//up - down
}

function addWeigth(){
  if(mouseButton == "center") {
    if(mousePoint(true)>0) {
      right[right.length] = new WeightMath(mousePoint(true),mousePoint(false), true) //creates a weigth on right side 
    }
    else {
      left[left.length] = new WeightMath(mousePoint(true),mousePoint(false), false) //creates a weigth on left side
    }
    mouseButton = 0 // resets mouse
  }
}

const right = []
const left = []
let angel

function calcEffect(){
  
  let leftEffect = 0
  let rightEffect = 0
  
  for (let i = 0; i < right.length; i++){
    rightEffect += right[i].math() //adds effect on right
  }
  for(let i = 0; i < left.length; i++){
    leftEffect += left[i].math() // adds effect on left
  }
  return(rightEffect-leftEffect) //logs total effect
}

function WeightMath (length, weight, side) { //stores individual weights
    this.length = length
    this.side = side
    this.weight = weight
    if (!this.side) this.length = -length

  this.math = function () {
    return (Math.floor(this.length * this.weight * 9.82/*gravity*/* Math.sin (radians (angelCalc()))))
  }
  function angelCalc(){
    if (this.side) return angel
    return angel+180
  }
}

let momentum = 0

function angelCalc(effect){
  momentum = effect/300 + momentum
  if(angel > 180) angel += momentum
  else angel -= momentum
}

function drawScene(){
  push()
  translate(width/2, height/2)
  rotate(radians(90-angel))
  stroke(255, 10, 10)
  line(0, 0, width/2, 0)
  stroke(10, 10, 255)
  line(-width/2, 0, 0, 0)
  pop()
}