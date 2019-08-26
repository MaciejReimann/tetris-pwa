...

# Vanilla Tetris

Tetris game engine written in functional ES6.

---

## Brief:

Tetris game API with wide backend and frontend configuration possibilities.

## Goals:

A self-assigned programming excercise which main goals were: \
&nbsp;&nbsp; 1. To learn the differences between object-oriented and functional styles; \
&nbsp;&nbsp; 2. To design an API with separation of concerns in mind; \
&nbsp;&nbsp; 3. To practice TDD and procedural programming;

## [See live v.1.0.0](https://vanillatetris.herokuapp.com/)

(This is a MVP... ).

## TODOs:

~~make game work;~~ \

- apply some styling;

## Example Usage

#### Gameboard Setup

Create or import the gameboard configuration object:

```javascript
// The default gameBoard object looks like this:
const gameBoard = {
  pixel: 15, // basic game measurement unit, the assgned value is in actual canvas units
  width: 10, // gameboard width expressed in game units (pixels)
  height: 20, // gameboard height expressed in game units (pixels)
  tempo: 1000, // tetromino's falling rate, in ms
  stockLength: 3, // amount of tetrominos in queue
  tetrominoHeight: "random", // useful for testing purposes only
  colorPalette: "classic" // to be changed and moved to GUI config file...
};
module.exports = gameBoard;
```

```javascript
// In the tetrisAPI.js file:
// Import or pass inline the configuration object:
const gameBoard = require("./gameBoard");
const tetris = require("./tetrisAPI")(gameBoard, update);
```

#### HTML `<canvas>` implementation example:

```javascript
// In the tetrisAPI.js file:
// Import or pass inline the configuration object:
const gameBoard = require("./gameBoard");
const tetris = require("./tetrisAPI")(gameBoard, update);
```

### Game Engine API

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

- [Wikipedia article on tetris game](https://en.wikipedia.org/wiki/Tetris "Wikipedia article")

Functional programming in javacsript:\

- [Factory Functions in JavaScript](https://www.youtube.com/watch?v=ImwrezYhw4w&t=243s "Factory functions")
