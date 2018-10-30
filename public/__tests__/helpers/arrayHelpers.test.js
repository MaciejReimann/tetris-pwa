const {
    getRandomArrayItem,
    createAndPopulateArray,
} = require('../../scripts/helpers/arrayHelpers');

const decimalNumbers = [0,1,2,3,4,5,6,7,8,9];

describe("Test getRandomArrayItem()", () => {
    const array = decimalNumbers;

    test("Item is in the array", () => {
        expect(array.includes(getRandomArrayItem(array))).toBeTruthy();
    });
    test("After a finite number of trials function will return every item", () => {
        let tempArray = [];
        let counter = 0;
        while (tempArray.length < array.length) {
            const randomItem = getRandomArrayItem(array);
            if ( !tempArray.includes(randomItem) ) {
                tempArray = tempArray.concat(randomItem);
            };
        };
    });
});

describe("Test createAndPopulateArray()", () => {
    let counter = 0;
    const getNext = () => counter ++;
    const makeOne = () => 1;
    const createEmptyObject = () => { return {} };

    test("Create an array of identical numbers", () => {
        expect(createAndPopulateArray(4, makeOne)).toEqual([1, 1, 1, 1])
    });
    test("Create an array of empty objects", () => {
        expect(createAndPopulateArray(3, createEmptyObject)).toEqual([{}, {}, {}])
    });
    test("Create an array of subsequent numbers", () => {
        expect(createAndPopulateArray(9, getNext)).toEqual([0,1,2,3,4,5,6,7,8])
    });
});