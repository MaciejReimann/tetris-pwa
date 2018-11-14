const gameBoard = require('./gameBoard');
const tetris = require('./tetrisAPI')(gameBoard, render);
const CANVAS = document.createElement('CANVAS');
CANVAS.height = tetris.onCanvas.height;
CANVAS.width = tetris.onCanvas.width;
document.querySelector('body').appendChild(CANVAS);

function render() {
    console.log('rendered')
    console.log(tetris.getState().vertices)
}


window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        !tetris.isGameRunning() ? tetris.startGame() : tetris.pauseGame();
        console.log(tetris.isGameRunning())
    } else if(e.key === 'ArrowDown') {
        tetris.moveDown();
    };
})







