// Testing tetris API
const tetris = require('../scripts/Tetris');

const { clone } = require('../scripts/helpers/arrayHelpers');
const { movePointOnY } = require('../scripts/helpers/pointHelpers');

// Board default setup constants
const defaultBoard = {
    width: 6,
    height: 20,
    tempo: 1,
    step: 1,
    startPoint: {x: 3, y: 0},
    stockLength: 3
};

describe("Initial state for default setup", () => {
    const { width, height, tempo, step, startPoint, stockLength } = defaultBoard;    
    beforeEach(() => {        
        tetris.init(width, height, tempo, step, stockLength);
    });    
    test("Board setup", () => {
        expect(tetris.getBoard().width).toBe(width * step);
        expect(tetris.getBoard().height).toBe(height * step);
        expect(tetris.getBoard().tempo).toBe(tempo);
        expect(tetris.getBoard().step).toBe(step);
        expect(tetris.getBoard().startPoint).toEqual(startPoint);
        expect(tetris.getBoard().stockLength).toBe(stockLength);
    });
    test("State setup", () => {
        expect(tetris.getState().gameStarted).toBeFalsy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
        expect(tetris.getState().tetrominoStock.length).toBe(stockLength);
        expect(tetris.getState().pivotLocation).toEqual(startPoint);
        expect(tetris.getState().tetrominoType).toEqual([]);
        expect(tetris.getState().tetrominoSquares).toEqual([]);
        expect(tetris.getState().stackedSquares).toEqual([]);
    });
});

describe("Starting game", () => {
    const { width, height, tempo, step, startPoint, stockLength } = defaultBoard;
    beforeEach(() => {
        tetris.init(width, height, tempo, step, stockLength);
    });

    test("Game status before and after start", () => {
        expect(tetris.getState().gameStarted).toBeFalsy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
        tetris.start();
        expect(tetris.getState().gameStarted).toBeTruthy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
    });
    test("First tetromino took from stock and stock replenished", () => {
        // It has to be cloned, otherwise only the reference is stored and 
        // not the actual array;
        const stockBeforeStart = clone( tetris.getState().tetrominoStock );
        tetris.start();
        expect(tetris.getState().tetrominoType.name).toEqual(stockBeforeStart[0].name);
        // expect(tetris.getState().tetrominoStock[0]).toEqual(stockBeforeStart[1]);
        // expect(tetris.getState().tetrominoStock[1]).toEqual(stockBeforeStart[2]);
    });
    test("Nextstep() fired at given interval", () => {
        jest.useFakeTimers();
        let moveCounter = 1;
        tetris.start();
        while (true) {
            const movedPivot = {x: width / 2, y: moveCounter * step};
            jest.advanceTimersByTime(tempo);
            if(moveCounter === height) {
                expect(tetris.getState().pivotLocation).toEqual(startPoint);
                jest.clearAllTimers()
                break;
            };
            moveCounter ++;
            expect(tetris.getState().pivotLocation).toEqual(movedPivot);            
        };
    });
});

describe("Pivot location changes, tetromino laying flat", () => {
    const { width, height, tempo, step, startPoint, stockLength } = defaultBoard;
    beforeEach(() => {
        tetris.init(width, height, tempo, step, stockLength);
    });
    
    test("1st round: moving down n-times moves it by n*step, back to start when n=height", () => {
        let moveCounter = 1;
        tetris.start();
        expect(tetris.getState().pivotLocation).toEqual(startPoint);
        while (true) {
            const movedPivot = {x: width / 2, y: moveCounter * step};
            tetris.nextStep();           
            if(moveCounter === height) {
                expect(tetris.getState().pivotLocation).toEqual(startPoint);
                break;
            };
            moveCounter ++;
            expect(tetris.getState().pivotLocation).toEqual(movedPivot);
        };
    });
    test("2nd round: moving down n-times moves it by n*step, back to start when n=height", () => {
        let moveCounter = 1;
        tetris.overrideToTest(3,2);
        console.log(tetris.getState())
        expect(tetris.getState().pivotLocation).toEqual(startPoint);
        while (true) {
            let movedPivot = {x: width / 2, y: moveCounter * step};
            tetris.nextStep();
            if(moveCounter === 1 * height) {
                expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));

            };
            if(moveCounter === 2 * height) {
                expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));
                break;
            };
            moveCounter ++;
            // expect(tetris.getState().pivotLocation).toEqual(movedPivot);
        };
    });
});

// test("Pivot starts back from 0, stackedSquares increment by one", () => {
//     const { width, height, tempo, step, stockLength } = defaultBoard; 
//     let stackCounter = 1;
//     let moveCounter = 1;

//     beforeEach(() => {        
//         tetris.init(width, height, tempo, step, stockLength);
//         tetris.start();
//     });

//     while (moveCounter < height * height) {
//         tetris.nextStep();

//         if (tetris.getState().pivotLocation.y === 0) {
//             stackCounter ++;
//             expect(tetris.getState().stackedSquares.length).toEqual(stackCounter);            
//         };
//         moveCounter ++;
//     };
// });

// test("Game over when next-step-counter + 1 reach the sum of arithmetic progression", () => {
//     const { width, height, tempo, step, stockLength } = defaultBoard; 
//     const sumArProgression = (n, a1, an) => n * (a1 + an) / 2;
//     const endCounter = sumArProgression(height + 1, height, 0);
//     let moveCounter = 1;

//     tetris.init(width, height, tempo, step, stockLength);
//     tetris.start();

//     while (moveCounter < height * height) {
//         tetris.nextStep();

//         if (tetris.getState().gameIsOver) {        
//             expect(tetris.getState().stackedSquares.length).toBe(height - 1);
//             expect(moveCounter + 1).toBe(endCounter);
//             break;
//         };
//         moveCounter ++;
//     };
// });


