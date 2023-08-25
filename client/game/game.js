class Thing {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    isColliding(obj) {
        return areColliding(this.x, this.y, this.width, this. height, obj.x, obj.y, obj.width, obj.height);
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

    movableCollision(elem) {
        if(this != elem) {
            if(this.isColliding(elem)) {
                let overlap = this.getOverlapVector(elem);

                if (overlap.x) {
                    if (this.x > elem.x) this.x = elem.x + elem.width + 0.01;
                    else  this.x = elem.x - this.width - 0.01;
                } else {
                    if (this.y > elem.y) this.y = elem.y + elem.height + 0.01;
                    else  this.y = elem.y - this.height - 0.01;
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

    update(arrObjects) {
        arrObjects.forEach(elem => {
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

    update(arrObjects) {
        this.madeBoxCollision = false;
        arrObjects.forEach(elem => {
            if(this != elem) {
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

        ctx.fillRect(this.x, this.y, 10, 10)
    }

    isMoveOn() { // TO OVERWRITE
        return false;
    }

    update(arrObjects) {
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
            ctx.drawImage(this.img, this.x, this.y, this,width, this.height);
        } else {
            ctx.drawImage(this.img_alt, this.x, this.y, this,width, this.height);
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

    update(arrObjects) {
        this.updates++;
        
        if(updates % cooldown == 0)
            this.changeState();

        arrObjects.forEach((elem, index) => {
            if(this.isColliding(elem)) {
                if(this.state)  arrObjects.splice(index, 1);
            }
        });
        
    }
}



let levelObjects = [];

levelObjects[0] = [
    new Unmovable(200, 100, 70, 70, loadImage("./game/images/box.png")),
    new Unmovable(200, 240, 70, 70, loadImage("./game/images/box.png")),
    new Movable(300, 100, 70, 70, loadImage("./game/images/box.png")),
    new Movable(400, 100, 70, 70, loadImage("./game/images/box.png")),
    new Movable(300, 100, 70, 70, loadImage("./game/images/box.png")),
    new Player(100, 100, 70, 70, loadImage("./game/images/player.png"), 0, 2),
];

function update() {
    levelObjects[0].forEach(elem => elem.update(levelObjects[0]))
}


function draw() {
    levelObjects[0].forEach(elem => elem.draw());
}



