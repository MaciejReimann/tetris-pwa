

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







