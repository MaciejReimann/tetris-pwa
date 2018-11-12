const tetrominoStock = require('../../scripts/helpers/tetrominoStock');
const { clone } = require('../../scripts/helpers/arrayHelpers');

describe('', () => {
    test("Build a stock of n length", () => {
        const max = 1000;
        let counter = 0;
        while (counter < max) {
            const stock = tetrominoStock(counter);
            expect(stock.getCurrent().length).toBe(counter);
            counter ++;
        };        
    });
    test("Get n times the n-th element and see if they're equal", () => {  
        const n = 1000;
        const stock = tetrominoStock(n);
        const originalStock = clone(stock.getCurrent());       
        let counter = 0;
        while (counter < n) {
            expect(stock.getFirstAndReplenish()).toEqual(originalStock[counter]);
            counter ++;
        };
    });
    test("Accessing the stock", () => {
        const stock = tetrominoStock(3);
        const originalStock = clone(stock.getCurrent());
        // before doing anything
        expect(stock.getCurrent()).toEqual(originalStock);
        expect(stock.getCurrent()[0]).toEqual(originalStock[0]);        
        //first time
        expect(stock.getFirstAndReplenish()).toEqual(originalStock[0]);
        // second time
        expect(stock.getFirstAndReplenish()).toEqual(originalStock[1]);
        // third time
        expect(stock.getCurrent()[0]).toEqual(originalStock[stock.getCurrent().length - 1]);
        expect(stock.getFirstAndReplenish()).toEqual(originalStock[2]);
    });
})
