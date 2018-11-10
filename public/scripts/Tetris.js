
const { 
    createPoint,
    addTwoPoints,
    movePoint,
    movePointOnY,
    movePointOnX,
    multiplyPoint,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
    rotatePointOnGlobalZero 
} = require('./helpers/pointHelpers');

const tetrominoStock = require('./helpers/tetrominoStock');

const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

function Tetris(prevState, action) {
    const {
        width, height, pixel, start, type, angle, score
    } = prevState;
    let nextState = {};
    let nextCenters;
    let nextPivot = prevState.pivot ? prevState.pivot : start;
    let nextAngle = prevState.angle ? prevState.angle : 0;    

    // since its pure function, no need for object initialization
    if(action === 'MOVE DOWN') {
        nextPivot = movePointOnY(nextPivot, pixel);
    } else if(action === 'MOVE RIGHT') {
        nextPivot = movePointOnX(nextPivot, pixel);
    } else if(action === 'MOVE LEFT') {
        nextPivot = movePointOnX(nextPivot, - pixel);
    } else if(action === 'TURN RIGHT') {
        nextAngle = nextAngle + 90;
    } else if(action === 'TURN LEFT') {
        nextAngle = nextAngle - 90;
    };   

    nextCenters = getGlobalTetrominoCenters(
        type, nextAngle, pixel, nextPivot
    );

    function moveIsAllowed(points) {
        return points.every(point => 
            isPointWithinXRange(point, 0, width) &&
            isPointWithinYRange(point, 0, height)
        );
    };

    if(moveIsAllowed(nextCenters)) {
        nextState.pivot = nextPivot;
        nextState.angle = nextAngle;
        nextState.vertices = getGlobalTetrominoVertices(
            type, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        pivot.y === start.y 
            ? nextState.gameIsOver = true 
            : nextState.pivot = start
        nextState.type = tetrominoStock.getFirstAndReplenish();
    };

    return Object.assign({}, prevState, nextState);
};

module.exports = Tetris;