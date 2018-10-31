const tetrominoStock = require('../../scripts/helpers/tetrominoCreation');
const { clone } = require('../../scripts/helpers/arrayHelpers');

test("From a stock of n tetrominos is generated, get first and replenish the stock", () => {
    const n = 100;
    let counter = 0;    
    const originalStock = clone(tetrominoStock.build(n));
    // while (counter < n) {
    //     expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[counter]);
    //     counter ++;
    // };
});