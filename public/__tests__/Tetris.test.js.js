//Testing tetris API
const tetris = require('../scripts/Tetris');
const { clone } = require('../scripts/helpers/arrayHelpers');
const { movePointOnY } = require('../scripts/helpers/pointHelpers');
const setInitialState = require('../scripts/helpers/setInitialState');

// Board default setup constants
const defaultBoard = {
    width: 10,
    height: 20,
    pixel: 1,
    tempo: 1000,  
    startPoint: {x: 5, y: 0},
    stockLength: 3
};
test("", () => {
    expect(2).toBe(2)
})


describe("First moves and turns", () => {    
    const { width, height, tempo, pixel, startPoint, stockLength } = defaultBoard; 
    const initialState = setInitialState(width, height, pixel, tempo, stockLength);
    
    test("Game state after first move down", () => {
        gameState = tetris(initialState, 'MOVE DOWN');
        expect(gameState.width).toBe(width * pixel);
        expect(gameState.height).toBe(height * pixel);
        expect(gameState.pixel).toBe(pixel);       
        expect(gameState.start).toEqual(startPoint);
        expect(gameState.gameIsOver).toBeFalsy();
        expect(gameState.stock.length).toBe(stockLength);
        expect(gameState.pivot).toEqual(movePointOnY(startPoint, pixel));        
        expect(gameState.angle).toBe(0);
        expect(gameState.squares).toEqual([]);        
    });
});

// describe("Game state on move down", () => {    
//     const { width, height, tempo, pixel, startPoint, stockLength } = defaultBoard; 
//     let gameState;
//     beforeEach(() => {        
//         const initialState = setInitialState(width, height, pixel, tempo, stockLength);
//         gameState = tetris(initialState, "START");
//     });    
//     test("Move down", () => {
//         gameState = tetris(gameState, "MOVE DOWN");
//         expect(gameState.pivot).toEqual(movePointOnY(startPoint, pixel))
//     });
// });

// describe("Starting game", () => {
//     const { width, height, tempo, step, startPoint, stockLength } = defaultBoard;
//     beforeEach(() => {
//         tetris.init(width, height, tempo, step, stockLength);
//     });

//     test("Game status before and after start", () => {
//         expect(tetris.getState().gameStarted).toBeFalsy();
//         expect(tetris.getState().gameIsOver).toBeFalsy();
//         tetris.start();
//         expect(tetris.getState().gameStarted).toBeTruthy();
//         expect(tetris.getState().gameIsOver).toBeFalsy();
//     });
//     test("First tetromino took from stock and stock replenished", () => {
//         // It has to be cloned, otherwise only the reference is stored and 
//         // not the actual array;
//         const stockBeforeStart = clone( tetris.getState().tetrominoStock );
//         tetris.start();
//         expect(tetris.getState().tetrominoType.name).toEqual(stockBeforeStart[0].name);
//         // expect(tetris.getState().tetrominoStock[0]).toEqual(stockBeforeStart[1]);
//         // expect(tetris.getState().tetrominoStock[1]).toEqual(stockBeforeStart[2]);
//     });
//     test("Nextstep() fired at given interval", () => {
//         jest.useFakeTimers();
//         let moveCounter = 1;
//         tetris.start();
//         while (true) {
//             const movedPivot = {x: width / 2, y: moveCounter * step};
//             jest.advanceTimersByTime(tempo);
//             if(moveCounter === height) {
//                 expect(tetris.getState().pivotLocation).toEqual(startPoint);
//                 jest.clearAllTimers()
//                 break;
//             };
//             moveCounter ++;
//             expect(tetris.getState().pivotLocation).toEqual(movedPivot);            
//         };
//     });
// });

// describe("Pivot location changes, tetromino laying flat", () => {
//     const { width, height, tempo, step, startPoint, stockLength } = defaultBoard;
//     beforeEach(() => {
//         tetris.init(width, height, tempo, step, stockLength);
//     });
//     test("1st round: moving down one time moves it by one", () => {
//         tetris.start();
//         expect(tetris.getState().pivotLocation).toEqual(startPoint);
//         tetris.nextStep(); 
//         expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 1));
//         tetris.nextStep(); 
//         expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 2));
//     });
    
//     test("1st round: moving down n-times moves it by n*step, back to start when n=height", () => {
//         let moveCounter = 1;
//         tetris.start();
//         expect(tetris.getState().pivotLocation).toEqual(startPoint);
//         while (true) {
//             const movedPivot = {x: width / 2, y: moveCounter * step};
//             tetris.nextStep();           
//             if(moveCounter === height) {
//                 expect(tetris.getState().pivotLocation).toEqual(startPoint);
//                 break;
//             };
//             moveCounter ++;
//             expect(tetris.getState().pivotLocation).toEqual(movedPivot);
//         };
//     });
//     test("2nd round: moving down n-times moves it by n*step, back to start when n=height", () => {
//         let moveCounter = 1;
//         tetris.overrideToTest(3,2);        
//         expect(tetris.getState().pivotLocation).toEqual(startPoint);
//         while (true) {
//             let movedPivot = {x: width / 2, y: moveCounter * step};
//             tetris.nextStep();
//             // if(moveCounter === 1 * height) {
                
//             //     expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));
//             //     // break
//             // };
//             if(moveCounter === 1 * height - 5) {
//                 console.log(tetris.getState())
//                 expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));
//                 break;
//             };
//             moveCounter ++;
//             // expect(tetris.getState().pivotLocation).toEqual(movedPivot);
//         };
//     });
// });

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


