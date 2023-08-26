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

