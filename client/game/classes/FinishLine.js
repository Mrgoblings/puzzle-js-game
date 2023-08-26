class FinishLine extends Thing {
    constructor(x, y, width, height, img, destLevel=undefined) {
        super(x, y, width, height, img);
        this.type = "finishLine";
        this.destLevel = destLevel;
    }

    update(level) {
        let player = level.objects[level.objects.length - 1];
        if(player.type == "player") {
            if(this.isColliding(player)) {
                level.next(this.destLevel);
            }
        }
    }
}

