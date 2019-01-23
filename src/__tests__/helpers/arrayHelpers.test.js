const {
    getRandomArrayItem,
    createAndPopulateArray,
    carouselArray,
    flattenArray,
    concatIfDoesntInclude
} = require('../../scripts/helpers/arrayHelpers');

const decimalNumbers = [0,1,2,3,4,5,6,7,8,9];
const wrappedDecimal = decimalNumbers.map(item => [item]);

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

describe("Test carouselArray()", () => {
    const length = decimalNumbers.length;
    test("Positive n", () => {
        expect( carouselArray(decimalNumbers, 0) ).toEqual( decimalNumbers );
        expect( carouselArray(decimalNumbers, 1) ).toEqual( [1,2,3,4,5,6,7,8,9,0] );
        expect( carouselArray(decimalNumbers, 2) ).toEqual( [2,3,4,5,6,7,8,9,0,1] );
        expect( carouselArray(decimalNumbers, 3) ).toEqual( [3,4,5,6,7,8,9,0,1,2] );
    });
    test("Positive n greater than array.length", () => {
        expect( carouselArray(decimalNumbers, length + 1) ).toEqual( [1,2,3,4,5,6,7,8,9,0] );
        expect( carouselArray(decimalNumbers, length + 2) ).toEqual( [2,3,4,5,6,7,8,9,0,1] );
        expect( carouselArray(decimalNumbers, length + 3) ).toEqual( [3,4,5,6,7,8,9,0,1,2] );
    });
    test("Negative n", () => {
        expect( carouselArray(decimalNumbers, -1) ).toEqual( [9,0,1,2,3,4,5,6,7,8] );
        expect( carouselArray(decimalNumbers, -2) ).toEqual( [8,9,0,1,2,3,4,5,6,7] );
        expect( carouselArray(decimalNumbers, -3) ).toEqual( [7,8,9,0,1,2,3,4,5,6] );
    });
    test("Negative n smaller than -array.length", () => {
        expect( carouselArray(decimalNumbers, -length - 1) ).toEqual( [9,0,1,2,3,4,5,6,7,8] );
        expect( carouselArray(decimalNumbers, -length - 2) ).toEqual( [8,9,0,1,2,3,4,5,6,7] );
        expect( carouselArray(decimalNumbers, -length - 3) ).toEqual( [7,8,9,0,1,2,3,4,5,6] );
    });
});

test("Flatten an array", () => {
    expect( flattenArray(wrappedDecimal) ).toEqual(decimalNumbers)
});

test("Concat if doesnt include", () => {
    expect(concatIfDoesntInclude(decimalNumbers, "a")).toEqual(decimalNumbers.concat("a"));
    expect(concatIfDoesntInclude(decimalNumbers, 1)).toEqual(decimalNumbers);
})