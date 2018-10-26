(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


const { 
    merge,
} = require('./pointsManipulation');

// Tetris object to be exported
const state = {};
state.board = {};
const status = {};


// PRIVATE METHODS



// PUBLIC METHODS
const getState = () => {
    return state;
}

const setUp = (width, height, tempo) => {
    state.board.width = width;
    state.board.height = height;
    state.board.tempo = tempo;
    return state;
}

const start = () => {
    status.log = "Game started";
    state.gameStarted = true;

    return state;
}

const moveDown = () => {
    status.log = "Moved down"
    return state;
}

module.exports = {
    getState,
    setUp,
    moveDown
};
},{"./pointsManipulation":3}],2:[function(require,module,exports){


const tetris = require('./Tetris');


tetris.setUp(10, 20, 1);

console.log(tetris.getState())


},{"./Tetris":1}],3:[function(require,module,exports){

const merge = (obj1, obj2) => Object.assign({}, obj1, obj2);

module.exports = {merge} 
},{}]},{},[2]);
