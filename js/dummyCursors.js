const WIDTH = document.body.clientWidth;
const HEIGHT = document.documentElement.clientHeight;
const DOTSNUM = 5;

const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);



class Dot{
    constructor(x,y){
        this.x = x;
        this.y = y;
    };

    update(xpos,ypos, l){
        var xpos = Math.random()*2*l-l;
        var ypos = Math.sqrt(Math.pow(l,2)-Math.pow(xpos,2));
        if(Math.floor(Math.random()*10)%2==0){ 
            ypos = ypos*(-1);
        };
        this.x = this.x + xpos;
        this.y = this.y + ypos;
        console.log('xpos : ' + xpos + ' ypos : '+ypos);
    };

    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.arc( this.x, this.y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        ctx.fill();
    };
}

    //console.log("height : " + document.documentElement.clientHeight);
    //console.log("wigth  : " + document.body.clientWidth);

    // オブジェクトを管理する配列。
const objects = [];

for(var i = 0; i < DOTSNUM; i++){
    var xpos = Math.floor( Math.random() * (canvas.width+1) );
    var ypos = Math.floor( Math.random() * (canvas.height+1) );
    //console.log('xpos : '+xpos);
    //console.log('ypos : '+ypos);
    objects.push(new Dot(xpos,ypos));
};

var mX = 0;
var mY = 0;

window.onload=function(){
    document.body.addEventListener("mousemove", function(e){

        //座標を取得する
        var oldmX = mX;
        var oldmY = mY;

        mX = e.pageX;  //X座標
        mY = e.pageY;  //Y座標

        var l = Math.sqrt(Math.pow(mX-oldmX, 2)+Math.pow(mY-oldmY, 2));

        

        //console.log('l : '+ l + ' xpos : ' + xpos + ' ypos : '+ypos);

        objects.forEach((obj) => obj.update(xpos, ypos, l));
    });
}

function loop(timestamp) {
    // 前の描画を消す。
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 各オブジェクトを描画する。
    objects.forEach((obj) => obj.render(ctx));
    
    // requestAnimationFrameを呼び出す。
    window.requestAnimationFrame((ts) => loop(ts));
};

// アニメーションを開始する。
window.requestAnimationFrame((ts) => loop(ts));




