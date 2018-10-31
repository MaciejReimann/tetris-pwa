const { 
    getParallelSquareVertices,
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
} = require('../../scripts/helpers/tetrominoManipulation');

const tetrominoStock = require('../../scripts/helpers/tetrominoCreation');

const defaultAngle = 0;
const defaultCenter = { x: 0, y: 0 };

describe("Initial state for default setup", () => {
    const randomTetris = tetrominoStock.build(1)[0];
    const angle = defaultAngle;
    const center = defaultCenter;
    const dim = 2;
    const parallelSquareVertices = [
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 }
    ];

    test("A parallel square", () => {
        expect(getParallelSquareVertices(angle, center, dim))
            .toEqual(parallelSquareVertices)
    });
})
