

const { 
    createPoint,
    arePointsEqual
} = require('./helpers/pointsHelpers');
const tetrominoStock = require('./helpers/tetrominosHelpers');

// Create empty object to store the data in;
let board = {};
let state = {};

// Fill board with given parameters and fill state with initial state;
function init(width, height, tempo, step, stockLength) {
    board = {
        width: width * step,
        height: height * step,
        tempo: tempo,
        step,
        startPoint: {x: width / 2, y: 0},
        stockLength: 3
    };
    state = {
        gameStarted: false,
        gameIsOver: false,
        pivotLocation: board.startPoint,
        tetrominoStock: tetrominoStock.build(board.stockLength),
        tetrominoLocation: [], //falling tetromino 's squarecenters
        stackedSquares: [] // stacked down tetrominos
    };
};

// PRIVATE METHODS
function movePoint(point, x, y) {
    return createPoint(point.x + x, point.y + y);
};

function movePointDown(point, y) {
    return movePoint(point, 0, y);
};

function movePointDownOneStep(point) {
    return movePointDown(point, board.step);
};

// Check if a point after move doesn't get outside the board;
function willHitBottom(movedPoint) {
    return movePointDownOneStep(movedPoint).y >= board.height;
};

// Check if if a point after move doesn't hit other points;
function willHitOthers(movedPoint, otherPoints) {
    return (
        otherPoints.some(point => {
            return arePointsEqual(movePointDownOneStep(movedPoint), point)
        })
    );   
};



// Check if the pivot after move neither
// get outside the board or hit stacked squares;
function canMoveDownNow() {
    return (
        !willHitBottom(state.pivotLocation) && 
        !willHitOthers(state.pivotLocation, state.stackedSquares)
    );
};

// PUBLIC METHODS
function getBoard() {
    return board
};

function getState() {
    return state
};

function start() {
    state.gameStarted = true;
    // while (!state.gameIsOver) {

    // };
    const ID = setInterval(() => nextStep(), board.tempo)
};

function pause() {
    state.gamePaused = true;
    // clearInterval
};

function restore() {
    state.gamePaused = false;
    // setInterval again
};

function nextStep() {    
    if( canMoveDownNow() ) {
        state.pivotLocation = movePointDownOneStep(state.pivotLocation);        
    } else {
        state.stackedSquares = state.stackedSquares.concat(state.pivotLocation);
        state.pivotLocation = board.startPoint;
        state.gameIsOver =  !canMoveDownNow() ? true : false;
    };
};

function moveRight() {

}

function moveLeft() {

}

module.exports = {
    getBoard,
    getState,
    init,
    start,
    pause,
    restore,
    nextStep,
    moveRight,
    moveLeft
};