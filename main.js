const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;
const width = canvas.width, height = canvas.height;

const cellSize = 20;
let dir;

let keys = {
    left: false,
    right: false,
    up: false,
    down: false
}

let dropCounter = 0;
let lastTime = 0;
let deltaTime = 0;
function update (time = 0) {
    deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > 1000) {
        block.fall();
    }

    inputHandler();
    drawBG();
    drawGrid();
    block.draw(block.currentBlock, block.pos.x, block.pos.y);
    requestAnimationFrame(update);
}

function drawBG() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
}

function drawGrid() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            ctx.strokeStyle = "#888";
            ctx.beginPath();
            ctx.rect(i * cellSize, j * cellSize, cellSize, cellSize);
            ctx.stroke();
        }
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        keys.right = true;
    } else if (e.key === 'ArrowLeft') {
        keys.left = true;
    } else if (e.key === 'ArrowUp') {
        keys.up = true;
    } else if (e.key === 'ArrowDown') {
        keys.down = true;
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight') {
        keys.right = false;
    } else if (e.key === 'ArrowLeft') {
        keys.left = false;
    } else if (e.key === 'ArrowUp') {
        keys.up = false;
    } else if (e.key === 'ArrowDown') {
        keys.down = false;
    }
});

// AFTER key press needs to execute code once every 100ms.
let moveDelay = 0;
function inputHandler() {
    if(keys.right === true) {
        moveDelay += deltaTime;
        if(moveDelay >= 100) {
            block.move(1);
            moveDelay = 0;
        }
    } else if (keys.left === true) {
        moveDelay += deltaTime;
        if(moveDelay >= 100) {
            block.move(-1);
            moveDelay = 0;
        }
    }
} 

function start() {
    block.generateBlock();
}

start();
update(); 