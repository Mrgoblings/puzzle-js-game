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

