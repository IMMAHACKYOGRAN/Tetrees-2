class Block {
    constructor() {
        this.blocks = [shape.I, shape.O, shape.L, shape.Z, shape.T, shape.J, shape.S];
        this.currentBlock;
        this.pos = Vec2(4, -2);
    }

    bagHandler() {
        if(this.blocks.length == 0) {
            this.blocks = [shape.I, shape.O, shape.L, shape.Z, shape.T, shape.J, shape.S];
        }
    }

    generateBlock() {
        var rand = Math.floor(Math.random() * this.blocks.length);
        this.bagHandler();
        this.currentBlock = this.blocks[rand];
        this.blocks.splice(rand, 1);
    }

    draw(shape, offsetx, offsety) {
        shape.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = shape.colour;
                    ctx.fillRect(x * 20 + offsetx * 20, y * 20 + offsety * 20, 20, 20);
                }
            });
        });
    }

    fall() {
        this.pos.y++;
    }

    move(dir) {
        this.pos.x += dir;
    }
    
    addShapeToMatrix(shape) {
        for (let block of shape.blocks) {
            let newPosition = p5.Vector.add(block.currentGridPos, shape.currentPos);
            this.matrix[newPosition.x][newPosition.y] = block.clone();
        }
    }
}

const block = new Block();