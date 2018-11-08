(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const { 
    createPoint,
    addTwoPoints,
    movePoint,
    movePointOnY,
    movePointOnX,
    multiplyPoint,
    arePointsEqual,   
    rotatePointOnGlobalZero 
} = require('./helpers/pointHelpers');

const tetrominoStock = require('./helpers/tetrominoStock');

const {
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

function Tetris(prevState, action) {
    const {
        width, height, pixel, tempo, start, type, pivot, angle, score
    } = prevState;
    let nextState = {};
    let intervalID;
    if(action === 'INITIALIZE') {
        console.log("initialized")
    } else if(action === 'START') {
        nextState.type = tetrominoStock.getFirstAndReplenish();
    } else if(action === 'MOVE DOWN') {
        nextState.pivot = movePointOnY(pivot, pixel);
    }
    nextState = Object.assign({}, prevState, nextState);
    console.log(nextState)
    return nextState;
};

function tetrisSingleton(prevState, action) {
    let instance;
    function createInstance() {
        return Tetris(prevState, action)
    };

    return {
        getInstance: function() {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
}

module.exports = Tetris;
},{"./helpers/pointHelpers":3,"./helpers/tetrominoManipulation":6,"./helpers/tetrominoStock":7}],2:[function(require,module,exports){


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
    const n = m % array.length
    return n >= 0
        ? array.slice(n, array.length).concat(array.slice(0, n))
        : array.slice(array.length + n, array.length).concat(array.slice(0, array.length + n))
}

module.exports = {
    getRandomArrayItem,
    createAndPopulateArray,
    clone,
    carouselArray
}
},{}],3:[function(require,module,exports){
function isPoint(something) {
    return typeof something === "object"
        && something.hasOwnProperty("x") 
        && something.hasOwnProperty("y")
        && typeof something.x === 'number'
        && typeof something.y === 'number'
};

function createPoint(x, y) {
    return {
        x: x,
        y: y
    };
};

function movePoint(point, x, y) {
    return createPoint(point.x + x, point.y + y);
};

function movePointOnY(point, y) {
    return movePoint(point, 0, y);
};

function movePointOnX(point, x) {
    return movePoint(point, x, 0);
};

function addTwoPoints(point1, point2) {
    return createPoint(point1.x + point2.x, point1.y + point2.y);
};

function multiplyPoint(point, n) {
    return createPoint(point.x * n, point.y * n)
};

function arePointsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
};

function translatePointToPolar(point, angle) {
    return {
        r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
        angle: Math.atan2(point.y, point.x) * (180 / Math.PI) + angle
    };
};

function translatePointToCartesian(point) {
    const roundValue = n => Math.round(n * 1000) / 1000;
    return {
        x: roundValue(point.r * Math.cos(point.angle * (Math.PI / 180))),
        y: roundValue(point.r * Math.sin(point.angle * (Math.PI / 180)))
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
    translatePointToPolar,
    translatePointToCartesian,
    rotatePointOnGlobalZero
} 
},{}],4:[function(require,module,exports){
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

},{"./pointHelpers":3}],5:[function(require,module,exports){
const tetrominoStock = require('./tetrominoStock');
const { createPoint } = require('./pointHelpers');

function setInitialState(width, height, pixel, tempo, stockLength) {
    return {
        width: width * pixel,
        height: height * pixel,
        tempo: tempo,
        start: createPoint(width / 2, 0),
        stockLength,
        // a flag changed by nextStep();
        gameIsOver: false,

        // create a stock of tetrominos to show them before the game starts,
        // after game will have started, this property will be assigned a value
        // by tetrominoStock.getCurrent() in nextStep();
        stock: tetrominoStock.build(stockLength), 

        // a reference point for all tetromino calculations, after it is moved, 
        // tetrominoSquares are recalculated;
        pivot: createPoint(width / 2, 0),

        // falling tetromino local square centers, i.e. its definition, 
        // first time assigned a value on start(), keeps the valuea untill 
        // tetromino hits the bottom;
        type: [],

        // falling tetromino default angle
        angle: 0,

        // stacked down tetrominos' square centers' global vertices,
        //  recalculated in nextStep();
        squares: [],
    };
};

module.exports = setInitialState;
},{"./pointHelpers":3,"./tetrominoStock":7}],6:[function(require,module,exports){
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
function getGlobalTetrominoLocation(tetromino, angle, scale, pivotLocation) {
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
    return getGlobalTetrominoLocation(tetromino, angle, scale, pivotLocation)
        .map(squareCenter => getParallelSquareVertices(angle, squareCenter, scale) );
}

// Publicly accessed 
module.exports = {
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
};

// Exposed only for testing
module.exports.test = {
    getParallelSquareVertices,
    rotateTetromino,
    scaleTetromino,
    positionTetromino,
    getGlobalTetrominoLocation,
    getGlobalTetrominoVertices
};


},{"./pointHelpers":3,"./regularPolygon":4}],7:[function(require,module,exports){
// Create, save and manipulate an array of random tetromino types
const {
  getRandomArrayItem,
  createAndPopulateArray,
} = require('./arrayHelpers');
const tetrominoTypes = require('./tetrominoTypes');

// PRIVATE VARIABLE
let currentStock = [];

// PRIVATE METHODS
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

// PUBLIC METHODS
function build(length, height) {
  if(!height) {
    currentStock = createAndPopulateArray(length, _getRandomTetromino);
  } else {
    currentStock = createAndPopulateArray(length, () =>_getRandomTetromino(height));
  };
  return currentStock;
};

function getCurrent() {
  return currentStock;
};

function getFirstAndReplenish() {
  currentStock.push(_getRandomTetromino());
  return currentStock.shift();
};

module.exports = {
  tetrominoTypes, 
  build,
  getCurrent,
  getFirstAndReplenish,
};
},{"./arrayHelpers":2,"./tetrominoTypes":8}],8:[function(require,module,exports){
// Tetromino defined as an object with name property
// and their 4 squares' center points later referred 
// to as pivot;
module.exports = [
    {
        name: "I_type",
        centers: [
            { x: -1.5, y:  0.5 },
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    },
    {
        name: "J_type",
        centers: [
            { x: -1.5, y: -0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "L_type",
        centers: [
            { x: -0.5, y:  0.5 },
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "O_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x: -0.5, y:  0.5 }
        ]
    },
    {
        name: "S_type",
        centers: [
            { x: -0.5, y:  0.5 },
            { x:  0.5, y:  0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 }
        ]
    },
    {
        name: "T_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  1.5, y: -0.5 },
            { x:  0.5, y:  0.5 }
        ]
    },
    {
        name: "T_type",
        centers: [
            { x: -0.5, y: -0.5 },
            { x:  0.5, y: -0.5 },
            { x:  0.5, y:  0.5 },
            { x:  1.5, y:  0.5 }
        ]
    }
]
},{}],9:[function(require,module,exports){


const tetris = require('./Tetris');
const setInitialState = require('./helpers/setInitialState');
const initialState = setInitialState(10, 20, 1, 1000, 3);

let gameState = tetris(initialState, "INITIALIZE");

window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        gameState = tetris(gameState, 'START')
    } else if(e.key === 'ArrowDown') {
        gameState = tetris(gameState, 'MOVE DOWN')
    };
})








},{"./Tetris":1,"./helpers/setInitialState":5}]},{},[9]);
