// Create, save and manipulate an array of random tetromino types
const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers');

module.exports = function tetrominoStock(length, height, colorPalette) {
  const tetrominoTypes = require('./tetrominoTypes')(colorPalette);
  let currentStock = height 
    ? createAndPopulateArray(length, () =>_getRandomTetromino(height))
    : createAndPopulateArray(length, _getRandomTetromino);

  function _getRandomTetromino(height) {
    if(height === 1) {
      return tetrominoTypes[0];
    } else if(height === 2) {
      return getRandomArrayItem(
        tetrominoTypes.slice(1, tetrominoTypes.length)
      );
    } else {
      return getRandomArrayItem(tetrominoTypes);
    };
  };

  function getCurrent() {
    return currentStock;
  };
  function getFirstAndReplenish() {
    currentStock.push(_getRandomTetromino());
    return currentStock.shift();
  };
  
  return { getCurrent, getFirstAndReplenish }
};
