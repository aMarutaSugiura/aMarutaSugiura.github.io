function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var xpos, ypos;


ctx.fillRect(10, 10, 50, 50);

for (let i = 0; i < 1000; i++){
    xpos = 2*getRandomInt(1, 100);
    ypos = getRandomInt(1, 100);
    //alert(point);
    //ctx.fillStyle = 'blue';
    ctx.fillRect(xpos-0.5, ypos-0.5, 1, 1);
}

