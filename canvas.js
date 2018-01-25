//declare variable and assign it to the canvas element
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//declare variable to manipulate the canvas
var c = canvas.getContext('2d'); 


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.lineWidth = 10;
        c.strokeStyle = "#000";
        c.stroke();
        c.fillStyle = 'green';
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        };

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}



var circleArr = [];
for (var i = 0; i < 25; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() * -0.5) * 5;
    var dy = (Math.random() * -0.5) * 5;


    circleArr.push(new Circle(x, y, dx, dy, radius));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var j = 0; j < circleArr.length; j++) {
        circleArr[j].update();
    }
};

animate();


