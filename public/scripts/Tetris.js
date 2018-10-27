

// const { 
//     merge,
// } = require('./helpers/pointsManipulation');

const Point = require('./helpers/Point');

// Tetris object to be exported

let board = {};

let state = {};

let status = '';


// PRIVATE METHODS

const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const isOnStart = position => position.y === board.startPoint.y;

// Check if moved doesn't hit other squares on the board;
const hitsOthers = (position, n, others) => others.some(square => 
    arePointsEqual(square, {x: position.x, y: position.y + n})
);

// Check if moved doesn't get outside the board;
const hitsBottom = (position, n) => position.y + n >= board.height;
// Check if can be moved down;
const canMoveDown = (position, n, others) => 
    !hitsBottom(position, n) && !hitsOthers(position, n, others);

const getStartPosition = () => board.startPoint;

const getNextPosition = (position, n) => {
    return {
        x: position.x, 
        y: position.y + n
    }
}

// PUBLIC METHODS
const getBoard = () => board;
const getState = () => state;
const getStatus = () => status;

const setUp = (width, height, tempo) => {
    board = {
        width,
        height,
        tempo,
        startPoint: {x: width / 2, y: 0}
    }
    return state;
}

const start = () => {
    status = "Game started";
    state = {
        gameStarted: true,
        gameIsOver: false,
        pivot: board.startPoint,
        squares: []
    }
    return state;
}

const pause = () => {
    status = "Game started";
    state.gamePaused = true;

    return state;
}



const moveDown = (n) => {
    
    if (state.gameIsOver) {
        status = "Game over"
        return state;
    } else {
        status = "Moved down";    
    }    

    state.pivot = !canMoveDown(state.pivot, n, state.squares)
        ? getStartPosition() 
        : getNextPosition(state.pivot, n)
    
    state.squares = !canMoveDown(state.pivot, n, state.squares)
        ? state.squares.concat(state.pivot)
        : state.squares

    state.gameIsOver = !canMoveDown(state.pivot, n, state.squares) 
        && isOnStart(state.pivot)
    
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
    getBoard,
    getState,
    getStatus,

    state,
    hitsOthers,

    setUp,
    start,
    pause,
    moveDown,
    moveRight,
    moveLeft
};