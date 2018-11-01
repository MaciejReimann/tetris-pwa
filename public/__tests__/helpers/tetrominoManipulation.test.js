const {
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoLocation,
} = require('../../scripts/helpers/tetrominoManipulation').test;
const {
    getGlobalTetrominoVertices
} = require('../../scripts/helpers/tetrominoManipulation');

const {
    isPoint,
    movePointOnY, 
    multiplyPoint,
    addTwoPoints,
} = require('../../scripts/helpers/pointHelpers');

const tetrominoStock = require('../../scripts/helpers/tetrominoCreation');
const I_tetromino = tetrominoStock.allTetrominos[1];

const defaulPIvot = { x: 0, y: 0 };
const movedPivotRight = { x: 1, y: 0 };
const movedPivotLeft = { x: -1, y: 0 };


describe("Tetromino manipulation", () => {
    const tetrominoMovedOneUp = I_tetromino.map(squareCenter => 
        movePointOnY(squareCenter, -1)).reverse();
    const tetrominoScaledBy_2 = I_tetromino.map(squareCenter => 
        multiplyPoint(squareCenter, 2));
    const tetrominoScaledBy_Half = I_tetromino.map(squareCenter => 
        multiplyPoint(squareCenter, .5));
    const tetrominoMovedByOneRight = I_tetromino.map(squareCenter => 
        addTwoPoints(squareCenter, movedPivotRight));
    const tetrominoMovedByOneLeft = I_tetromino.map(squareCenter => 
        addTwoPoints(squareCenter, movedPivotLeft));

    test('Tetromino rotation', () => {
        expect(rotateTetromino(I_tetromino, 360)).toEqual(I_tetromino);
        expect(rotateTetromino(I_tetromino, 0)).toEqual(I_tetromino);
        expect(rotateTetromino(I_tetromino, 180)).toEqual(tetrominoMovedOneUp);
    });
    test('Tetromino scaling', () => {
        expect(scaleTetromino(I_tetromino, 1)).toEqual(I_tetromino);
        expect(scaleTetromino(I_tetromino, 2)).toEqual(tetrominoScaledBy_2);
        expect(scaleTetromino(I_tetromino, .5)).toEqual(tetrominoScaledBy_Half);
    });
    test('Position tetromino', () => {
        expect(positionTetromino(I_tetromino, defaulPIvot)).toEqual(I_tetromino);
        expect(positionTetromino(I_tetromino, movedPivotRight)).toEqual(tetrominoMovedByOneRight);
        expect(positionTetromino(I_tetromino, movedPivotLeft)).toEqual(tetrominoMovedByOneLeft);
    });
    test('Position after manipulation', () => {
        expect(getGlobalTetrominoLocation(I_tetromino, 360, 1, defaulPIvot)).toEqual(I_tetromino);
        expect(getGlobalTetrominoLocation(I_tetromino, 0, 1, defaulPIvot)).toEqual(I_tetromino);
        expect(getGlobalTetrominoLocation(I_tetromino, 0, 2, defaulPIvot)).toEqual(tetrominoScaledBy_2);
        expect(getGlobalTetrominoLocation(I_tetromino, 180, 1, defaulPIvot)).toEqual(tetrominoMovedOneUp);
        expect(getGlobalTetrominoLocation(I_tetromino, 0, 1, movedPivotRight)).toEqual(tetrominoMovedByOneRight);
    });
});

describe("Tetromino vertices coordinates", () => {
    test('Right data format', () => {
        expect.anything(getGlobalTetrominoVertices(I_tetromino, 0, 1, defaulPIvot));
        expect(
            getGlobalTetrominoVertices(I_tetromino, 0, 1, defaulPIvot).length === 4
        ).toBeTruthy();
        expect(
            getGlobalTetrominoVertices(I_tetromino, 0, 1, defaulPIvot).map(
                item => item.length === 4
        )).toBeTruthy();
        expect(
            getGlobalTetrominoVertices(I_tetromino, 0, 1, defaulPIvot).map(
                item => isPoint(item)
        )).toBeTruthy();
    });
});

