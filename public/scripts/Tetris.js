

const { 
    createPoint,
} = require('./helpers/pointsHelpers');

// Create empty object to store the data in;
let board = {};
let state = {};

// Initialize board with given board parameters and initial game state;
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
    return createPoint(point.x + x, point.y + y)
}

function movePointDown(point, y) {
    return movePoint(point, 0, y)
}

 

const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const isOnStart = position => position.y === board.startPoint.y;

// Check if moved doesn't hit other squares on the board;
const hitsOthers = (position, n, others) => others.some(square =>
    arePointsEqual(square, {x: position.x, y: position.y + n})
);

// Check if moved point doesn't get outside the board;
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

const start = () => {
    state.gameStarted = true;    
    // setInterval(() => moveDown(1), board.tempo)
}

const pause = () => {
    state.gamePaused = true;
}

function moveDown(n) {
    if(canMoveDown(state.pivot, n, state.squares)) {
        status = "Moved down";
        state.pivot = getNextPosition(state.pivot, n);
        state.gameIsOver = false;
    } else {
        state.squares.concat(state.pivot)
        state.pivot = getStartPosition() 
        state.gameIsOver = true;
    }
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

    init,
    start,
    pause,
    moveDown,
    moveRight,
    moveLeft
};