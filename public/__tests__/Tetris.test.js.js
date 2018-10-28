// Testing tetris API
const tetris = require('../scripts/Tetris');

// Board default setup constants
const defaultBoard = {
    width: 10,
    height: 20,
    tempo: 1000,
    step: 1,
    startPoint: {x: 5, y: 0}
};

describe("Initial state for default setup", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;    
    beforeEach(() => {        
        tetris.init(width, height, tempo, step);
    });
    
    test("Width setup", () => {
        expect(tetris.getBoard().width).toBe(width)
    });
    test("Height setup", () => {
        expect(tetris.getBoard().height).toBe(height)
    });
    test("Tempo setup", () => {
        expect(tetris.getBoard().tempo).toBe(tempo)
    });
    test("Step setup", () => {
        expect(tetris.getBoard().step).toBe(step)
    });
    test("Startpoint setup", () => {
        expect(tetris.getBoard().startPoint).toEqual(startPoint)
    });
})

describe("Starting game", () => {
    test("Game status before start", () => {
        expect(tetris.getState().gameStarted).toBeFalsy();
    });
    test("Game status after start", () => {
        tetris.start();
        expect(tetris.getState().gameStarted).toBeTruthy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
    });
})

describe("Pivot positiion after next step", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;
    tetris.start();

    test("Pivot in the start point ", () => {
        expect(tetris.getState().pivot).toEqual(startPoint);
    })
    test("Pivot moved n times from start drops down by n * step", () => {
        tetris.start();
        let moveCounter = 1;  

        while (moveCounter < height) {        
            const movedPivot = {x: width / 2, y: moveCounter * step};
            tetris.nextStep(step);
            expect(tetris.getState().pivot).toEqual(movedPivot);            
            moveCounter ++;   
        };
    });
});


// test("Pivot moved from start n-height times, squares.length increments at height", () => {
//     let max = 20
//     let nCounter = 1
//     let moveCounter = 1;
//     tetris.start();
//     while (moveCounter < height * max) {
//         let squaresCounterBeforeMove = tetris.getState().squares.length;
//         tetris.moveDown(1);
//         let squaresCounterAfterMove = tetris.getState().squares.length;
//         if(tetris.getState().pivot.y === height) {            
//             expect(squaresCounterAfterMove - squaresCounterBeforeMove).toBe(1)
//             expect(squaresCounterAfterMove).toBe(nCounter)
//             nCounter ++
//         }
//         moveCounter ++;
        
//     }
//     console.log(nCounter) 
// })

// const sumArProgression = (n, a1, an) => n * (a1 + an) / 2;

// test("Game over", () => {
//     const endCounter = sumArProgression(height + 1, height, 0)
//     let max = 100;
//     let moveCounter = 0;
//     tetris.start();
//     do {
//         tetris.moveDown(1);
//         if (tetris.getStatus() === "Game over") {
//             expect(tetris.getState().squares.length).toBe(height)
//             expect(moveCounter + 1).toBe(endCounter)
//             break //209
//         }
//         moveCounter ++;
//     } while (moveCounter < height * max)
// })

// test("Game over one move after board is full", () => {
//     let max = 100;
//     let moveCounter = 0;
//     tetris.start();
//     do {
//         tetris.moveDown(1);
//         if(tetris.getState().squares.length === height) {
//             tetris.moveDown(1);
//             expect(tetris.getStatus()).toEqual("Game over")
//             break
//         }
//         moveCounter ++;
//     } while (moveCounter < height * max)
// })


// test('test game over after some time has passed', done => {
//     let timer = 0;
//     const tempo = 1000;
//     tetris.start();
//     expect(tetris.getStatus()).toEqual("Game started");
//     setInterval( 
//         () => {
//             timer ++
//             if (timer === 210) {
//                 expect(tetris.getStatus()).toEqual("Game over");
//                 done();
//             }
//         },
//         tempo 
//     );
// })


