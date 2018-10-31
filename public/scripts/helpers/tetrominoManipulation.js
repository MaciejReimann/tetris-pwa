const { 
   regularPolygon
} = require('./regularPolygon.js');

function getParallelSquareVertices(angle, center, dim) {
    return regularPolygon(angle + 45, center, 4, (dim / 2) * Math.sqrt(2));
};

function rotateTetromino(tetromino, angle) {
    return tetromino.map(squareCenter => rotatePointOnGlobalZero(squareCenter, angle))
};

function scaleTetromino(tetromino, scale) {
    return tetromino.map(squareCenter => multiplyPoint(squareCenter, scale));
};

function positionTetromino(tetromino, pivot, ) {
    return tetromino.map(squareCenter => addTwoPoints(squareCenter, pivot));
};

function getGlobalTetrominoLocation(tetromino, angle, scale, pivot) {
    return (
        positionTetromino( 
            scaleTetromino( 
                rotateTetromino(tetromino, angle), 
            scale ), 
        pivot)
    )
};

function getGlobalTetrominoVertices(tetromino, angle, scale, pivot) {
    
}

module.exports = {
    getParallelSquareVertices,
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
}