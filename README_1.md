## Tetris API
Tetris game engine built to strengthen and showcase my programming skills. 

## Motivation

A self-assigned programming excercise which main goals were: 
* to learn the differences between object-oriented and functional code architecture;
* to design an API with separation of concerns in mind;
* to practice TDD and procedural programming;

## See live
Go to: https://vanillatetris.herokuapp.com/ and follow the instructions. 

## Example Usage

#### Gameboard Setup

Create or import the gameboard configuration object:
```javascript
// The default gameBoard object looks like this:
const gameBoard = {
    width: 10,
    height: 20,
    pixel: 15,
    tempo: 1000,
    stockLength: 3,
    tetrominoHeight: "random",
    colorPalette: "classic"
};
module.exports = gameBoard;
```
**pixel**\ 
Basic unit of the grid system; 
**width**\
Gameboard width expressed in gridUnits; 
**height**\
Gameboard height expressed in gridUnits; 
*tempo**\
Initial falling tetromino's rate in miliseconds; 
**stockLength**\

**tetrominoHeight**\

**colorPalette**\
Determines the color values of each point on the board;
&nbsp;&nbsp; `colorPalette: "classic"`
&nbsp;&nbsp;
&nbsp;&nbsp; `colorPalette: "black"`
&nbsp;&nbsp;

```javascript
// In the tetrisAPI.js file:
// Import or pass inline the configuration object:
const gameBoard = require('./gameBoard')
const tetris = require('./tetrisAPI')(gameBoard, update);
```
#### HTML `<canvas>` implementation example:

```javascript
// In the tetrisAPI.js file:
// Import or pass inline the configuration object:
const gameBoard = require('./gameBoard')
const tetris = require('./tetrisAPI')(gameBoard, update);
```

## Game Engine API

**.isGameRunning()**\
Returns:\
&nbsp;&nbsp; Type: `boolean`\
&nbsp;&nbsp; Default: `false` \
A flag to indicate whether the interval is set or cleared;

**.startGame()**\
Sets the game state to initial value and starts the gameloop; `.isGameRunning()` will return `true`;

**.pauseGame()**\
Pause the gameloop; `.isGameRunning()` will return `false`;

**.moveDown()**\
Moves the current tetromino block one pixel down.

**.moveRight()**\
Moves the current tetromino block one pixel right.

**.moveLeft()**\
Moves the current tetromino block one pixel left.

**.turnRight()**\
Turns the current tetromino block 90 degrees clockwise.

**.turnLeft()**\
Turns the current tetromino block 90 degrees counter-clockiwise.

**.getState()**\
Returns the current game state. 

## Useful resources

* [Wikipedia article on tetris game](https://en.wikipedia.org/wiki/Tetris "Wikipedia article")

Functional programming in javacsript:\
* [Factory Functions in JavaScript](https://www.youtube.com/watch?v=ImwrezYhw4w&t=243s "Factory functions")


