
// Testing tetris API
const tetris = require('../scripts/Tetris');

const width = 10;
const height = 20;
const tempo = 1;
const startPivot = {x: width / 2, y: 0};

// getState() and setUp()
tetris.setUp(width, height, tempo);

test("Width setup", () => {    
    expect(tetris.getState().board.width).toBe(width)
})
test("Height setup", () => {    
    expect(tetris.getState().board.height).toBe(height)
})
test("Tempo setup", () => {    
    expect(tetris.getState().board.tempo).toBe(tempo)
})
test("Startpoint setup", () => {    
    expect(tetris.getState().board.startPivot).toEqual(startPivot)
})

// start()
test("Game status before start", () => {
    expect(tetris.getState().gameStarted).toBeFalsy()
})
test("Game status after start", () => {
    tetris.start()  
    expect(tetris.getState().gameStarted).toBeTruthy()
})
test("Game status after start", () => {
    expect(tetris.getState().gameStarted).toBeTruthy()
})

// moveDown()

test("Pivot moved from start", () => {
    tetris.moveDown()
    const movedPivot = {x: width / 2, y: 0};
    expect(tetris.getState().pivot).toEqual(movedPivot)
    expect(tetris.getState().board.startPivot).toEqual(startPivot)
})
test("Pivot moved 2nd time", () => {
    tetris.moveDown()
    const movedPivot = {x: width / 2, y: 1};
    expect(tetris.getState().pivot).toEqual(movedPivot)
    expect(tetris.getState().board.startPivot).toEqual(startPivot)
})
test("Pivot moved 4th time", () => {
    tetris.moveDown()
    tetris.moveDown()
    const movedPivot = {x: width / 2, y: 3};
    expect(tetris.getState().pivot).toEqual(movedPivot)
    expect(tetris.getState().board.startPivot).toEqual(startPivot)
})