
const { 
    movePointOnY,
    movePointOnX,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
} = require('./helpers/pointHelpers');

const {
    concatIfDoesntInclude
} = require('./helpers/arrayHelpers');

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
    // tetromino's square centers if given move is allowed;
    nextCenters = getGlobalTetrominoCenters(
        nextType, nextAngle, pixel, nextPivot
    );

    // filter out full rows and drop the rest down
    nextSquares = getSquaresFromNotFullRows(nextSquares).map(square =>        
        movePointOnY(
            square, 
            howManyFullRowsBelow(nextSquares, square) * pixel
        )
    );

    function getSquaresFromNotFullRows(points) {
        return points.filter((square, i, arr) => {
            const row = arr.filter(sq => sq.y === square.y);     
            return row.length < width / pixel;
        });
    };

    function getSquaresFromFullRows(points) {
        return points.filter((square, i, arr) => {
            const row = arr.filter(sq => sq.y === square.y);     
            return row.length >= width / pixel;
        });
    };

    function yCoordsOfFullRows(points) {
        return getSquaresFromFullRows(points).reduce(
            (acc, cur, idx, arr) => concatIfDoesntInclude(acc, cur.y), [])            
    };

    function howManyFullRowsBelow(points, point) {
        return yCoordsOfFullRows(points).filter(
            rowPoint => rowPoint > point.y
        ).length;
    };

    function moveIsAllowed(points, otherPoints) {
        if(points) {
            return points.every(point => 
                isPointWithinXRange(point, 0, width) &&
                isPointWithinYRange(point, -pixel, height) &&
                otherPoints.every(p => !arePointsEqual(p, point))
            );
        } else {
            return false
        }        
    };
    // What happens when tetromino is falling;

    if(moveIsAllowed(nextCenters, nextSquares)) {
        nextState.type     = nextType;
        nextState.pivot    = nextPivot;
        nextState.angle    = nextAngle;
     // Produce falling tetromino's vertices only in this case;
        nextState.tetrominoVertices = getGlobalTetrominoVertices(
            nextType, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        if(nextPivot.y === start.y) {
            nextState.gameIsOver = true;
        } else {
            nextSquares = nextSquares.concat( getGlobalTetrominoCenters(
                prevState.type, 
                prevState.angle, 
                pixel, 
                prevState.pivot 
            ));
    // What happens when tetromino hits the bottom;
            nextState.type    = stock.getFirstAndReplenish();
            nextState.pivot   = start;
            nextState.angle   = 0;
        };
    };
    // Produce fallen squares' vertices in any case;
    nextState.squares = nextSquares;
    nextState.squareVertices = [].concat(nextState.squares
        .map(center => getParallelSquareVertices(0, center, pixel)
    ));

    return Object.assign(prevState, nextState);
};

module.exports = tetris;