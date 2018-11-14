// Function returning object with all tetris actions;

const tetris = require('./tetris');
const setupGameboard = require('./helpers/setupGameboard');

module.exports = function (gameBoard, callback) {
    const { width, height, pixel, tempo, stocklength } = gameBoard;
    const initialState = setupGameboard(width, height, pixel, tempo, stocklength);
    const onCanvas = initialState;
    const MOVE_DOWN = 'MOVE DOWN';
    let gameIsRunning;

    let gameState = tetris(initialState);

    function isGameRunning() {
        return gameIsRunning;
    };

    function startGame() {
        if(!gameIsRunning) {
            gameIsRunning = setInterval(
                () => {
                    gameState = tetris(gameState, MOVE_DOWN, callback)
                }, 
                initialState.tempo
            );
        };
    };

    function pauseGame() {
        clearInterval(gameIsRunning);
        gameIsRunning = false;
        console.log(gameBoard)
    };

    function moveDown() {
        gameState = tetris(gameState, MOVE_DOWN, callback);
    };

    function getState() {
        return gameState;
    }

    return {
        isGameRunning,
        onCanvas,
        startGame,
        pauseGame,
        moveDown,
        getState,
    }
};