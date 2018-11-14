// Function returning object with all tetris actions;

const tetris = require('./tetris');
const setupGameboard = require('./helpers/setupGameboard');

module.exports = function (gameBoard, callback) {
    const { width, height, pixel, tempo, stocklength } = gameBoard;
    const initialState = setupGameboard(width, height, pixel, tempo, stocklength);
    const onCanvas = initialState;
    let gameIsRunning;

    let gameState = tetris(initialState);

    function isGameRunning() {
        return gameIsRunning;
    };
    function startGame() {
        if(!gameIsRunning) {
            gameIsRunning = setInterval(
                () => {
                    gameState = tetris(gameState, 'MOVE DOWN', callback)
                }, 
                initialState.tempo
            );
        };
    };
    function pauseGame() {
        clearInterval(gameIsRunning);
        gameIsRunning = false;
    };
    function moveDown() {
        gameState = tetris(gameState, 'MOVE DOWN', callback);
    };
    function moveRight() {
        gameState = tetris(gameState, 'MOVE RIGHT', callback);
    };
    function moveLeft() {
        gameState = tetris(gameState, 'MOVE LEFT', callback);
    };
    function turnRight() {
        gameState = tetris(gameState,'TURN RIGHT', callback);
    };
    function turnLeft() {
        gameState = tetris(gameState, 'TURN LEFT', callback);
    };

    function getState() {
        return gameState;
    };

    return {
        isGameRunning,
        onCanvas,
        startGame,
        pauseGame,
        moveDown,
        moveRight,
        moveLeft,
        turnRight,
        turnLeft,
        getState,
    };
};