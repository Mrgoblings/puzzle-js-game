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

    update(){};

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
