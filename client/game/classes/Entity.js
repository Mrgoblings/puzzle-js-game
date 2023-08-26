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

