
// Testing tetris API
const tetris = require('../scripts/Tetris');

// Board setup constants
const width = 10;
const height = 20;
const tempo = 1;
const startPoint = {x: width / 2, y: 0};

// getState() and setUp()
tetris.setUp(width, height, tempo);

test("Width setup", () => {    
    expect(tetris.getBoard().width).toBe(width)
})
test("Height setup", () => {    
    expect(tetris.getBoard().height).toBe(height)
})
test("Tempo setup", () => {    
    expect(tetris.getBoard().tempo).toBe(tempo)
})
test("Startpoint setup", () => {    
    expect(tetris.getBoard().startPoint).toEqual(startPoint)
})

// start()
test("Game status before start", () => {
    expect(tetris.getState().gameStarted).toBeFalsy()
})
test("Game status after start", () => {
    tetris.start()  
    expect(tetris.getState().gameStarted).toBeTruthy()
})

// moveDown()
test("Pivot moved from start height-1 times", () => {
    tetris.start();
    Array(height).fill().map((_, i) => {
        const movedPivot = {x: width / 2, y: i};
        tetris.moveDown(1)
        console.log(tetris.getState())
        expect(tetris.getState().pivot).toEqual(movedPivot)
        expect(tetris.getBoard().startPoint).toEqual(startPoint)
        expect(tetris.getStatus()).toEqual("Moved down")
        i < height -1 
            ? expect(tetris.getState().squares.length).toBe(0)
            : expect(tetris.getState().squares.length).toBe(1)
    })
})

// test("Pivot moved height - 1 times should give start point", () => {  
//     tetris.start();
//     tetris.moveDown(height-1);
//     // tetris.moveDown(1);
//     console.log(tetris.getState())
//     expect(tetris.getState().pivot).toEqual(startPoint)
//     expect(tetris.getStatus()).toEqual("Moved down")
// })
// test("Pivot moved height times + 1 should give one down from start point", () => {
//     const oneDown = {x: width / 2, y: 1};
//     tetris.start();
//     tetris.moveDown(height)
//     console.log(tetris.getState())   
//     // tetris.moveDown(1)
//     // tetris.moveDown(1)
//     expect(tetris.getState().pivot).toEqual(oneDown)
//     expect(tetris.getStatus()).toEqual("Moved down")
// })

// test("Pivot moved height times should give one element in state.squares", () => {  
//     tetris.start();
//     tetris.moveDown(height-2);
//     console.log(tetris.state)
//     // tetris.moveDown(1);
//     // tetris.moveDown(1);
//     expect(tetris.getState().squares.length).toBe(1)
// })
// test("Pivot moved 2 height times should give one element in state.squares", () => {  
//     tetris.start();
//     tetris.moveDown(height-1);
//     tetris.moveDown(1);
//     tetris.moveDown(height-1);
//     tetris.moveDown(1);
//     expect(tetris.getState().squares.length).toBe(2)
// })


// test("Pivot moved N height times should give N down from start point", () => {
//     const twoDown = {x: width / 2, y: 2};
//     tetris.moveDown(height)
//     tetris.moveDown(height)
//     expect(tetris.getState().pivot).toEqual(twoDown)
// })
