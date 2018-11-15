const tetrominoStock = require('./tetrominoStock');

module.exports = function setupGameboard(width, height, pixel, tempo, stockLength, tetrominoHeight, colorPalette) {
    return {
        width: width * pixel,
        height: height * pixel,
        pixel: pixel,
        tempo: tempo,
        start: {x: width * pixel / 2, y: -pixel},
        // a flag changed by nextStep();
        gameIsOver: false,

        // initialize a stock and make it possible to access and mutate its state;
        stock: tetrominoStock(stockLength, tetrominoHeight, colorPalette),
    };
};