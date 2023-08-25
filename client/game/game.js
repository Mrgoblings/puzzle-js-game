class Thing {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    isColliding(obj) {
        return this != obj && areColliding(this.x, this.y, this.width, this. height, obj.x, obj.y, obj.width, obj.height);
    }

   getOverlapVector(obj) {
        const overlapX = Math.min(this.x + this.width - obj.x, obj.x + obj.width - this.x);
        const overlapY = Math.min(this.y + this.height - obj.y, obj.y + obj.height - this.y);
        
        if (overlapX < overlapY) {
            return { x: overlapX, y: 0 };
        } else {
            return { x: 0, y: overlapY };
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    unmovableCollision(elem) {
        if(this != elem) {
            if(this.isColliding(elem)) {
                let overlap = this.getOverlapVector(elem);
           
                if(overlap.x) {
                    if (this.x > elem.x) elem.x = this.x - elem.width - 0.01;
                    else  elem.x = this.x + this.width + 0.01;
                } else {
                    if (this.y > elem.y) elem.y = this.y - elem.height - 0.01;
                    else  elem.y = this.y + this.height + 0.01;
                }
            }
        }
    }

}


class Unmovable extends Thing {
    constructor(x, y, width, height, img) { 
        super(x, y, width, height, img)
        this.type="unmovable";
    }

    update(level) {
        level.objects.forEach(elem => {
            if(elem.type == "player")
                this.unmovableCollision(elem);
        });
    }
}


class Movable extends Thing {
    constructor(x, y, width, height, img) { 
        super(x, y, width, height, img)
        this.type="movable";
    }

    update(level) {
        this.madeBoxCollision = false;
        level.objects.forEach(elem => {
            if(this.isColliding(elem)) {
                let overlap = this.getOverlapVector(elem);
                
                if (this.madeBoxCollision) this.unmovableCollision(elem);
                else {
                    if (overlap.x) {
                        if (this.x > elem.x) {
                            this.x = elem.x + elem.width + 0.01;
                        } else this.x = elem.x - this.width - 0.01;

                    } else {
                        if (this.y > elem.y) {
                            this.y = elem.y + elem.height + 0.01;
                        } else this.y = elem.y - this.height - 0.01;
                    }

                    if(this.type != "player") {
                        this.madeBoxCollision = true;
                    }
                    
                }
            }
        });
    }
}


class Entity extends Thing{
    constructor(x, y, width, height, img, direction, maxVelocity) {
        super(x, y, width, height, img);
        this.direction = direction;
        this.velocity = 0;
        this.maxVelocity = maxVelocity;
        
        this.FRICTION = 0.07;
        this.ACCELERATION = 0.1;
        this.checkCollision
    
        this.type="entity";
    }

    draw() {
        ctx.save();
        
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.direction + Math.PI / 2);

        ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);

        ctx.restore();

        // ctx.fillRect(this.x, this.y, 10, 10)
    }

    isMoveOn() { // TO OVERWRITE
        return false;
    }

    update(level) {
        if(this.velocity - this.FRICTION > 0)  this.velocity -= this.FRICTION;
        else this.velocity = 0;

        if(this.isMoveOn() && this.velocity < this.maxVelocity)  this.velocity += this.ACCELERATION;
        
        // add up movement;
        this.x += Math.cos(this.direction) * this.velocity;
        this.y += Math.sin(this.direction) * this.velocity;
    }
}


class Player extends Entity {
    constructor(x, y, width, height, img, direction, maxVelocity) {
        super(x, y, width, height, img, direction, maxVelocity)

        this.type="player";
    }

    isMoveOn() {
        if(isKeyPressed[38] || isKeyPressed[87]) { //* UP
            
            if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT
                this.direction = (Math.PI / 4) * 7;
                return true;
            } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
                this.direction = (Math.PI / 4) * 5;
                return true;
            }
            
            this.direction = (Math.PI / 4) * 6;
            return true;

        } else if(isKeyPressed[40] || isKeyPressed[83]) { // DOWN
            
            if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT
                this.direction = (Math.PI / 4) * 1;
                return true;
            } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
                this.direction = (Math.PI / 4) * 3;
                return true;
            }
            
            this.direction = (Math.PI / 4) * 2;
            return true;

        } else if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT

            this.direction = (Math.PI / 4) * 0;
            return true;
        
        } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
        
            this.direction = (Math.PI / 4) * 4;
            return true;
        
        }
    
        return false;
    }
}


