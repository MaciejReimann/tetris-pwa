

// const { 
//     merge,
// } = require('./helpers/pointsManipulation');

const Point = require('./helpers/Point');

// Tetris object to be exported
const state = {};
state.board = {};
const status = {};


// PRIVATE METHODS





// PUBLIC METHODS
const getState = () => {
    return state;
}

const setUp = (width, height, tempo) => {
    state.board.width = width;
    state.board.height = height;
    state.board.tempo = tempo;
    state.board.startPivot = new Point(width / 2, 0)
    return state;
}

const start = () => {
    status.log = "Game started";
    state.gameStarted = true;

    return state;
}

const pause = () => {
    status.log = "Game started";
    state.gameStarted = true;

    return state;
}

const moveDown = () => {
    const { startPivot } = state.board;
    status.log = "Moved down";
    state.pivot = state.pivot 
        ? state.pivot.moveOnY(1) 
        : new Point(startPivot.x, startPivot.y)
    return state;
}

const moveRight = () => {
    status.log = "Moved right";
    return state;
}

const moveLeft = () => {
    status.log = "Moved right";
    return state;
}

module.exports = {
    getState,
    setUp,
    start,
    pause,
    moveDown,
    moveRight,
    moveLeft
};