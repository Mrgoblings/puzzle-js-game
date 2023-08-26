class Candle extends ChangeOnCollision {
    constructor(x, y, width, height, img, img_alt, islit=false) {
        super(x, y, width, height, img, img_alt);
        this.type = "candle";
        this.state = islit;
    }

    isLit() {
        return this.state;
    }
}

