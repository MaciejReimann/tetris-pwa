// Create, save and manipulate an array of random tetromino types
const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers');
const tetrominoTypes = require('./tetrominoTypes');

// PRIVATE VARIABLE
let currentStock = [];

// PRIVATE METHODS
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

// PUBLIC METHODS
function build(length, height) {
  if(!height) {
    currentStock = createAndPopulateArray(length, _getRandomTetromino);
  } else {
    currentStock = createAndPopulateArray(length, () =>_getRandomTetromino(height));
  };
  return currentStock;
};

function getCurrent() {
  return currentStock;
};

function getFirstAndReplenish() {
  currentStock.push(_getRandomTetromino());
  return currentStock.shift();
};

module.exports = {
  tetrominoTypes, 
  build,
  getCurrent,
  getFirstAndReplenish,
};