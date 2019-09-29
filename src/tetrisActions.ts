export enum TETRIS {
  StartGame = "Start game",
  MoveDown = "Move down",
  MoveLeft = "Move left",
  MoveRight = "Move right"
}

export const startGame = config => ({ type: TETRIS.StartGame, config })
export const moveDown = config => ({ type: TETRIS.MoveDown, config })
export const moveLeft = config => ({ type: TETRIS.MoveLeft, config })
export const moveRight = config => ({ type: TETRIS.MoveRight, config })
