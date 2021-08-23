const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;
const width = canvas.width, height = canvas.height;

const cellSize = 20;
let dir;
var gameState;

let keys = {
    left: false,
    right: false,
    up: false,
    down: false
}

function gameLoop() {
    drawBG();
    block.draw(block.currentBlock, block.pos.x, block.pos.y);
    drawGrid();
    block.fall();
}

setInterval(() => {
    requestAnimationFrame(gameLoop);
}, 1000);

function drawBG() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
}

function drawGrid() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            ctx.strokeStyle = "#666";
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

function inputHandler() {
    if(keys.right === true) {
        dir = 1;
    } else if (keys.left === true) {
        dir = -1;
    }
} 

function colide(shape, gameState) {
    
}

function start() {
    block.generateBlock();
}

start();
gameLoop();
 