

// const { 
//     merge,
// } = require('./helpers/pointsManipulation');

const Point = require('./helpers/Point');

// Tetris object to be exported
const state = {};
state.board = {};
let status = '';


// PRIVATE METHODS

const isOnStart = position => position.y === state.board.startPivot.y;

// Check if moved doesn't hit other squares on the board;
const hitsSquares = () => false;
// Check if moved doesn't get outside the board;
const hitsBottom = (position, n) => position.y + n >= state.board.height;
// Check if can be moved down;
const canMoveDown = (position, n) => !hitsBottom(state.pivot, n) && !hitsSquares();

const whenMovedDown = (position, n) => {
    return {
        x: position.x, 
        y: position.y + n
    }
}

const getStartPosition = () => state.board.startPivot
const getNextPosition = (position, n) => canMoveDown(position, n)
    ? whenMovedDown(position, n)
    : getStartPosition()





// PUBLIC METHODS
const getState = () => {
    return state;
}
const getStatus = () => {
    return status;
}

const setUp = (width, height, tempo) => {
    state.board.width = width;
    state.board.height = height;
    state.board.tempo = tempo;
    state.board.startPivot = new Point(width / 2, 0)
    return state;
}

const start = () => {
    status = "Game started";
    state.gameStarted = true;
    state.gameIsOver = false;
    return state;
}

const pause = () => {
    status = "Game started";
    state.gameStarted = true;

    return state;
}



const moveDown = (n) => {
    
    if (state.gameIsOver) {
        status = "Game over"
        return state;
    } else {
        status = "Moved down";    
    }    

    state.pivot = state.pivot
        ? getNextPosition(state.pivot, n)
        : getStartPosition()

    state.gameIsOver = !canMoveDown(state.pivot, n) && isOnStart(state.pivot)
    
    return state;
}

const moveRight = () => {
    status = "Moved right";
    return state;
}

const moveLeft = () => {
    status = "Moved right";
    return state;
}

module.exports = {
    getState,
    getStatus,

    state,

    setUp,
    start,
    pause,
    moveDown,
    moveRight,
    moveLeft
};