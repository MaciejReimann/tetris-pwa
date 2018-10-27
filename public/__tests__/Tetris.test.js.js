
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
test("Pivot moved from start n times", () => {
    let moveCounter = 0;
    tetris.start();
    do {        
        if(moveCounter === 0) {
            expect(tetris.getStatus()).toEqual("Game started");
            expect(tetris.getState().pivot).toEqual(startPoint);
        } else {
            const movedPivot = {x: width / 2, y: moveCounter};
            tetris.moveDown(1);
            expect(tetris.getStatus()).toEqual("Moved down");
            expect(tetris.getState().pivot).toEqual(movedPivot);            
        }        
        moveCounter ++;   
    } while (moveCounter < height)
})

test("Pivot moved from start n-height times, squares.length increments at height -1", () => {
    let max = 20
    let nCounter = 1
    let moveCounter = 1;
    tetris.start();
    do {
        let squaresCounterBeforeMove = tetris.getState().squares.length;
        tetris.moveDown(1);
        let squaresCounterAfterMove = tetris.getState().squares.length;
        if(tetris.getState().pivot.y === height - 1) {            
            expect(squaresCounterAfterMove - squaresCounterBeforeMove).toBe(1)
            expect(squaresCounterAfterMove).toBe(nCounter)
            nCounter++
        }
        moveCounter ++;   
    } while (moveCounter < height * max)
})

const sumArProgression = (n, a1, an) => n * (a1 + an) / 2;

test("Game over", () => {
    const endCounter = sumArProgression(height + 1, height, 0)
    let max = 100;
    let moveCounter = 0;
    tetris.start();
    do {
        tetris.moveDown(1);
        if (tetris.getStatus() === "Game over") {
            expect(tetris.getState().squares.length).toBe(height)
            expect(moveCounter + 1).toBe(endCounter)
            console.log(moveCounter)
            break //209
        }
        moveCounter ++;
    } while (moveCounter < height * max)
})

test("Game over one move after board is full", () => {
    let max = 100;
    let moveCounter = 0;
    tetris.start();
    do {
        tetris.moveDown(1);
        if(tetris.getState().squares.length === height) {
            tetris.moveDown(1);
            expect(tetris.getStatus()).toEqual("Game over")
            break
        }
        moveCounter ++;
    } while (moveCounter < height * max)
})


