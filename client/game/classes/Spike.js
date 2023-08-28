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
            if(elem.type == "spike") return;
            if(this.isColliding(elem)) {
                if(this.state) {
                    if(elem.type == "player") {
                        level.reset();
                    } else {
                        level.objects.splice(index, 1);
                    }

                }
            }
        });
    }
}

