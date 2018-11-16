(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Configuration data passed to setupGameboard() in tetris_API;

module.exports = {
    width: 10,
    height: 20,
    pixel: 10,
    tempo: 1000,
    stockLength: 3,
    tetrominoHeight: "random",
    colorPalette: "classic"
};

},{}],2:[function(require,module,exports){


function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
};
  
function createAndPopulateArray(length, callback) {
    return Array(length).fill().map(() => callback());
};

function clone(array) {
    return array.slice(0, array.length);
};

function carouselArray(array, m) {
    const n = m % array.length;
    return n >= 0
        ? array.slice(n, array.length).concat(array.slice(0, n))
        : array.slice(array.length + n, array.length).concat(array.slice(0, array.length + n))
};

function flattenArray(array) {
    return [].concat.apply([], array);
};

function concatIfDoesntInclude(array, newItem) {
    if(array.every(item => item !== newItem)) {
        array = array.concat(newItem)
    };
    return array;
};

module.exports = {
    getRandomArrayItem,
    createAndPopulateArray,
    clone,
    carouselArray,
    flattenArray,
    concatIfDoesntInclude
}
},{}],3:[function(require,module,exports){


function drawVerticalLine(canvas, offset, color) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, canvas.height);
    ctx.stroke();
    return canvas;
};

function drawHorizontalLine(canvas, offset, color) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(canvas.width, offset);
    ctx.stroke();
    return canvas;
};

function drawOffsetVerticalLines(canvas, offset, color) {
    return Array(canvas.width / offset)
        .fill()
        .map((_, i) => drawVerticalLine(canvas, offset * i, color))
};

function drawOffsetHorizontalLines(canvas, offset, color) {
    return Array(canvas.height / offset)
        .fill()
        .map((_, i) => drawHorizontalLine(canvas, offset * i, color))
};

function drawRectangularGrid(canvas, offset, color) {
    drawOffsetVerticalLines(canvas, offset, color)
    drawOffsetHorizontalLines(canvas, offset, color)
};

function drawSquare(vertices, canvas, color) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.lineTo(vertices[3].x, vertices[3].y);
    return ctx;
};