class ChangableState extends Thing {
    constructor(x, y, width, height, img, img_alt) {
        super(x, y, width, height, img);

        this.img_alt = img_alt;
        this.state = false;
        this.type = "changableState"
    }

    changeState() {
        this.state = !this.state;
    }

    draw() {
        if (this.state) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.img_alt, this.x, this.y, this.width, this.height);
        }
    }
}


class Spike extends ChangableState {
    constructor(x, y, width, height, img, img_alt, cooldown) {    
        super(x, y, width, height, img, img_alt);
        this.type = "spike";
        this.updates = 0;
        this.cooldown = cooldown;
    }

    update(level) {
        this.updates++;
        
        if(this.updates % this.cooldown == 0)
            this.changeState();

        level.objects.forEach((elem, index) => {
            if(this.isColliding(elem)) {
                if(this.state)  level.reset();
            }
        });
    }
}


class Item extends Thing {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img);
        this.type = "item";
    }

    update(level) {
        let player = level.objects[level.objects.length - 1];
        if(player.type == "player") {
            if(this.isColliding(player)) {
                let index = level.objects.indexOf(this);

                if(index != -1) {
                    level.objects.splice(index, 1);
                    level.items--;
                }
            }
        }
    }
}


class FinishLine extends Thing {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img);
        this.type = "finishLine";
    }

    update(level) {
        let player = level.objects[level.objects.length - 1];
        if(player.type == "player") {
            if(this.isColliding(player)) {
                console.log("yoooo");
                level.next();
            }
        }
    }
}


class Level {
    constructor(levelNumber=0) {
        this.objects = [];
        this.items = 0;
        this.levelNumber = levelNumber;

        this.setup(this.levelNumber);
    }

    addUnmovable(x, y, width, height, img_src) {
        this.objects.push(new Unmovable(x, y, width, height, loadImage(img_src)));
    } 

    addMovable(x, y, width, height, img_src) {
        this.objects.push(new Movable(x, y, width, height, loadImage(img_src)));
    }
    
    addSpike(x, y, width, height, imgSrc_on, imgSrc_off, cooldown=300) {
        this.objects.push(new Spike(x, y, width, height, loadImage(imgSrc_on), loadImage(imgSrc_off), cooldown));
    }

    addItem(x, y, width, height, img_src) {
        this.objects.push(new Item(x, y, width, height, loadImage(img_src)));
        this.items++;
    }
    
    addFinishLine(x, y, width, height, img_src){
        this.objects.push(new FinishLine(x, y, width, height, loadImage(img_src)));
    }
    
    addPlayer(x, y, width, height, img_src, direction=0, maxSpeed=2){
        this.objects.push(new Player(x, y, width, height, loadImage(img_src), direction, maxSpeed));
    }

    clear() {
        this.items = 0;
        this.objects = [];
    }

    ableToFinish() {
        return this.items == 0;
    }

    update() {
        this.objects.forEach(elem => elem.update(this));
    }

    draw() {
        this.objects.forEach(elem => elem.draw());
    }

    reset() {
        this.clear();
        this.setup(this.levelNumber);
    }

    next() {
        if(!this.ableToFinish()) return;

        this.levelNumber++;
        this.reset();
    }

    setup(levelNumber) {
        switch (levelNumber) {
            case 0:
                this.addUnmovable(200, 100, 70, 70, "./game/images/box.png");
                this.addUnmovable(200, 240, 70, 70, "./game/images/box.png");

                this.addMovable(300, 100, 70, 70, "./game/images/box.png");
                this.addMovable(400, 100, 70, 70, "./game/images/box.png");
                this.addMovable(300, 100, 70, 70, "./game/images/box.png");

                this.addItem(500, 190, 30, 30, "./game/images/egg.png");
                
                this.addSpike(400, 200, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 300);
                
                this.addFinishLine(600, 290, 70, 70, "./game/images/flag.png");
                
                this.addPlayer(100, 100, 70, 70, "./game/images/player.png");

                break;
        }
    }       
}




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


