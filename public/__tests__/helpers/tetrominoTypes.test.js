const tetrominoTypes = require('../../scripts/helpers/tetrominoTypes');

test('Black color palette', () => {
    const blackTypes = tetrominoTypes("black");
    expect(tetrominoTypes("classic")).toHaveLength(7);
    for(let i = 0; i < blackTypes.length - 1; i ++) {
        for(let j = 0; j < blackTypes[i].length - 1; j ++) {
            expect(blackTypes[i][j]).toHaveProperty("x");
            expect(blackTypes[i][j]).toHaveProperty("y");
            expect(blackTypes[i][j]["prop"]).toHaveProperty("name");
            expect(blackTypes[i][j]["prop"]).toHaveProperty("color");
            expect(blackTypes[i][j]["prop"]["color"]).toEqual("black");
        };
    };
});

test('Classic color palette', () => {
    const classicTypes = tetrominoTypes("classic");
    expect(tetrominoTypes("classic")).toHaveLength(7);
    for(let i = 0; i < classicTypes.length - 1; i ++) {
        for(let j = 0; j < classicTypes[i].length - 1; j ++) {
            expect(classicTypes[i][j]).toHaveProperty("x");
            expect(classicTypes[i][j]).toHaveProperty("y");
            expect(classicTypes[i][j]["prop"]).toHaveProperty("name");
            expect(classicTypes[i][j]["prop"]).toHaveProperty("color");
        };
    };
});