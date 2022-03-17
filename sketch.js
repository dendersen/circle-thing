function setup() {
  createCanvas(windowWidth/20*19, windowHeight/20*19); //canvas
  translate(width/2, height/2)//unused
  angel = 90//sets angel
  background(80)
  line(0, -height/2, 0, height/2)
}


let running = true //stops program
function draw() {
  if(!running) return
  addWeigth() //adds weight to system
  angelCalc(calcEffect()) //creates the next angel
  // drawScene() //draws the current scene
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

function angelCalc(effect){

}