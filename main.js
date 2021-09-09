const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 480;
const width = canvas.width, height = canvas.height;
const arena = new Arena(10, 24);

const cellSize = 20;
let dir;

let keys = {
    left: false,
    right: false,
    up: false,
    space: false
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

    checkForDead();
    arenaClear();

    inputHandler();
    drawBG();
    drawGrid();
    block.drawHeldBlock();
    
    ctx.fillStyle = '#f00'
    ctx.fillRect(0, 79, width / 2, 2);

    block.draw(block.currentBlock, block.pos.x, block.pos.y);
    block.drawShadow()
    arena.drawArena();
    checkForDead();

    requestAnimationFrame(update);
}

function drawBG() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
}

function drawGrid() {
    for (i = 0; i < arena.width; i++) {
        for (j = 0; j < arena.height; j++) {
            ctx.strokeStyle = "#ccc";
            ctx.beginPath();
            ctx.rect(i * cellSize, j * cellSize, cellSize, cellSize);
            ctx.stroke();
        }
    }
}

function arenaClear() {
    outer: for (let y = arena.arenaState.length - 1; y > 0; --y) {
        for (let x = 0; x < arena.arenaState[y].length; ++x) {
            if(arena.arenaState[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.arenaState.splice(y, 1)[0].fill(0);
        arena.arenaState.unshift(row);
        ++y;
    }
}

function checkForDead() {
    for(let i = 0; i < 10; i++) { 
        if(arena.arenaState[3][i] != 0) {
            arena.clearArena();
            block.generateBlock();
            block.pos.y = 0;
            block.pos.x = 4;
            block.canHoldBlock = true;
        }
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        keys.right = true;
    } else if (e.key === 'ArrowLeft') {
        keys.left = true;
    } else if (e.key === 'ArrowUp') {
        block.playerRotate(block.currentBlock.shape, -1);
    } else if (e.key === 'ArrowDown') {
        keys.down = true;
    } else if (e.key === ' ') {
        keys.space = true;
    } else if (e.key === 'c') {
        block.holdBlock();
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight') {
        keys.right = false;
    } else if (e.key === 'ArrowLeft') {
        keys.left = false;
    } else if (e.key === 'ArrowDown') {
        keys.down = false;
    } else if (e.key === ' ') {
        keys.space = false;
    }
});

let moveDelayL, moveDelayR = 0;
let dropDelay = 0;
let hardDropDelay = 0;
let rotateDelay = 0;
function inputHandler() {
    if(keys.right === true) {
        moveDelayR += deltaTime;
        if(moveDelayR >= 100) {
            block.move(1);
            moveDelayR = 0;
        }
    } else {moveDelayR = 100}

    if(keys.left === true) {
        moveDelayL += deltaTime;
        if(moveDelayL >= 100) {
            block.move(-1);
            moveDelayL = 0;
        }
    } else {moveDelayL = 100}

    if(keys.down === true) {
        dropDelay += deltaTime;
        if(dropDelay >= 100) {
            block.fall();
            dropDelay = 0;
        }
    } else {dropDelay = 100}

    if(keys.space === true) {
        hardDropDelay -= deltaTime;
        if(hardDropDelay <= 0 && !block.collide(arena.arenaState, block)) {

            while (!block.collide(arena.arenaState, block)) {
                block.pos.y++;
            }

            block.pos.y--;
            arena.merge(arena, block);
            block.generateBlock();
            block.pos.y = 0;
            block.pos.x = 4;
            block.canHoldBlock = true;
            hardDropDelay = 500;
        }
    } else {hardDropDelay = 0}
} 

function start() {
    block.generateBlock();
    block.canHoldBlock = true;
}

start();
update();