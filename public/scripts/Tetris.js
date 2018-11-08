
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

const tetrominoStock = require('./helpers/tetrominoStock');

const {
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

function Tetris(prevState, action) {
    const {
        width, height, pixel, tempo, start, type, pivot, angle, score
    } = prevState;
    let nextState = {};
    let intervalID;
    let nextPivot,
        nextAngle
    if(action === 'INITIALIZE') {
        console.log("initialized")
    } else if(action === 'START') {
        nextState.type = tetrominoStock.getFirstAndReplenish();
    } else if(action === 'MOVE DOWN') {
        nextState.pivot = movePointOnY(pivot, pixel);
    }
    nextState = Object.assign({}, prevState, nextState);
    console.log(nextState)
    return nextState;
};

module.exports = Tetris;