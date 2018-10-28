

const { 
    createPoint,
    arePointsEqual
} = require('./helpers/pointsHelpers');

// Create empty object to store the data in;
let board = {};
let state = {};

// Fill board with given parameters and fill state with initial state;
function init(width, height, tempo, step) {
    board = {
        width,
        height,
        tempo,
        step,
        startPoint: {x: width / 2, y: 0}
    };
    state = {
        gameStarted: false,
        gameIsOver: false,
        pivot: board.startPoint,
        squares: []
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
    return movePointDownOneStep(movedPoint) >= board.height;
};

// Check if if a point after move doesn't hit other points;
function willHitOthers(movedPoint, otherPoints) {
    return (
        otherPoints.some(point => arePointsEqual(movedPoint, point))
    )        
};

// Check if a point after move neither
// get outside the board or hit other points;
function canMoveDown(movedPoint, otherPoints) {
    return (
        !willHitBottom(movedPoint) && 
        !willHitOthers(movedPoint, otherPoints)
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
    // setInterval(() => moveDown(1), board.tempo)
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
    if(canMoveDown(state.pivot, state.squares)) {
        state.pivot = movePointDownOneStep(state.pivot);
        state.gameIsOver = false;
    } else {
        state.squares.concat(state.pivot);
        state.pivot = board.startPoint;
        state.gameIsOver = true;
    }
}

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