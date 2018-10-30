// Testing tetris API
const tetris = require('../scripts/Tetris');

// Board default setup constants
const defaultBoard = {
    width: 6,
    height: 6,
    tempo: 1,
    step: 1,
    startPoint: {x: 3, y: 0}
};


describe("Initial state for default setup", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;    
    beforeEach(() => {        
        tetris.init(width, height, tempo, step);
    });
    
    test("Width setup", () => {
        expect(tetris.getBoard().width).toBe(width * step)
    });
    test("Height setup", () => {
        expect(tetris.getBoard().height).toBe(height * step)
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
    const { width, height, tempo, step, startPoint } = defaultBoard;
    beforeEach(() => {
        tetris.init(width, height, tempo, step);
    });
    
    test("Game status before start", () => {
        expect(tetris.getState().gameStarted).toBeFalsy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
    });
    test("Game status after start", () => {
        tetris.start();
        expect(tetris.getState().gameStarted).toBeTruthy();
        expect(tetris.getState().gameIsOver).toBeFalsy();
    });
    test("Pivot location dropped down one step per tempo", () => {
        jest.useFakeTimers();        
        let timer = 0;
        let moveCounter = 0;
        tetris.start();
        while (timer < height) {
            const movedPivot = {x: width / 2, y: step * timer};
            expect(tetris.getState().pivotLocation).toEqual(movedPivot);
            jest.advanceTimersByTime(tempo);            
            timer ++;
        };
    });
})

describe("Pivot position after next step", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;
    beforeEach(() => {        
        tetris.init(width, height, tempo, step);
        tetris.start();
    });
    
    test("Pivot in the start point ", () => {
        expect(tetris.getState().pivotLocation).toEqual(startPoint);
    })
    test("Pivot moved down n-times from start moves down by n * step", () => {  
        tetris.start();      
        let moveCounter = 1;
        while (moveCounter <= height - 1) {
            const movedPivot = {x: width / 2, y: moveCounter * step};
            tetris.nextStep();
            expect(tetris.getState().pivotLocation).toEqual(movedPivot);
            moveCounter ++;
        };
    });   
    test("Pivot back to start point when moved down height times", () => {
        let moveCounter = 1;
        while (moveCounter <= height) {
            tetris.nextStep();
            if(moveCounter === height) {                
                expect(tetris.getState().pivotLocation).toEqual(startPoint);
            };
            moveCounter ++;
        };
    });
});

test("Pivot starts back from 0, stackedSquares increment by one", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;
    let stackCounter = 1;
    let moveCounter = 1;

    beforeEach(() => {        
        tetris.init(width, height, tempo, step);
        tetris.start();
    });

    while (moveCounter < height * height) {
        tetris.nextStep(step);

        if (tetris.getState().pivotLocation.y === 0) {
            stackCounter ++;
            expect(tetris.getState().stackedSquares.length).toEqual(stackCounter);            
        };
        moveCounter ++;
    };
});

test("Game over when next-step-counter + 1 reach the sum of arithmetic progression", () => {
    const { width, height, tempo, step, startPoint } = defaultBoard;
    const sumArProgression = (n, a1, an) => n * (a1 + an) / 2;
    const endCounter = sumArProgression(height + 1, height, 0);
    let moveCounter = 1;

    tetris.init(width, height, tempo, step);
    tetris.start();

    while (moveCounter < height * height) {
        tetris.nextStep();

        if (tetris.getState().gameIsOver) {        
            expect(tetris.getState().stackedSquares.length).toBe(height - 1);
            expect(moveCounter + 1).toBe(endCounter);
            break;
        };
        moveCounter ++;
    };
});


