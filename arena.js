class Arena {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        const arenaState = [];
        while (height--) {
            arenaState.push(new Array(width).fill(0));
        }
        this.arenaState = arenaState;
    }

    merge(a, b) {
        b.currentBlock.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0) {
                    a.arenaState[y + b.pos.y][x + b.pos.x] = value;
                }
            })
        });
        checkForDead()
    }

    drawArena() {
        this.arenaState.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = shape.colours[value - 1];
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                    ctx.strokeStyle = "#000";
                    ctx.beginPath();
                    ctx.rect(x * 20, y * 20, 20, 20);
                    ctx.stroke();
                }
            });
        });
    }

    clearArena() {
        let newArenaState = [];
        for(let i = 0; i < this.height; i++) {
            newArenaState.push(new Array(10).fill(0));
        }
        this.arenaState = newArenaState;
    }
}