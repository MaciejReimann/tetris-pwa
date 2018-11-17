// Function returning object with all tetris actions;

const tetris = require('./tetris');
const setupGameboard = require('./helpers/setupGameboard');

module.exports = function (gameBoard, callback) {
    const { width, height, pixel, tempo, stocklength, tetrominoHeight, colorPalette } = gameBoard;
    const initialState = setupGameboard(width, height, pixel, tempo, stocklength, tetrominoHeight, colorPalette);
    const onCanvas = initialState;
    let gameIsRunning;

    let gameState = tetris(initialState);

    function isGameRunning() {
        if(gameState.gameIsOver) {
            gameIsRunning = false;
            console.log("Game Over")
        };
        return gameIsRunning;
    };
    function startGame() {
        if(!gameIsRunning) {
            gameIsRunning = setInterval(
                () => {
                    gameState = tetris(gameState, 'MOVE DOWN')
                    callback();
                }, 
                initialState.tempo
            );
        };
    };
    function pauseGame() {
        clearInterval(gameIsRunning);
        gameIsRunning = false;
        callback();
    };
    function moveDown() {
        gameState = tetris(gameState, 'MOVE DOWN', callback);
        callback();
    };
    function moveRight() {
        gameState = tetris(gameState, 'MOVE RIGHT', callback);
        callback();
    };
    function moveLeft() {
        gameState = tetris(gameState, 'MOVE LEFT', callback);
        callback();
    };
    function turnRight() {
        gameState = tetris(gameState,'TURN RIGHT', callback);
        callback();
    };
    function turnLeft() {
        gameState = tetris(gameState, 'TURN LEFT', callback);
        callback();
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