

const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers')


// PRIVATE VARIABLES
// Tetromino defined as their 4 squares' center points
// in relation to their local zero called pivot;
const _I = [
  { x: -1.5, y:  0.5 },
  { x: -0.5, y:  0.5 },
  { x:  0.5, y:  0.5 },
  { x:  1.5, y:  0.5 }
];
const _J = [
  { x: -1.5, y: -0.5 },
  { x: -0.5, y: -0.5 },
  { x:  0.5, y: -0.5 },
  { x:  0.5, y:  0.5 }
];
const _L = [
  { x: -0.5, y:  0.5 },
  { x: -0.5, y: -0.5 },
  { x:  0.5, y: -0.5 },
  { x:  1.5, y: -0.5 }
];
const _O = [
  { x: -0.5, y: -0.5 },
  { x:  0.5, y: -0.5 },
  { x:  0.5, y:  0.5 },
  { x: -0.5, y:  0.5 }
];
const _S = [
  { x: -0.5, y:  0.5 },
  { x:  0.5, y:  0.5 },
  { x:  0.5, y: -0.5 },
  { x:  1.5, y: -0.5 }
];
const _T = [
  { x: -0.5, y: 0.5 },
  { x:  0.5, y: 0.5 },
  { x:  0.5, y: 1.5 },
  { x:  1.5, y: 0.5 }
];
const _Z = [
  { x: -0.5, y: -0.5 },
  { x:  0.5, y: -0.5 },
  { x:  0.5, y:  0.5 },
  { x:  1.5, y:  0.5 }
];

const allTetrominos = [_I, _J, _L, _O, _S, _T, _Z];
const tetrominosHeight_1 = allTetrominos[0];
const tetrominosHeight_2 = allTetrominos.slice(1, allTetrominos.length);

let currentStock = [];

// PRIVATE METHODS

function _getRandomTetromino(height) {
  if(height === 1) {
    return tetrominosHeight_1;
  } else if(height === 2) {
    return getRandomArrayItem(tetrominosHeight_2);
  } else {
    return getRandomArrayItem(allTetrominos);
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
  allTetrominos, 
  build,
  getCurrent,
  getFirstAndReplenish,
};