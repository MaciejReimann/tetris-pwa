const tetrominoStock = require('../../scripts/helpers/tetrominoCreation');
const { clone } = require('../../scripts/helpers/arrayHelpers');

describe('', () => {
    test("Build a stock of n length", () => {
        const max = 1000;
        let counter = 0;
        while (counter < max) {
            const stock = tetrominoStock.build(counter);
            expect(stock.length).toBe(counter);
            counter ++;
        };        
    });
    test("Get n times the n-th element and see if they're equal", () => {  
        const n = 1000;
        const stock = tetrominoStock.build(n);
        const originalStock = clone(stock);        
        let counter = 0;
        while (counter < n) {
            expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[counter]);
            counter ++;
        };
    });
    test("Accessing the stock", () => {  
        const stock = tetrominoStock.build(3);
        const originalStock = clone(stock);
        // before doing anything
        expect(tetrominoStock.getCurrent()).toEqual(stock);
        expect(tetrominoStock.getCurrent()[0]).toEqual(originalStock[0]);        
        // first time
        expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[0]);
        // second time
        expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[1]);
        // third time
        expect(tetrominoStock.getCurrent()[0]).toEqual(originalStock[stock.length - 1])
        expect(tetrominoStock.getFirstAndReplenish()).toEqual(originalStock[2]);
    });
})
