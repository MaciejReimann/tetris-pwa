
const { 
    movePointOnY,
    movePointOnX,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
} = require('./helpers/pointHelpers');

const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

function tetris(prevState, action, callback) {
    const { width, height, pixel, start, stock, score } = prevState;
    let nextState = {};
    let nextCenters;
    let nextVertices;
    let nextType = prevState.type || prevState.stock.getFirstAndReplenish();
    let nextPivot = prevState.pivot || start;
    let nextAngle = prevState.angle || 0;
    let nextSquares = prevState.squares || [];

    // since its pure function, no need for object initialization
    if(action === 'MOVE DOWN') {
        nextPivot = movePointOnY(nextPivot, pixel);
    } else if(action === 'MOVE RIGHT') {
        nextPivot = movePointOnX(nextPivot, pixel);
    } else if(action === 'MOVE LEFT') {
        nextPivot = movePointOnX(nextPivot, -pixel);
    } else if(action === 'TURN RIGHT') {
        nextAngle += 90;
    } else if(action === 'TURN LEFT') {
        nextAngle -= 90;
    };

    nextCenters = getGlobalTetrominoCenters(
        nextType.centers, nextAngle, pixel, nextPivot
    );

    function moveIsAllowed(points) {
        return points.every(point => 
            isPointWithinXRange(point, 0, width) &&
            isPointWithinYRange(point, 0, height)
        );
    };
    // What happens when tetromino is falling;
    if(moveIsAllowed(nextCenters)) {
        nextVertices = getGlobalTetrominoVertices(
            nextType.centers, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        if(nextPivot.y === start.y) {
            nextState.gameIsOver = true;
        } else {
    // What happens when tetromino hits the bottom;
            nextType    = stock.getFirstAndReplenish();
            nextPivot   = start;
            nextAngle   = 0;
            nextSquares = nextSquares.concat( getGlobalTetrominoCenters(
                prevState.type.centers, 
                prevState.angle, 
                pixel, 
                prevState.pivot 
            ));
        };
    };

    nextState.type     = nextType;
    nextState.pivot    = nextPivot;
    nextState.angle    = nextAngle;
    nextState.squares  = nextSquares;
    nextState.vertices = nextVertices;

    return Object.assign({}, prevState, nextState);
};

module.exports = tetris;