function clear(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

module.exports = {
    drawVerticalLine,
    drawHorizontalLine,
    drawOffsetVerticalLines,
    drawOffsetHorizontalLines,
    drawRectangularGrid,
    drawSquare,
    clear
};


},{}],4:[function(require,module,exports){
function isPoint(something) {
    return typeof something === "object"
        && something.hasOwnProperty("x") 
        && something.hasOwnProperty("y")
        && typeof something.x === 'number'
        && typeof something.y === 'number'
};

function createPoint(x, y, prop) {
    const property = prop || {};
    return {
        x: x,
        y: y,
        prop: property
    };
};

function movePoint(point, x, y) {
    return createPoint(point.x + x, point.y + y, point.prop);
};

function movePointOnY(point, y) {
    return movePoint(point, 0, y);
};

function movePointOnX(point, x) {
    return movePoint(point, x, 0);
};

function addTwoPoints(point1, point2) {
    const mergedProps = Object.assign({}, point1.prop, point2.prop);
    return createPoint(point1.x + point2.x, point1.y + point2.y, mergedProps);
};

function multiplyPoint(point, n) {
    return createPoint(point.x * n, point.y * n, point.prop)
};

function arePointsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
};

function isPointWithinXRange(point, start, end) {
    return point.x > start && point.x < end; 
};

function isPointWithinYRange(point, start, end) {
    return point.y > start && point.y < end; 
};

function translatePointToPolar(point, angle) {
    return {
        r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
        angle: Math.atan2(point.y, point.x) * (180 / Math.PI) + angle,
        prop: point.prop || {}
    };
};

function translatePointToCartesian(point) {
    const roundValue = n => Math.round(n * 1000) / 1000;
    return {
        x: roundValue(point.r * Math.cos(point.angle * (Math.PI / 180))),
        y: roundValue(point.r * Math.sin(point.angle * (Math.PI / 180))),
        prop: point.prop || {}
    };
};

function rotatePointOnGlobalZero(point, angle) {
    return translatePointToCartesian(translatePointToPolar(point, angle));
};

module.exports = {
    isPoint,
    createPoint,
    movePoint,
    movePointOnY,
    movePointOnX,
    addTwoPoints,
    multiplyPoint,
    arePointsEqual,
    isPointWithinXRange,
    isPointWithinYRange,
    translatePointToPolar,
    translatePointToCartesian,
    rotatePointOnGlobalZero
} 
},{}],5:[function(require,module,exports){
const { 
    addTwoPoints,
    translatePointToCartesian
} = require('./pointHelpers');

// Returns cartesian global coordinates of a regular polygon vertices;
function regularPolygon(angle, center, sides, radius) {
    return Array(sides).fill().map((_, i) => addTwoPoints(
        translatePointToCartesian({
            r: radius, 
            angle: (360 / sides) * i + angle
        }),
        center
    ));
};

module.exports = {
    regularPolygon
};

},{"./pointHelpers":4}],6:[function(require,module,exports){
const tetrominoStock = require('./tetrominoStock');

module.exports = function setupGameboard(width, height, pixel, tempo, stockLength, tetrominoHeight, colorPalette) {
    return {
        width: width * pixel,
        height: height * pixel,
        pixel: pixel,
        tempo: tempo,
        start: {x: width * pixel / 2, y: -pixel},
        // a flag changed by nextStep();
        gameIsOver: false,

        // initialize a stock and make it possible to access and mutate its state;
        stock: tetrominoStock(stockLength, tetrominoHeight, colorPalette),
    };
};
},{"./tetrominoStock":8}],7:[function(require,module,exports){
const { 
   regularPolygon
} = require('./regularPolygon');
const {
    rotatePointOnGlobalZero, 
    multiplyPoint,
    addTwoPoints
} = require('./pointHelpers')

// Parallel to local coordinates system, so as when tetromino is rotated 
// the squares get rotated  as well according to the pivotLocation
function getParallelSquareVertices(angle, center, dim) {
    return regularPolygon(angle + 45, center, 4, (dim / 2) * Math.sqrt(2));
};

// Tetromino here is defined as coordinates of centers of its four squares;
function rotateTetromino(tetromino, angle) {
    return tetromino.map(squareCenter => rotatePointOnGlobalZero(squareCenter, angle))
};

function scaleTetromino(tetromino, scale) {
    return tetromino.map(squareCenter => multiplyPoint(squareCenter, scale));
};

function positionTetromino(tetromino, pivotLocation, ) {
    return tetromino.map(squareCenter => addTwoPoints(squareCenter, pivotLocation));
};

// Here we get the global position of tetromino's square centers;
function getGlobalTetrominoCenters(tetromino, angle, scale, pivotLocation) {
    return (
        positionTetromino( 
            scaleTetromino( 
                rotateTetromino(tetromino, angle), 
            scale ), 
            pivotLocation)
    )
};

// PUBLIC METHOD
// And finally we receive the global position of eqch if it's square's vertices
// in the form of array of four array of four point objects each;
function getGlobalTetrominoVertices(tetromino, angle, scale, pivotLocation) {
    return getGlobalTetrominoCenters(tetromino, angle, scale, pivotLocation)
        .map(squareCenter => getParallelSquareVertices(angle, squareCenter, scale) );
}

// Publicly accessed 
module.exports = {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices,
    getParallelSquareVertices
};

// Exposed only for testing
module.exports.test = {
    getParallelSquareVertices,
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
};


},{"./pointHelpers":4,"./regularPolygon":5}],8:[function(require,module,exports){
// Create, save and manipulate an array of random tetromino types
const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers');

module.exports = function tetrominoStock(length, height, colorPalette) {
  const tetrominoTypes = require('./tetrominosEdited')(colorPalette);
  let currentStock = height 
    ? createAndPopulateArray(length, () =>_getRandomTetromino(height))
    : createAndPopulateArray(length, _getRandomTetromino);

  function _getRandomTetromino(height) {
    if(height === 1) {
      return tetrominoTypes[0];
    } else if(height === 2) {
      return getRandomArrayItem(
        tetrominoTypes.slice(1, tetrominoTypes.length)
      );
    } else {
      return getRandomArrayItem(tetrominoTypes);
    };
  };

  function getCurrent() {
    return currentStock;
  };
  function getFirstAndReplenish() {
    currentStock.push(_getRandomTetromino());
    return currentStock.shift();
  };
  
  return { getCurrent, getFirstAndReplenish }
};

},{"./arrayHelpers":2,"./tetrominosEdited":10}],9:[function(require,module,exports){
// Tetromino defined as an object with name property
// and their 4 squares' center points later referred 
// to as pivot;

module.exports = [
    {
        name: "I_type",
        colors: ["black", "cyan"],
        centers: [
            { x: -1.5, y:  0.5 },
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    },
    {
        name: "J_type",
        colors: ["black", "blue"],
        centers: [
            { x: -1.5, y: -0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "L_type",
        colors: ["black", "orange"],
        centers: [
            { x: -0.5, y:  0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "O_type",
        colors: ["black", "yellow"],
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x: -0.5, y:  0.5 }
        ]
    },
    {
        name: "S_type",
        colors: ["black", "green"],
        centers: [
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "T_type",
        colors: ["black", "magenta"],
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "T_type",
        colors: ["black", "red"],
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    }
];
},{}],10:[function(require,module,exports){
const { createPoint } = require('./pointHelpers');
const tetrominoTypes = require('./tetrominoTypes');

module.exports = function(colorPalette) {
    function reformedTypes(n) {
        return tetrominoTypes.map(type => type.centers
            .map(center => 
                createPoint(
                    center.x, 
                    center.y, 
                    {
                        name: type.name,
                        color: type.colors[n]
                    }
                )
            )
        );
    };

    if(!colorPalette || colorPalette === 'classic') {
        return reformedTypes(1);
    } else if(colorPalette === 'black') {
        return reformedTypes(0);
    };
};
},{"./pointHelpers":4,"./tetrominoTypes":9}],11:[function(require,module,exports){
const gameBoard = require('./gameBoard');
const tetris = require('./tetrisAPI')(gameBoard, render);
const {
    drawRectangularGrid,
    drawSquare,
    clear
} = require('./helpers/canvasHelpers')
const CANVAS = document.createElement('CANVAS');
CANVAS.height = tetris.onCanvas.height;
CANVAS.width = tetris.onCanvas.width;
document.querySelector('body').appendChild(CANVAS);

function render() {
    const tetromino = tetris.getState().tetrominoVertices;
    const squares = tetris.getState().squareVertices;

    clear(CANVAS);
    if(tetromino) {
        tetromino
            .map(square => drawSquare(square, CANVAS, square[0].prop.color)
            .fill()
        );
    };
    if(squares) {
        squares
            .map(square => drawSquare(square, CANVAS, square[0].prop.color)
            .fill()
        );
    };
    drawRectangularGrid(CANVAS, tetris.getState().pixel, "white");
};

window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
        !tetris.isGameRunning() ? tetris.startGame() : tetris.pauseGame();
    } else if(e.key === 'ArrowDown' && tetris.isGameRunning()) {
        tetris.moveDown();
    } else if(e.key === 'ArrowLeft' && tetris.isGameRunning()) {
        tetris.moveLeft();
    } else if(e.key === 'ArrowRight' && tetris.isGameRunning()) {
        tetris.moveRight();
    } else if(e.key === 'a' || e.key === 'A' && tetris.isGameRunning()) {
        tetris.turnRight();
    } else if(e.key === 'z' || e.key === 'Z' && tetris.isGameRunning()) {
        tetris.turnLeft();
    };
    // render();
})








},{"./gameBoard":1,"./helpers/canvasHelpers":3,"./tetrisAPI":13}],12:[function(require,module,exports){

const { 
    movePointOnY,
    movePointOnX,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
} = require('./helpers/pointHelpers');

const {
    concatIfDoesntInclude
} = require('./helpers/arrayHelpers');

const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices,
    getParallelSquareVertices
} = require('./helpers/tetrominoManipulation');

function tetris(prevState, action, callback) {
    const { width, height, pixel, start, stock, score } = prevState;
    let nextState = {};
    let nextCenters;    
    let nextType = prevState.type || prevState.stock.getFirstAndReplenish();
    let nextPivot = prevState.pivot || start;
    let nextAngle = prevState.angle || 0;
    let nextSquares = prevState.squares || [];

    // since its pure function, no need for object initialization
    if(action === 'MOVE DOWN') {
        nextPivot = movePointOnY(nextPivot, pixel);
    } else if(action === 'MOVE RIGHT') {
        nextPivot = movePointOnX(nextPivot, pixel);
    } else if(action === 'MOVE LEFT') {
        nextPivot = movePointOnX(nextPivot, -pixel);
    } else if(action === 'TURN RIGHT') {
        nextAngle += 90;
    } else if(action === 'TURN LEFT') {
        nextAngle -= 90;
    };
    // tetromino's square centers if given move is allowed;
    nextCenters = getGlobalTetrominoCenters(
        nextType, nextAngle, pixel, nextPivot
    );

    // filter out full rows and drop the rest down
    nextSquares = getSquaresFromNotFullRows(nextSquares).map(square =>        
        movePointOnY(
            square, 
            howManyFullRowsBelow(nextSquares, square) * pixel
        )
    );

    function getSquaresFromNotFullRows(points) {
        return points.filter((square, i, arr) => {
            const row = arr.filter(sq => sq.y === square.y);     
            return row.length < width / pixel;
        });
    };

    function getSquaresFromFullRows(points) {
        return points.filter((square, i, arr) => {
            const row = arr.filter(sq => sq.y === square.y);     
            return row.length >= width / pixel;
        });
    };

    function yCoordsOfFullRows(points) {
        return getSquaresFromFullRows(points).reduce(
            (acc, cur, idx, arr) => concatIfDoesntInclude(acc, cur.y), [])            
    };

    function howManyFullRowsBelow(points, point) {
        return yCoordsOfFullRows(points).filter(
            rowPoint => rowPoint > point.y
        ).length;
    };

    function moveIsAllowed(points, otherPoints) {
        if(points) {
            return points.every(point => 
                isPointWithinXRange(point, 0, width) &&
                isPointWithinYRange(point, -pixel, height) &&
                otherPoints.every(p => !arePointsEqual(p, point))
            );
        } else {
            return false
        }        
    };
    // What happens when tetromino is falling;

    if(moveIsAllowed(nextCenters, nextSquares)) {
        nextState.type     = nextType;
        nextState.pivot    = nextPivot;
        nextState.angle    = nextAngle;
     // Produce falling tetromino's vertices only in this case;
        nextState.tetrominoVertices = getGlobalTetrominoVertices(
            nextType, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        if(nextPivot.y === start.y) {
            nextState.gameIsOver = true;
        } else {
            nextSquares = nextSquares.concat( getGlobalTetrominoCenters(
                prevState.type, 
                prevState.angle, 
                pixel, 
                prevState.pivot 
            ));
    // What happens when tetromino hits the bottom;
            nextState.type    = stock.getFirstAndReplenish();
            nextState.pivot   = start;
            nextState.angle   = 0;
        };
    };
    // Produce fallen squares' vertices in any case;
    nextState.squares = nextSquares;
    nextState.squareVertices = [].concat(nextState.squares
        .map(center => getParallelSquareVertices(0, center, pixel)
    ));

    return Object.assign(prevState, nextState);
};

module.exports = tetris;
},{"./helpers/arrayHelpers":2,"./helpers/pointHelpers":4,"./helpers/tetrominoManipulation":7}],13:[function(require,module,exports){
// Function returning object with all tetris actions;

const tetris = require('./tetris');
const setupGameboard = require('./helpers/setupGameboard');

module.exports = function (gameBoard, callback) {
    const { width, height, pixel, tempo, stocklength, tetrominoHeight, colorPalette } = gameBoard;
    const initialState = setupGameboard(width, height, pixel, tempo, stocklength, tetrominoHeight, colorPalette);
    const onCanvas = initialState;
    let gameIsRunning;

    let gameState = tetris(initialState);

    function isGameRunning() {
        return gameIsRunning;
    };
    function startGame() {
        if(!gameIsRunning) {
            gameIsRunning = setInterval(
                () => {
                    gameState = tetris(gameState, 'MOVE DOWN')
                    callback();
                }, 
                initialState.tempo
            );
        };
    };
    function pauseGame() {
        clearInterval(gameIsRunning);
        gameIsRunning = false;
        callback();
    };
    function moveDown() {
        gameState = tetris(gameState, 'MOVE DOWN', callback);
        callback();
    };
    function moveRight() {
        gameState = tetris(gameState, 'MOVE RIGHT', callback);
        callback();
    };
    function moveLeft() {
        gameState = tetris(gameState, 'MOVE LEFT', callback);
        callback();
    };
    function turnRight() {
        gameState = tetris(gameState,'TURN RIGHT', callback);
        callback();
    };
    function turnLeft() {
        gameState = tetris(gameState, 'TURN LEFT', callback);
        callback();
    };

    function getState() {
        return gameState;
    };

    return {
        isGameRunning,
        onCanvas,
        startGame,
        pauseGame,
        moveDown,
        moveRight,
        moveLeft,
        turnRight,
        turnLeft,
        getState,
    };
};
},{"./helpers/setupGameboard":6,"./tetris":12}]},{},[11]);
