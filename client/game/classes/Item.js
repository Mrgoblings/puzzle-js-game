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

