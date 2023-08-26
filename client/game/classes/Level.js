class Level {
    #correctAnswers;
    constructor(levelNumber=0) {
        this.objects = [];
        this.items = 0;
        this.levelNumber = levelNumber;

        this.#correctAnswers = [];
        this.setup(this.levelNumber);
    }

    addUnmovable(x, y, width, height, img_src) {
        this.objects.push(new Unmovable(x, y, width, height, loadImage(img_src)));
    } 

    addMovable(x, y, width, height, img_src) {
        this.objects.push(new Movable(x, y, width, height, loadImage(img_src)));
    }
    
    addSpike(x, y, width, height, imgSrc_on, imgSrc_off, cooldown=300) {
        this.objects.push(new Spike(x, y, width, height, loadImage(imgSrc_on), loadImage(imgSrc_off), cooldown));
    }

    addItem(x, y, width, height, img_src) {
        this.objects.push(new Item(x, y, width, height, loadImage(img_src)));
        this.items++;
    }
    
    addFinishLine(x, y, width, height, img_src, destLevel){
        this.objects.push(new FinishLine(x, y, width, height, loadImage(img_src), destLevel));
    }
    
    addPlayer(x, y, width, height, img_src, direction=0, maxSpeed=2){
        this.objects.push(new Player(x, y, width, height, loadImage(img_src), direction, maxSpeed));
    }

    addCandle(x, y, width, height, imgSrc_on, imgSrc_off, correctAnswer=false) {
        this.objects.push(new Candle(x, y, width, height, loadImage(imgSrc_on), loadImage(imgSrc_off)));
        this.#correctAnswers.push(correctAnswer);
    }



    clear() {
        this.items = 0;
        this.objects = [];
        this.correctAnswers = [];
    }

    ableToFinish() {
        if(this.items != 0) return false;

        if(this.#correctAnswers.length > 0) {
            for (let i = 0, i_c = 0; i < this.objects.length; i++) {
                if (this.objects[i].type == "candle") {
                    if (this.objects[i].isLit() != this.#correctAnswers[i_c++])  return false;
                }
            }
        }

        return true;
    }

    update() {
        this.objects.forEach(elem => elem.update(this));
    }

    draw() {
        this.objects.forEach(elem => elem.draw());
    }

    reset() {
        this.clear();
        this.setup(this.levelNumber);
    }

    next(destLevel) {
        if(!this.ableToFinish()) return;

        console.log("next with level" +  destLevel); 
        console.log("n", destLevel === undefined); 
        
        if(destLevel !== undefined)  this.levelNumber = destLevel;
        else  this.levelNumber++;

        this.reset();
    }

    setup(levelNumber) {
        switch (levelNumber) {
            case 0:
                this.addUnmovable(200, 100, 70, 70, "./game/images/box.png");
                this.addUnmovable(200, 240, 70, 70, "./game/images/box.png");

                this.addMovable(300, 100, 70, 70, "./game/images/box.png");
                this.addMovable(400, 100, 70, 70, "./game/images/box.png");
                this.addMovable(300, 100, 70, 70, "./game/images/box.png");

                this.addItem(500, 190, 30, 30, "./game/images/egg.png");
                
                this.addSpike(400, 200, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 300);

                this.addCandle(600, 100, 70, 70, "./game/images/candle-green-on.png", "./game/images/candle-green-off.png", true);
                this.addCandle(700, 100, 70, 70, "./game/images/candle-red-on.png", "./game/images/candle-red-off.png", false);
                this.addCandle(800, 100, 70, 70, "./game/images/candle-pink-on.png", "./game/images/candle-pink-off.png", false);


                
                this.addFinishLine(600, 290, 70, 70, "./game/images/flag.png", 0);
                
                this.addPlayer(100, 100, 70, 70, "./game/images/player.png");

                break;
        }
    }       
}

