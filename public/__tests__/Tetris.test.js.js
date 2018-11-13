//Testing tetris API
const tetris = require('../scripts/Tetris');
const { clone } = require('../scripts/helpers/arrayHelpers');
const { 
    movePointOnY,
    movePointOnX
 } = require('../scripts/helpers/pointHelpers');
 const { 
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
 } = require('../scripts/helpers/tetrominoManipulation');
const setupGameboard = require('../scripts/helpers/setupGameboard');

// Board default setup constants
const 
    width = 10,
    height = 20,
    pixel = 2,
    tempo = 1000,  
    startPoint = {x: width * pixel / 2, y: 0},
    stockLength = 3;


describe("First moves and turns of random tetromino", () => {    
    for (let i = 0; i < 100; i ++) {
        const initialState = setupGameboard(width, height, pixel, tempo, stockLength);    
    
        test("First tetromino took from stock and stock replenished", () => {
            // It has to be cloned, otherwise only the reference is stored and 
            // not the actual array;
            const stockBeforeStart = clone( initialState.stock.getCurrent() );
            const gameState = tetris(initialState, 'MOVE DOWN');
            expect(gameState.type.name).toEqual(stockBeforeStart[0].name);
            expect(gameState.stock.getCurrent()[0]).toEqual(stockBeforeStart[1]);
            expect(gameState.stock.getCurrent()[1]).toEqual(stockBeforeStart[2]);
        });
        test("Game state after first move down", () => {     
            let gameState = tetris(initialState, 'MOVE DOWN');
            expect(gameState.width).toBe(width * pixel);
            expect(gameState.height).toBe(height * pixel);
            expect(gameState.pixel).toBe(pixel);       
            expect(gameState.start).toEqual(startPoint);
            expect(gameState.gameIsOver).toBeFalsy();
            expect(gameState.stock.getCurrent().length).toBe(stockLength);
            expect(gameState.pivot).toEqual(movePointOnY(startPoint, pixel));        
            expect(gameState.angle).toBe(0);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down and 1 right", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE RIGHT');
            expect(gameState.pivot).toEqual(
                movePointOnX( movePointOnY(startPoint, 2 * pixel), pixel )
            );
            expect(gameState.angle).toBe(0);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down and 1 left", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE LEFT');
            expect(gameState.pivot).toEqual(
                movePointOnX( movePointOnY(startPoint, 2 * pixel), -pixel )
            )
            expect(gameState.angle).toBe(0);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down, 1 left and 1 right", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE LEFT');
            gameState = tetris(gameState, 'MOVE RIGHT');
            expect(gameState.stock.getCurrent().length).toBe(stockLength);
            expect(gameState.pivot).toEqual(movePointOnY(startPoint, 2 * pixel));
            expect(gameState.angle).toBe(0);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down and 1 turn left", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'TURN LEFT');
            expect(gameState.stock.getCurrent().length).toBe(stockLength);
            expect(gameState.pivot).toEqual(
                movePointOnY(movePointOnY(startPoint, pixel), pixel)
            );
            expect(gameState.angle).toBe(-90);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down and 1 turn right", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'TURN RIGHT');
            expect(gameState.stock.getCurrent().length).toBe(stockLength);
            expect(gameState.pivot).toEqual(
                movePointOnY(movePointOnY(startPoint, pixel), pixel)
            );
            expect(gameState.angle).toBe(90);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
        test("Game state after first 2 moves down and 1 turn right and 1 left", () => {
            let gameState = tetris(initialState, 'MOVE DOWN');
            gameState = tetris(gameState, 'MOVE DOWN');
            gameState = tetris(gameState, 'TURN RIGHT');
            gameState = tetris(gameState, 'TURN LEFT');
            expect(gameState.stock.getCurrent().length).toBe(stockLength);
            expect(gameState.pivot).toEqual(
                movePointOnY(movePointOnY(startPoint, pixel), pixel)
            );
            expect(gameState.angle).toBe(0);
            expect(gameState.squares).toEqual([]);
            expect(gameState.vertices).toEqual(
                getGlobalTetrominoVertices(
                    gameState.type.centers,
                    gameState.angle,
                    gameState.pixel,
                    gameState.pivot
            ));          
        });
    };
});

describe("Moves down by one pixel, goes back to start when hits the bottom", () => {
    test("Tetris height = 1", () => {
        const initialState = setupGameboard(width, height, pixel, tempo, stockLength, 1);     
        let moveCounter = 1;
        let gameState = tetris(initialState, 'MOVE DOWN');
        while (true) {
            moveCounter ++;
            const movedPivot = {x: width * pixel / 2, y: moveCounter * pixel};
            gameState = tetris(gameState, 'MOVE DOWN');
            if(moveCounter === height) { //YOU'VE GOT TO SCALE THE MOVE IN TETRIS!!!
                expect(gameState.pivot).toEqual(startPoint);
                break;
            };
            expect(gameState.pivot).toEqual(movedPivot);            
        };
    });
});

// describe("What happens when tetromino hits sides", () => {
//     const { width, height, tempo, pixel, startPoint, stockLength } = defaultBoard; 

//     test("Tetris height = 1 goes right", () => {
//         const initialState = setupGameboard(width, height, pixel, tempo, stockLength, 1);     
//         let moveCounter = 1;
//         // Move down two times to be able to turn it vertically;
//         let gameState = tetris(initialState, 'MOVE DOWN');
//         gameState = tetris(gameState, 'MOVE DOWN');
//         // Turn the I_tetromino vertically with the pivot on the right;
//         gameState = tetris(gameState, 'TURN LEFT');
//         let pivotLocation;
//         while (true) {
//             moveCounter ++;
//             gameState = tetris(gameState, 'MOVE RIGHT');
//             if(moveCounter === (width / pixel) - (startPoint.x / pixel)) {
//                 pivotLocation = gameState.pivot
//             } else if(moveCounter === width / 2 + 2) {
//                 expect(gameState.pivot).toEqual(pivotLocation);
//                 break;
//             };
//             // expect(gameState.pivot).toEqual(movedPivot);            
//         };
//     });
// });

// describe("What happens when tetromino hits the bottom for the first time", () => {
//     const { width, height, tempo, pixel, startPoint, stockLength } = defaultBoard;

//     test("First tetromino took from stock and stock replenished", () => {
//         const initialState = setupGameboard(width, height, pixel, tempo, stockLength);
//         let gameState = tetris(initialState, 'MOVE DOWN');
//         const stockJustAfterStart = clone( gameState.stock.getCurrent() );
//         let moveCounter = 1;
//         while (true) {
//             moveCounter ++;
//             gameState = tetris(gameState, 'MOVE DOWN');
//             if(moveCounter === height) {
//                 expect(gameState.type).toEqual(stockJustAfterStart[0]);
//                 expect(gameState.stock.getCurrent()[0]).toEqual(stockJustAfterStart[1]);
//                 expect(gameState.stock.getCurrent()[1]).toEqual(stockJustAfterStart[2]);
//                 break;
//             };
//             expect(gameState.stock.getCurrent()[0]).toEqual(stockJustAfterStart[0]);
//             expect(gameState.stock.getCurrent()[1]).toEqual(stockJustAfterStart[1]);
//             expect(gameState.stock.getCurrent()[2]).toEqual(stockJustAfterStart[2]);     
//         };
//     });
//     test("First tetromino saved into gameState.squares", () => {
//         const initialState = setupGameboard(width, height, pixel, tempo, stockLength);
//         let gameState = tetris(initialState, 'MOVE DOWN');
//         const firstTetrominoName = clone( gameState.type.name );
//         let moveCounter = 1;
//         let type, angle, pivot;
//         while (true) {
//             moveCounter ++;
//             gameState = tetris(gameState, 'MOVE DOWN');            
//             if(moveCounter === (height - pixel) / pixel) {
//                 type  = gameState.type;
//                 angle = gameState.angle;
//                 pivot = gameState.pivot;
//             }
//             if(moveCounter === height / pixel) {
//                 expect(gameState.squares.length).toBe(4);
//                 expect(gameState.squares).toEqual(
//                     getGlobalTetrominoCenters(type.centers, angle, pixel, pivot)
//                 );
//                 break;
//             };
//             expect(gameState.type.name).toEqual(firstTetrominoName);            
//         };
//     });
// });

    // test("2nd round: moving down n-times moves it by n*step, back to start when n=height", () => {
    //     let moveCounter = 1;
    //     tetris.overrideToTest(3,2);        
    //     expect(tetris.getState().pivotLocation).toEqual(startPoint);
    //     while (true) {
    //         let movedPivot = {x: width / 2, y: moveCounter * step};
    //         tetris.nextStep();
    //         // if(moveCounter === 1 * height) {
                
    //         //     expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));
    //         //     // break
    //         // };
    //         if(moveCounter === 1 * height - 5) {
    //             console.log(tetris.getState())
    //             expect(tetris.getState().pivotLocation).toEqual(movePointOnY(startPoint, 0));
    //             break;
    //         };
    //         moveCounter ++;
    //         // expect(tetris.getState().pivotLocation).toEqual(movedPivot);
    //     };
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


