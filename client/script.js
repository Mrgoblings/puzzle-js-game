// -------------- necessary functions -----------------
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.Height = innerHeight;
})


//* mouse movement
var mouseX = 0, mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

}, false);


//* mouse click events
var mouseUp;
var mouseDown;
var mouseContextMenu;

window.addEventListener('mouseup', e => {
  if (mouseUp) mouseUp();
});

window.addEventListener('mousedown', e => {
  if(mouseDown) mouseDown();
});
window.addEventListener('contextmenu', e => {
  e.preventDefault();
 if (mouseContextMenu) mouseContextMenu();
});



//* key click events
var isKeyPressed = Array(222).fill(false); //* all the possible key codes

var keyUp;
var keyDown;

window.addEventListener('keyup', e => {
  if(keyUp) keyUp(e.keyCode);
  isKeyPressed[e.keyCode] = false;
});

window.addEventListener('keydown', e => {
  isKeyPressed[e.keyCode] = true;
  if (keyDown) keyDown(e.keyCode);
});


// functions draw and update
var draw, update;

// Redraw will be executed many times

const reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || ((cb) => {
  setTimeout(cb, 1000 / 30);
});


function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  ctx.font = "10px Arial";
  ctx.fillStyle = "blue";
  ctx.textBaseline = "top";
 
  if(draw)  draw();                
  
  reqAnimationFrame(redraw);
};


redraw();

setInterval( () => { if(update) update() }, 10);



// ------------ custum functions -------------------

function loadImage(src) {
    let image = new Image();
    image.src = src;
    (async () => {
        await image.decode();
    })();
    
    return image;
}


function areColliding(obj1_X, obj1_Y, obj1_Width, obj1_Height, obj2_X, obj2_Y, obj2_Width, obj2_Height) {
    return (obj2_X <= obj1_X + obj1_Width) && (obj1_X <= obj2_X + obj2_Width) && (obj2_Y <= obj1_Y + obj1_Height) && (obj1_Y <= obj2_Y + obj2_Height); 
}
