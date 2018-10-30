const tetrominoStock = require('../../scripts/helpers/tetrominosHelpers');
const { clone } = require('../../scripts/helpers/arrayHelpers');

// const allTetrominos = ["T_tetromino", "I_tetromino", "C_tetromino"];

test("Stock of 3 random tetrominos shown and on gettting first, the last one pops in", () => {
    tetrominoStock.build(3);
    const originalStock = clone(tetrominoStock.showCurrent());
    expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[0])
    expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[1])
    expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[2])
});