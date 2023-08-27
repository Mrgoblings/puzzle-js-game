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
        	this.addItem(200, 200, 20, 20, "./game/images/egg.png");
        	this.addItem(200, 200, 20, 20, "./game/images/egg.png");
        	this.addItem(200, 200, 20, 20, "./game/images/egg.png");
        	this.addItem(200, 200, 20, 20, "./game/images/egg.png");

                this.addFinishLine(600, 200, 70, 70, "./game/images/flag.png", 1);
                
                this.addPlayer(100, 100, 70, 70, "./game/images/player.png");

                break;

	    case 1:

		this.addUnmovable(200, -300, 100, 100, "./game/images/metal-box.png");
		this.addMovable(200, -200, 100, 100, "./game/images/box.png");
		this.addUnmovable(200, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 300, 100, 100, "./game/images/metal-box.png");
		this.addMovable(200, 400, 100, 100, "./game/images/box.png");
		this.addUnmovable(200, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 600, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 700, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 800, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 900, 100, 100, "./game/images/metal-box.png");

		this.addItem(400, 200, 60, 80, "./game/images/whipped-cream.png");

		this.addFinishLine(600, 500, 70, 70, "./game/images/flag.png", 2);

		this.addPlayer(-100, 200, 70, 70, "./game/images/player.png");

		break;

	    case 2:
		
		this.addUnmovable(-100, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(-100, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(-100, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(0, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(100, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(0, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(100, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, -200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(300, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(700, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, -300, 100, 100, "./game/images/metal-box.png");
		this.addMovable(600, -290, 100, 100, "./game/images/box.png");
		this.addUnmovable(400, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 400, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(300, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(700, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 400, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(700, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(700, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(900, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1300, -100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1300, -200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1300, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(900, -300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 400, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 400, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1200, 0, 100, 100, "./game/images/metal-box.png");

		this.addItem(710, 210, 80, 80, "./game/images/butter.png");

		this.addFinishLine(1110, 400, 70, 70, "./game/images/flag.png", 3);

		this.addPlayer(10, 10, 70, 70, "./game/images/player.png");

		break;

	    case 3:
		//up
		this.addUnmovable(0, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(100, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(200, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(300, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(400, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(500, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(600, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(700, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(800, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(900, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1000, 0, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 0, 100, 100, "./game/images/metal-box.png");

		//right
		this.addUnmovable(1100, 100, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 200, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 300, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 400, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 500, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 600, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 700, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 800, 100, 100, "./game/images/metal-box.png");
		this.addUnmovable(1100, 900, 100, 100, "./game/images/metal-box.png");

		this.addPlayer(0, 0, 70, 70, "./game/images/player.png");

	}
    }       
}

