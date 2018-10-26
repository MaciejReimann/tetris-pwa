
// Testing tetris API
const tetris = require('../scripts/Tetris');

const width = 10;
const height = 20;
const tempo = 1;

// getState() and setUp()
tetris.setUp(width, height, tempo);

test("Width Setup", () => {    
    expect(tetris.getState().board.width).toBe(width)
})
test("Height Setup", () => {    
    expect(tetris.getState().board.height).toBe(height)
})
test("Tempo Setup", () => {    
    expect(tetris.getState().board.tempo).toBe(tempo)
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