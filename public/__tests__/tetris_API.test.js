const gameBoard = require('../scripts/gameBoard');
const tetris = require('../scripts/tetrisAPI')(gameBoard, testCallback);

function testCallback() {
};

const gameBoardSetupCheck = {
    width: 10,
    height: 20,
    pixel: 10,
    tempo: 1000,
    stockLength: 3
};

test("Check current default setup", () => {
    expect(gameBoard).toEqual(gameBoardSetupCheck);
});

// test("Nextstep() fired at given interval", () => {
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