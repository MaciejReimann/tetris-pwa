

const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers')


// PRIVATE VARIABLES

// Tetromino defined as their 4 squares' center points
// in relation to their local zero called pivot;
const T_tetromino = [
    { x: -0.5, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 1.5 },
    { x: 1.5, y: 0.5 }
];

const I_tetromino = [
  { x: -1.5, y: 0.5 },
  { x: -0.5, y: 0.5 },
  { x: 0.5, y: 0.5 },
  { x: 1.5, y: 0.5 }
];

const C_tetromino = [
  { x: -0.5, y: -0.5 },
  { x: 0.5, y: -0.5 },
  { x: 0.5, y: 0.5 },
  { x: -0.5, y: 0.5 }
];

// const allTetrominos = [T_tetromino, T_tetromino, T_tetromino];

const allTetrominos = [T_tetromino, I_tetromino, C_tetromino];
const tetrominosHeight_1 = [];
const tetrominosHeight_2 = [];
const tetrominosHeight_3 = [];

// const allTetrominos = ['T_tetromino', 'I_tetromino', 'C_tetromino'];

let currentStock = [];

// PRIVATE METHODS

function _getRandomTetromino() {
  return getRandomArrayItem(allTetrominos);
}; 

// PUBLIC METHODS

function setTetrominoHeight(length, height) {
  currentStock = Array(length).fill(I_tetromino);
}

function build(length) {
  currentStock = createAndPopulateArray(length, _getRandomTetromino);
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
  setTetrominoHeight,
  setTetrominoType,
  allTetrominos, 
  build,
  getCurrent,
  getFirstAndReplenish,
};