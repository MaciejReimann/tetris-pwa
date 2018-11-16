
const { 
    movePointOnY,
    movePointOnX,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
} = require('./helpers/pointHelpers');

const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices,
    getParallelSquareVertices
} = require('./helpers/tetrominoManipulation');

function tetris(prevState, action, callback) {
    const { width, height, pixel, start, stock, score } = prevState;
    let nextState = {};
    let nextCenters;    
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
    // where the centers would be if any of the above actions is applied;
    nextCenters = getGlobalTetrominoCenters(
        nextType, nextAngle, pixel, nextPivot
    );
    // eliminate any full rows on the board;
    nextSquares = nextSquares.reduce((acc, cur, ind, arr) => {
        if(arr.filter(p => cur.y === p.y).length < width / pixel) {
            acc = acc.concat(cur)
        }
        return acc;
    }, []);

    function moveIsAllowed(points) {
        return points.every(point => 
            isPointWithinXRange(point, 0, width) &&
            isPointWithinYRange(point, -pixel, height) &&
            nextSquares.every(p => !arePointsEqual(p, point))
        );
    };
    // What happens when tetromino is falling;
    if(moveIsAllowed(nextCenters)) {
        nextState.type     = nextType;
        nextState.pivot    = nextPivot;
        nextState.angle    = nextAngle;
        nextState.squares  = nextSquares;
     // Produce falling tetromino's vertices only in this case;
        nextState.tetrominoVertices = getGlobalTetrominoVertices(
            nextType, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        if(nextPivot.y === start.y) {
            nextState.gameIsOver = true;
        } else {
    // What happens when tetromino hits the bottom;
            nextState.type    = stock.getFirstAndReplenish();
            nextState.pivot   = start;
            nextState.angle   = 0;
            nextState.squares = nextSquares.concat( getGlobalTetrominoCenters(
                prevState.type, 
                prevState.angle, 
                pixel, 
                prevState.pivot 
            ));
        };
    };
    // Produce fallen squares' vertices in any case;

    nextState.squareVertices = [].concat(nextSquares
        .map(center => getParallelSquareVertices(0, center, pixel)
    ));

    return Object.assign({}, prevState, nextState);
};

module.exports = tetris;