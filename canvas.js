//declare variable and assign it to the canvas element
var canvas = document.querySelector('canvas');

//declare variable to manipulate the canvas
var c = canvas.getContext('2d'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 40;

//Color array for circle colors
var colorArr = [
  '#FFEC60',
  '#80FF72',
  '#7EE8FA',
  '#FFC9F9',
  '#E58C8A'
]

//Add event listeners for mouse move and browser resize
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 2;
  
  init();
});

//Declare Circle object 
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)]
  
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.lineWidth = 5;
    c.strokeStyle = "#000";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }
  
  //create update key to store function that controls circle logic
  //This function contains conditionals that will prevent circles from exiting the browser window.
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    };
  
  if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    };
  
      this.x += this.dx;
      this.y += this.dy;
    
    
    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius){
      this.radius -= 1;
    }

    
    
    this.draw();
  }
}

//Create array to hold circle objects
var circleArr = [];


//Create function to initialize circles, randomizing their locations and 
//velocities and pushing them to the circle array
function init(){
    circleArr = [];
    for (var i = 0; i < 1000; i++){
      var radius = Math.random() * 2 + 1;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() * -0.5) * 5;
      var dy = (Math.random() * -0.5) * 5;
   
      circleArr.push(new Circle(x, y, dx, dy, radius));
      
};



};

//Create function to animate circles and call the update function in the Circle object
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  
  for (var j = 0; j < circleArr.length; j++) {
    circleArr[j].update();
  }
};

//Call functions to initialize circles and animate them
init();
animate();



