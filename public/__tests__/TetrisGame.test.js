const TetrisGame = require('../scripts/TetrisGame');

const width = 6;
const height = 10;

test("gettin' heigh", () => {
    const tetris = new TetrisGame(width, height);
    expect(tetris.getHeight()).toBe(10)
})