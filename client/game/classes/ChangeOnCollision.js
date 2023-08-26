class ChangeOnCollision extends ChangableState {
    constructor(x, y, width, height, img, img_alt) {
        super(x, y, width, height, img, img_alt);
        this.type = "changableState";
        this.alreadyCollided = false;
    }

    update(level) {
        let player = level.objects[level.objects.length - 1];
        if(this.isColliding(player)) {
            if(!this.alreadyCollided) {
                this.changeState();
                this.alreadyCollided = true;
            }
        } else {
            this.alreadyCollided = false;
        }
    }
}
