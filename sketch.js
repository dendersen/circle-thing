function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(windowWidth/2, windowHeight/2)
  angel = radians(90)
}


let running = true
function draw() {
  if(!running) return
  addWeigth()
  angel = makeAngel()
  drawScene()
}

function addWeigth(){
  
  
}

function drawScene(){}

const right = []
const left = []
const weights = [left,right]
let angel

function makeAngel(){
  for (let i = 0; weights[1].length; i++){
    let weight = weights[1][i]
    let rightEffect = weight.math()
  }
  for(let i = 0; weights[0].length; i++){
    let weight = weights[0][i]
    let rightEffect = weight.math()
  }
}

function weightMath(weight,length){
  this.weight = weight
  this.length = length
  function math(){
    let effect = this.length * this.weight*9.82*Math.sin(radians(angel))
    return(effect)
  }
}