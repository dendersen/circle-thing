let backgroundShade = 80
let shortening = 20
let debug = false

function setup() {
  createCanvas(windowWidth/20*19, windowHeight/20*19); //canvas
  push()
  angel = 90//sets angel
  background(backgroundShade)
  line(width/2, height, width/2, -height)
  frameRate(30)
}

let running = true //stops program
function draw() {
  // frameRate(30)
  if(!running) return
  background(backgroundShade)
  line(width/2, height, width/2, -height)
  addWeigth() //adds weight to system
  angelCalc(calcEffect()) //creates the next angel
  if(angel < 0) angel += 360
  angel = angel % 360
  drawScene() //draws the current scene
}

function mousePoint(axes){//makes weight size base on mouse
  if(axes) return(Math.floor((mouseX-width/2)/shortening))//left - right
  return (Math.floor((height-mouseY)/(shortening*2)))//up - down
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
  tempAngel = Math.round(angel)
  angel += momentum
}

function drawScene(){
  let safety = 0
  if(safety > 400) return
  safety++
  translate(width/2, height/2)

  if (tempAngel == Math.round(angel)) draww(angel)
  let jji = 0
  while (tempAngel != Math.round(angel)){
    if (jji > 360) throw ("too many iterations" + "   ;angel goal:" + angel + "   ;start angel:" +  tempAngel + "   ;iterations:" + jji)
    draww(tempAngel)
    tempAngel = angelCheck(tempAngel, jji)
    tempAngel = tempAngel % 360
    if (tempAngel < 0 ) tempAngel = 360
    jji++
  }
  function draww(angels){
    push()
    // console.log(angels,angel)
    rotate(radians(90-angels))
    stroke(255, 10, 10)
    line(0, 0, width/2, 0)
    stroke(10, 10, 255)
    line(-width/2, 0, 0, 0)
    drawWeights()
    pop()
  }

  function angelCheck(temp, iteration){
    var safety = 0
    let temp1 = temp
    let temp2 = temp
    let floorAngel = Math.round(angel)
    while(true){
      if(safety > 180) {
        throw ("safety limit exeded" + "   ;angel goal:" + floorAngel + "   ;start angel:" +  temp + "   ;temp1:" +  temp1 + "   ;temp2:" + temp2)
      }
      if(floorAngel < 0) floorAngel *= -1
      if(temp1 == floorAngel && temp2 == floorAngel)
        if(momentum > 0) return(temp-1)
        else return (temp+1)
      safety++
      temp1++
      temp2--
      if(debug)console.log(";high = " + temp1,";low = " + temp2, ";angel = " + floorAngel, ";safety = " + safety,";iteration" + iteration)
      if(temp1 == 361) temp1 = 0
      if(temp2 == -1) temp2 = 360
      if(temp1 == -1) temp1 = 360
      if(temp1 == floorAngel) return (temp +1)
      if(temp2 == floorAngel) return (temp -1)
    }
  }
}

function drawWeights() {
  for (let i = 0; i < right.length; i++){
    ellipse(right[i].length*shortening, 0, right[i].weight)
  }
  for (let i = 0; i < left.length; i++){
    ellipse(-left[i].length*shortening, 0, left[i].weight)
  }
}