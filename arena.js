class Arena {
    constructor(width, height) {
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
    }
}

arena = new Arena(10, 20);