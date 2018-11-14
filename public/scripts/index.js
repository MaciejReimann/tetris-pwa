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
    if(tetris.getState().vertices) {
        console.log('sdf')
        tetris.getState().vertices
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
    };
})







