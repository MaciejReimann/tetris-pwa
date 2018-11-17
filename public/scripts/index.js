const gameBoard = require('./gameBoard');
const tetris = require('./tetrisAPI')(gameBoard, update);
const {
    drawRectangularGrid,
    drawSquare,
    fill,
    clear
} = require('./helpers/canvasHelpers')

const tetrisContainer = document.createElement('DIV');
tetrisContainer.className = 'tetris-container';

const scoreContainer = document.createElement('DIV');
scoreContainer.className = 'score-container';

const STOCK_CANVAS = document.createElement('CANVAS');
STOCK_CANVAS.className = 'stock-canvas';
STOCK_CANVAS.height = tetris.onCanvas.pixel * 5;
STOCK_CANVAS.width = tetris.onCanvas.width;

const CANVAS = document.createElement('CANVAS');
CANVAS.className = 'large-canvas';
CANVAS.height = tetris.onCanvas.height;
CANVAS.width = tetris.onCanvas.width;

document.querySelector('body').appendChild(tetrisContainer);
tetrisContainer.appendChild(scoreContainer);
tetrisContainer.appendChild(STOCK_CANVAS);
tetrisContainer.appendChild(CANVAS);

function score() {
    scoreContainer.textContent = `SCORE: ${tetris.getState().score}`;
}

function update() {
    score();
    render();
}

function render() {
    const tetromino = tetris.getState().tetrominoVertices;
    const squares = tetris.getState().squareVertices;

    clear(CANVAS);
    fill(CANVAS, 'black');
    if(tetromino) {
        tetromino
            .map(square => drawSquare(square, CANVAS, square[0].prop.color)
            .fill()
        );
    };
    if(squares) {
        squares
            .map(square => drawSquare(square, CANVAS, square[0].prop.color)
            .fill()
        );
    };
    drawRectangularGrid(CANVAS, tetris.getState().pixel, "white");
};

window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
        !tetris.isGameRunning() ? tetris.startGame() : tetris.pauseGame();
    } else if(e.key === 'ArrowDown' && tetris.isGameRunning()) {
        tetris.moveDown();
    } else if(e.key === 'ArrowLeft' && tetris.isGameRunning()) {
        tetris.moveLeft();
    } else if(e.key === 'ArrowRight' && tetris.isGameRunning()) {
        tetris.moveRight();
    } else if(e.key === 'a' || e.key === 'A' && tetris.isGameRunning()) {
        tetris.turnRight();
    } else if(e.key === 'z' || e.key === 'Z' && tetris.isGameRunning()) {
        tetris.turnLeft();
    };
});

update();







