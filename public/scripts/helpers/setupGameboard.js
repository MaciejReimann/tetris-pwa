const tetrominoStock = require('./tetrominoStock');

module.exports = function setupGameboard(width, height, pixel, tempo, stockLength, tetrominoHeight) {
    return {
        width: width * pixel,
        height: height * pixel,
        pixel: pixel,
        tempo: tempo,
        start: {x: width / 2, y: 0},
        // a flag changed by nextStep();
        gameIsOver: false,

        // initialize a stock and make it possible to access and mutate its state;
        stock: tetrominoStock(stockLength, tetrominoHeight),
    };
};