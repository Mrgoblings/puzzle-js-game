class Player extends Entity {
    constructor(x, y, width, height, img, direction, maxVelocity) {
        super(x, y, width, height, img, direction, maxVelocity)

        this.type="player";
    }

    isMoveOn() {
        if(isKeyPressed[38] || isKeyPressed[87]) { //* UP
            
            if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT
                this.direction = (Math.PI / 4) * 7;
                return true;
            } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
                this.direction = (Math.PI / 4) * 5;
                return true;
            }
            
            this.direction = (Math.PI / 4) * 6;
            return true;

        } else if(isKeyPressed[40] || isKeyPressed[83]) { // DOWN
            
            if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT
                this.direction = (Math.PI / 4) * 1;
                return true;
            } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
                this.direction = (Math.PI / 4) * 3;
                return true;
            }
            
            this.direction = (Math.PI / 4) * 2;
            return true;

        } else if(isKeyPressed[39] || isKeyPressed[68]) { //* LEFT

            this.direction = (Math.PI / 4) * 0;
            return true;
        
        } else if(isKeyPressed[37] || isKeyPressed[65]) { //* RIGHT
        
            this.direction = (Math.PI / 4) * 4;
            return true;
        
        }
    
        return false;
    }
}

