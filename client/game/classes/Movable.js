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


