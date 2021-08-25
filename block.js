class Block {
    constructor() {
        this.blocks = [shape.I, shape.O, shape.L, shape.Z, shape.T, shape.J, shape.S];
        this.currentBlock;
        this.pos = Vec2(4, 5);
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
                    ctx.strokeStyle = "#000";
                    ctx.beginPath();
                    ctx.rect(x * 20 + offsetx * 20, y * 20 + offsety * 20, 20, 20);
                    ctx.stroke();
                }
            });
        });
    }

    collide(a, b) {
        const [m, o] = [b.currentBlock.shape, b.pos];
        for(let y = 0; y < m.length; y++) {
            for(let x = 0; x < m[y].length; x++) {
                if(m[y][x] !== 0 && (a[y + o.y] && a[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    fall() {
        this.pos.y++;
        if(this.collide(arena.arenaState, block)) {
            this.pos.y--;
            arena.merge(arena, block);
            this.generateBlock();
            this.pos.y = 5;
        }
        dropCounter = 0;
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