document.title = "Make the Cake"
let level = new Level(0);

console.table(level);

function update() {
    level.update()
}


function draw() {
    let player = level.objects[level.objects.length - 1];
    ctx.translate((canvas.width - player.width)/2 - player.x, (canvas.height - player.height)/2 - player.y);

    level.draw();
    ctx.translate(-((canvas.width - player.width)/2 - player.x), -((canvas.height - player.height)/2 - player.y));
}


function mouseUp() {
    console.log(mouseX, mouseY);
} 


