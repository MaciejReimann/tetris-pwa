const gameBoard = require('./gameBoard');
const tetris = require('./tetrisAPI')(gameBoard, render);
const {
    drawSquare,
    clear
} = require('./helpers/canvasHelpers')
const CANVAS = document.createElement('CANVAS');
CANVAS.height = tetris.onCanvas.height;
CANVAS.width = tetris.onCanvas.width;
document.querySelector('body').appendChild(CANVAS);

function render() {
    clear(CANVAS);
    if(tetris.getState().tetrominoVertices) {
        tetris.getState().tetrominoVertices
            .map(square => drawSquare(square, CANVAS)
            .fill()
        );
    };
    console.log(tetris.getState().squareVertices)
    if(tetris.getState().squareVertices) {
        tetris.getState().squareVertices
            .map(square => drawSquare(square, CANVAS)
            .fill()
        );
    };    
};

window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        !tetris.isGameRunning() ? tetris.startGame() : tetris.pauseGame();
    } else if(e.key === 'ArrowDown') {
        tetris.moveDown();
    } else if(e.key === 'ArrowLeft') {
        tetris.moveLeft();
    } else if(e.key === 'ArrowRight') {
        tetris.moveRight();
    } else if(e.key === 'a' || e.key === 'A') {
        tetris.turnRight();
    } else if(e.key === 'z' || e.key === 'Z') {
        tetris.turnLeft();
    };
    // render();
})







