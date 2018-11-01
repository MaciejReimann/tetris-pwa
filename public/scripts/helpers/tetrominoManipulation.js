const { 
   regularPolygon
} = require('./regularPolygon');
const {
    rotatePointOnGlobalZero, 
    multiplyPoint,
    addTwoPoints
} = require('./pointHelpers')

// Parallel to local coordinates system, so as when tetromino is rotated 
// the squares get rotated  as well according to the pivotLocation
function getParallelSquareVertices(angle, center, dim) {
    return regularPolygon(angle + 45, center, 4, (dim / 2) * Math.sqrt(2));
};

// Tetromino here is defined as coordinates of centers of its four squares;
function rotateTetromino(tetromino, angle) {
    return tetromino.map(squareCenter => rotatePointOnGlobalZero(squareCenter, angle))
};

function scaleTetromino(tetromino, scale) {
    return tetromino.map(squareCenter => multiplyPoint(squareCenter, scale));
};

function positionTetromino(tetromino, pivotLocation, ) {
    return tetromino.map(squareCenter => addTwoPoints(squareCenter, pivotLocation));
};

// Here we get the global position of tetromino's square centers;
function getGlobalTetrominoLocation(tetromino, angle, scale, pivotLocation) {
    return (
        positionTetromino( 
            scaleTetromino( 
                rotateTetromino(tetromino, angle), 
            scale ), 
            pivotLocation)
    )
};

// PUBLIC METHOD
// And finally we receive the global position of eqch if it's square's vertices
// in the form of array of four array of four point objects each;
function getGlobalTetrominoVertices(tetromino, angle, scale, pivotLocation) {
    return getGlobalTetrominoLocation(tetromino, angle, scale, pivotLocation)
        .map(squareCenter => getParallelSquareVertices(angle, squareCenter, scale) );
}

// Publicly accessed 
module.exports = {
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
};

// Exposed only for testing
module.exports.test = {
    getParallelSquareVertices,
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
};

