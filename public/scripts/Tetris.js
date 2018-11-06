

const { 
    createPoint,
    addTwoPoints,
    movePoint,
    movePointOnY,
    movePointOnX,
    multiplyPoint,
    arePointsEqual,   
    rotatePointOnGlobalZero 
} = require('./helpers/pointHelpers');

const tetrominoStock = require('./helpers/tetrominoCreation');

const {
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

// Create empty object to store the data in;
let board = {};
let state = {};
let intervalID;

// Fill board with given parameters and fill state with initial state;
function init(width, height, tempo, step, stockLength) {
    board = {
        width: width * step,
        height: height * step,
        tempo: tempo,
        step,
        resolution: step,
        startPoint: createPoint(width / 2, 0),
        stockLength,
    };
    state = {
        // a flag changed by start();
        gameStarted: false,

        // a flag changed by nextStep();
        gameIsOver: false,

        // create a stock of tetrominos to show them before the game starts,
        // after game will have started, this property will be assigned a value
        // by tetrominoStock.getCurrent() in nextStep();
        tetrominoStock: tetrominoStock.build(stockLength), 

        // a reference point for all tetromino calculations, after it is moved, 
        // tetrominoSquares are recalculated;
        pivotLocation: board.startPoint,

        // falling tetromino local square centers, i.e. its definition, 
        // first time assigned a value on start(), keeps the valuea untill 
        // tetromino hits the bottom;
        tetrominoType: [],

        // falling tetromino default angle
        tetrominoAngle: 0,

        // falling tetromino 's square centers' global vertices, 
        // recalculated in nextStep();
        tetrominoSquares: [],

        // stacked down tetrominos' square centers' global vertices,
        //  recalculated in nextStep();
        stackedSquares: []
    };
};

// PRIVATE METHODS

function movePointDownOneStep(point) {
    return movePointOnY(point, board.step);
};

// Check if a point after move doesn't get outside the board;
function willHitBottom(movedPoints) {
    return movedPoints.some(
        movedPoint => movePointDownOneStep(movedPoint).y >= board.height
    );
};

// Check if if a point after move doesn't hit other points;
function willHitOthers(movedPoints, otherPoints) {
    return (
        otherPoints.some(point => {
            return movedPoints.map(movedPoint => 
                arePointsEqual(movePointDownOneStep(movedPoint), point)
            );            
        })
    );   
};


// Check if the tetromino square centers after moving pivot neither
// get outside the board or hit the stacked squares;
function canMoveDownNow() {
    return (
        !willHitBottom(state.tetrominoSquares) && 
        !willHitOthers(state.tetrominoSquares, state.stackedSquares)
    );
};

// PUBLIC METHODS

function overrideToTest(length, height, type) {
    state.gameStarted = true;
    state.tetrominoStock = tetrominoStock.build(length, height);
    state.tetrominoType = tetrominoStock.getFirstAndReplenish();
    state.tetrominoSquares = getGlobalTetrominoLocation(
        state.tetrominoType, state.tetrominoAngle, board.step, state.pivotLocation
    );
    intervalID = setInterval(() => nextStep(), board.tempo);
};

function getBoard() {
    return board
};

function getState() {
    return state
};

function start() {
    state.gameStarted = true;
    state.tetrominoType = tetrominoStock.getFirstAndReplenish();
    state.tetrominoStock = tetrominoStock.getCurrent();
    state.tetrominoSquares = getGlobalTetrominoLocation(
        state.tetrominoType, state.tetrominoAngle, board.step, state.pivotLocation
    );
    // while (!state.gameIsOver) {
    // };
    intervalID = setInterval(() => nextStep(), board.tempo);
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
        state.stackedSquares = state.stackedSquares.concat(state.tetrominoSquares);
        state.pivotLocation = board.startPoint;
        state.gameIsOver =  !canMoveDownNow() ? true : false;
    };
    state.tetrominoSquares = getGlobalTetrominoLocation(
        state.tetrominoType, state.tetrominoAngle, board.step, state.pivotLocation
    );
};

function moveRight() {

}

function moveLeft() {

}

module.exports = {
    overrideToTest,
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