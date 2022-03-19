let backgroundShade = 80
let shortening = 20

function setup() {
  createCanvas(windowWidth/20*19, windowHeight/20*19); //canvas
  push()
  angel = 90//sets angel
  background(backgroundShade)
  line(width/2, height, width/2, -height)
}

let running = true //stops program
function draw() {
  frameRate(2)
  if(angel < 0) angel *= -1
  angel = angel % 360
  if(!running) return
  background(backgroundShade)
  line(width/2, height, width/2, -height)
  addWeigth() //adds weight to system
  angelCalc(calcEffect()) //creates the next angel
  drawScene() //draws the current scene
}

function mousePoint(axes){//makes weight size base on mouse
  if(axes) return(Math.floor((mouseX-width/2)/shortening))//left - right
  return (Math.floor((height-mouseY)/shortening))//up - down
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
    return (Math.floor(this.length * this.weight * 9.82/*gravity*/* Math.sin (radians (localAngelCalc()))))
  }
  function localAngelCalc(){
    if (this.side) return angel
    return angel+180
  }
}

let momentum = 0
let tempAngel = 0
function angelCalc(effect){
  momentum = effect/1000 + momentum/1.03
  tempAngel = angel
  angel += Math.floor(momentum)
}

function drawScene(){
  push()
  translate(width/2, height/2)
  for (let i = tempAngel; i != angel || i-360 == angel; i++){
    console.log(i,angel)
    rotate(radians(90-i))
    stroke(255, 10, 10)
    line(0, 0, width/2, 0)
    stroke(10, 10, 255)
    line(-width/2, 0, 0, 0)
    drawWeights()
    i = i%360
  }
  if(angel == tempAngel){
    rotate(radians(90-angel))
    stroke(255, 10, 10)
    line(0, 0, width/2, 0)
    stroke(10, 10, 255)
    line(-width/2, 0, 0, 0)
    drawWeights()
  }
  pop()
}

function drawWeights() {
  for (let i = 0; i < right.length; i++){
    ellipse(right[i].length*shortening, 0, right[i].weight)
  }
  for (let i = 0; i < left.length; i++){
    ellipse(-left[i].length*shortening, 0, left[i].weight)
  }
}