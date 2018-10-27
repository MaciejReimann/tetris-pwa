
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

Array(height).fill().map((_, i) => 
    test("Pivot moved from start height-1 times", () => {
        tetris.start();
        const movedPivot = {x: width / 2, y: i};
        expect(tetris.moveDown(1).pivot).toEqual(movedPivot)
        expect(tetris.getState().board.startPivot).toEqual(startPivot)
        expect(tetris.getStatus()).toEqual("Moved down")
    })
)
test("Pivot moved height times should give start point", () => {  
    tetris.start();  
    expect(tetris.moveDown(height).pivot).toEqual(startPivot)
    expect(tetris.getStatus()).toEqual("Moved down")
})
test("Pivot moved height times + 1 should give one down from start point", () => {
    const oneDown = {x: width / 2, y: 1};
    tetris.start();
    tetris.moveDown(height-1)    
    tetris.moveDown(1)    
    tetris.moveDown(1)
    expect(tetris.getState().pivot).toEqual(oneDown)
    expect(tetris.getStatus()).toEqual("Moved down")
})


// test("Pivot moved N height times should give N down from start point", () => {
//     const twoDown = {x: width / 2, y: 2};
//     tetris.moveDown(height)
//     tetris.moveDown(height)
//     expect(tetris.getState().pivot).toEqual(twoDown)
// })
