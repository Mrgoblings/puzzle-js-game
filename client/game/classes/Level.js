class Level {
    #correctAnswers;
    constructor(levelNumber=0) {
        this.objects = [];
        this.items = 0;
        this.levelNumber = levelNumber;

        this.#correctAnswers = [];

        this.song = loadAudio("./game/audio/song.mp3");

        this.setup(this.levelNumber);
    }

    addThing(x, y, width, height, img_src) {
        this.objects.push(new Thing(x, y, width, height, loadImage(img_src)));
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

        
        if(destLevel !== undefined)  this.levelNumber = destLevel;
        else  this.levelNumber++;

        localStorage.setItem("level", this.levelNumber);

        this.reset();
    }

    setup(levelNumber) {
        switch (levelNumber) {
        case 0:                
            this.addItem(400, 174, 20, 20, "./game/images/egg.png");
            this.addItem(150, 260, 20, 20, "./game/images/egg.png");
            this.addItem(210, -100, 20, 20, "./game/images/egg.png");
            this.addItem(500, 400, 20, 20, "./game/images/egg.png");

            this.addFinishLine(600, 200, 70, 70, "./game/images/flag.png");
            
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

            this.addFinishLine(600, 500, 70, 70, "./game/images/flag.png");

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

            this.addFinishLine(1110, 400, 70, 70, "./game/images/flag.png");

            this.addPlayer(10, 10, 70, 70, "./game/images/player.png");

		break;

	    case 3:
		    //up
            for (let i = 0; i < 12; i++)
		        this.addUnmovable(100 * i, 0, 100, 100, "./game/images/metal-box.png");
			
            // right
            for (let i = 1; i < 10; i++)
        		this.addUnmovable(1100, 100 * i, 100, 100, "./game/images/metal-box.png");
        
            // down
            for (let i = 0; i < 11; i++)
                this.addUnmovable(100 * i, 900, 100, 100, "./game/images/metal-box.png");

            // left
            for (let i = 1; i < 9; i++)
                this.addUnmovable(0, 100 * i, 100, 100, "./game/images/metal-box.png");

            // SPIKES-------------
            for (let i = 0; i < 8; i++)
                this.addSpike(320, 320 + i * 70, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 300);
 
            for (let i = 1; i < 11; i++)
                this.addSpike(320 + i * 70, 320, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 300);


            for (let i = 0; i < 5; i++)
                this.addSpike(530, 530 + i * 70, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 200);

            for (let i = 1; i < 8; i++)
                this.addSpike(530 + i * 70, 530, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 200);


            for (let i = 0; i < 2; i++)
                for (let j = 0; j < 5; j++) { 
                    if(i == 1 && j == 3 || i == 1 && j == 1) this.addItem(741 + j * 70, 741 + i * 70, 68, 68, "./game/images/sugar.png")
                    else this.addSpike(740 + j * 70, 740 + i * 70, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 300);
                }
            

            this.addFinishLine(110, 300, 70, 70, "./game/images/flag.png");

		    this.addPlayer(110, 110, 70, 70, "./game/images/player.png");
            
        break;


        case 4:
		
            this.addUnmovable(-100, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(-100, 0, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(-100, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(0, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(100, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(0, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, 0, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(300, 400, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(300, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(500, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(600, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(700, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(500, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(700, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(0, -200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(0, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(100, -300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, 200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, 300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(200, 400, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 400, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(500, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(400, 0, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(600, 300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(600, 200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(700, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, 100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, 200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, 300, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, 400, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(800, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(700, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(600, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(500, 500, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(700, -200, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(900, -100, 100, 100, "./game/images/metal-box.png");
            this.addUnmovable(900, 500, 100, 100, "./game/images/metal-box.png");
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

            this.addMovable(600.1, -100, 99.5, 100, "./game/images/box.png");

            this.addSpike(610, 110, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 100);
            this.addSpike(710, 310, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 250);
            this.addSpike(310, -90, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 200);
            this.addSpike(810, -90, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 200);
            this.addSpike(910, 310, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 400);
            this.addSpike(910, 210, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 400);
            this.addSpike(910, 110, 70, 70, "./game/images/spike-on.png", "./game/images/spike-off.png", 400);

            this.addItem(710, 210, 60, 60, "./game/images/cocoa.png");
            this.addItem(1210, -190, 60, 60, "./game/images/cocoa.png");
            this.addItem(310, 310, 60, 60, "./game/images/cocoa.png");
            this.addItem(910, 410, 60, 60, "./game/images/cocoa.png");
            this.addItem(110, -190, 60, 60, "./game/images/cocoa.png");
            this.addItem(309, 10, 60, 60, "./game/images/cocoa.png");

            this.addFinishLine(1110, 400, 70, 70, "./game/images/flag.png");

            this.addPlayer(10, 10, 70, 70, "./game/images/player.png");

		break;

        case 5:
            this.song.play();
            this.addThing(35, 60, 500, 400, "./game/images/cake.png");
            
            this.addCandle(100, 100, 40, 100, "./game/images/candle-blue-on.png", "./game/images/candle-blue-off.png", true);
            this.addCandle(170, 100, 40, 100, "./game/images/candle-green-on.png", "./game/images/candle-green-off.png", true);
            this.addCandle(240, 100, 40, 100, "./game/images/candle-orange-on.png", "./game/images/candle-orange-off.png", false);
            this.addCandle(310, 100, 40, 100, "./game/images/candle-pink-on.png", "./game/images/candle-pink-off.png", false);
            this.addCandle(380, 100, 40, 100, "./game/images/candle-red-on.png", "./game/images/candle-red-off.png", true);
            this.addCandle(450, 100, 40, 100, "./game/images/candle-yellow-on.png", "./game/images/candle-yellow-off.png", false);
        
            this.addFinishLine(1110, 100, 70, 70, "./game/images/flag.png");

            this.addPlayer(10, 10, 70, 70, "./game/images/player.png");
            
        break;
        
        default: 
            if(!this.song.paused) this.song.pause();

            this.addFinishLine(0, -200, 70, 70, "./game/images/portal-1.png", 0);
            this.addFinishLine(200, -200, 70, 70, "./game/images/portal-2.png", 1);
            this.addFinishLine(400, -200, 70, 70, "./game/images/portal-3.png", 2);
            this.addFinishLine(0, 200, 70, 70, "./game/images/portal-4.png", 3);
            this.addFinishLine(200, 200, 70, 70, "./game/images/portal-5.png", 4);
            this.addFinishLine(400, 200, 70, 70, "./game/images/portal-6.png", 5);
		    
            this.addPlayer(10, 10, 70, 70, "./game/images/player.png");

        break;
	    }
    }       
}

