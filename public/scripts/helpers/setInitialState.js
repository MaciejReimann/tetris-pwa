const tetrominoStock = require('./tetrominoStock');
const { createPoint } = require('./pointHelpers');

function setInitialState(width, height, pixel, tempo, stockLength) {
    return {
        width: width * pixel,
        height: height * pixel,
        pixel: pixel,
        tempo: tempo,
        start: createPoint(width / 2, 0),
        // a flag changed by nextStep();
        gameIsOver: false,

        // create a stock of tetrominos to show them before the game starts,
        // after game will have started, this property will be assigned a value
        // by tetrominoStock.getCurrent() in nextStep();
        stock: tetrominoStock.build(stockLength), 

        // a reference point for all tetromino calculations, after it is moved, 
        // tetrominoSquares are recalculated;
        pivot: createPoint(width / 2, 0),

        // falling tetromino local square centers, i.e. its definition, 
        // first time assigned a value on start(), keeps the valuea untill 
        // tetromino hits the bottom;
        type: [],

        // falling tetromino default angle
        angle: 0,

        // stacked down tetrominos' square centers' global vertices,
        //  recalculated in nextStep();
        squares: [],
    };
};

module.exports = setInitialState;