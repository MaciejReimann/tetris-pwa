

const { 
    merge,
} = require('./helpers/pointsManipulation');

// Tetris object to be exported
const state = {};
const nextState = {};
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
    status.log = "Moved down";
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