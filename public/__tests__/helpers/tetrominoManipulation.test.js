const {
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
} = require('../../scripts/helpers/tetrominoManipulation').test;
const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
} = require('../../scripts/helpers/tetrominoManipulation');

const {
    isPoint,
    movePointOnY, 
    multiplyPoint,
    addTwoPoints,
} = require('../../scripts/helpers/pointHelpers');

const tetrominoStock = require('../../scripts/helpers/tetrominoStock');
const I_type = tetrominoStock(1,1, 'classic').getCurrent()[0].centers;


const defaulPIvot = { x: 0, y: 0 };
const movedPivotRight = { x: 1, y: 0 };
const movedPivotLeft = { x: -1, y: 0 };

describe("Tetromino manipulation", () => {
    const tetrominoMovedOneUp = I_type.map(squareCenter => 
        movePointOnY(squareCenter, -1)).reverse();
    const tetrominoScaledBy_2 = I_type.map(squareCenter => 
        multiplyPoint(squareCenter, 2));
    const tetrominoScaledBy_Half = I_type.map(squareCenter => 
        multiplyPoint(squareCenter, .5));
    const tetrominoMovedByOneRight = I_type.map(squareCenter => 
        addTwoPoints(squareCenter, movedPivotRight));
    const tetrominoMovedByOneLeft = I_type.map(squareCenter => 
        addTwoPoints(squareCenter, movedPivotLeft));

    test('Tetromino rotation', () => {
        expect(rotateTetromino(I_type, 360)).toEqual(I_type);
        expect(rotateTetromino(I_type, 0)).toEqual(I_type);
        expect(rotateTetromino(I_type, 180)).toEqual(tetrominoMovedOneUp);
    });
    test('Tetromino scaling', () => {
        expect(scaleTetromino(I_type, 1)).toEqual(I_type);
        expect(scaleTetromino(I_type, 2)).toEqual(tetrominoScaledBy_2);
        expect(scaleTetromino(I_type, .5)).toEqual(tetrominoScaledBy_Half);
    });
    test('Position tetromino', () => {
        expect(positionTetromino(I_type, defaulPIvot)).toEqual(I_type);
        expect(positionTetromino(I_type, movedPivotRight)).toEqual(tetrominoMovedByOneRight);
        expect(positionTetromino(I_type, movedPivotLeft)).toEqual(tetrominoMovedByOneLeft);
    });
    test('Position after manipulation', () => {
        expect(getGlobalTetrominoCenters(I_type, 360, 1, defaulPIvot)).toEqual(I_type);
        expect(getGlobalTetrominoCenters(I_type, 0, 1, defaulPIvot)).toEqual(I_type);
        expect(getGlobalTetrominoCenters(I_type, 0, 2, defaulPIvot)).toEqual(tetrominoScaledBy_2);
        expect(getGlobalTetrominoCenters(I_type, 180, 1, defaulPIvot)).toEqual(tetrominoMovedOneUp);
        expect(getGlobalTetrominoCenters(I_type, 0, 1, movedPivotRight)).toEqual(tetrominoMovedByOneRight);
    });
});

describe("Tetromino vertices coordinates", () => {
    test('Right data format', () => {
        expect.anything(getGlobalTetrominoVertices(I_type, 0, 1, defaulPIvot));
        expect(
            getGlobalTetrominoVertices(I_type, 0, 1, defaulPIvot).length === 4
        ).toBeTruthy();
        expect(
            getGlobalTetrominoVertices(I_type, 0, 1, defaulPIvot).map(
                item => item.length === 4
        )).toBeTruthy();
        expect(
            getGlobalTetrominoVertices(I_type, 0, 1, defaulPIvot).map(
                item => isPoint(item)
        )).toBeTruthy();
    });
});

