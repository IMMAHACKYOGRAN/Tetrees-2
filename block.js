class Block {
    constructor() {
        this.blocks = [shape.I, shape.O, shape.L, shape.Z, shape.T, shape.J, shape.S];
        this.currentBlock;
        this.pos = Vec2(4, 0);
        this.heldBlock;
        this.canHoldBlock = true;
        this.heldBlockDrawOffsets = [];
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

    draw(block, offsetx, offsety) {
        block.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = shape.colours[value - 1];
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
            this.pos.y = 0;
            this.pos.x = 4;
            this.canHoldBlock = true;
        }
        dropCounter = 0;
    }

    playerRotate (dir) {
        const pos = this.pos.x;
        let offset = 1;
        this.rotateShape(this.currentBlock.shape, dir)
        while (this.collide(arena.arenaState, block)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.currentBlock.shape[0].length) {
                this.rotateShape(this.currentBlock.shape, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    rotateShape (shape, dir) {
        for (let y = 0; y < shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    shape[x][y],
                    shape[y][x],
                ] = [
                    shape[y][x],
                    shape[x][y],
                ];
            }
        }
      
        if (dir < 0) {
            shape.forEach(row => row.reverse());
        } else {
            shape.reverse();
        }
    }



    move(dir) {
        this.pos.x += dir;
        if(this.collide(arena.arenaState, block)){
            this.pos.x -= dir
        }
    }

    drawShadow() {
        let pos = Vec2(this.pos.x, this.pos.y);
        while (!this.collide(arena.arenaState, block)) {
            this.pos.y++;
        }
        this.pos.y--;
        this.currentBlock.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.strokeStyle = "#000";
                    ctx.beginPath();
                    ctx.rect(x * 20 + this.pos.x * 20, y * 20 + this.pos.y * 20, 20, 20);
                    ctx.stroke();
                }
            });
        });
        this.pos = pos;
    }

    holdBlock() {
        if(this.canHoldBlock) {
            //Gets default shape.
            
            for(let x = 0; x < 10; x++) {
                for(let y = 0; y < 10; y++) {
                    // let v = this.currentBlock[y][x];
                    // heldshape = shape.getDefaultShape(v);
                    console.log(this.currentBlock[y]);
                }
            }

            if (this.heldBlock) {
                let buffer;
                buffer = this.currentBlock;
                this.currentBlock = this.heldBlock;
                this.heldBlock = buffer;
            } else {
                this.heldBlock = this.currentBlock;
                this.generateBlock();
                this.pos.y = 0;
                this.pos.x = 4;
            }
            console.log(this.heldBlock);
            this.canHoldBlock = false;
        }
    }

    drawHeldBlock() {
        if(this.heldBlock) {
            this.heldBlock.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        ctx.fillStyle = shape.colours[value - 1];
                        ctx.fillRect(x * 20 + 12 * 20, y * 20 + 12 * 20, 20, 20);
                        ctx.strokeStyle = "#000";
                        ctx.beginPath();
                        ctx.rect(x * 20 + 12 * 20, y * 20 + 12 * 20, 20, 20);
                        ctx.stroke();
                    }
                });
            });
        }
    }
}

const block = new Block();