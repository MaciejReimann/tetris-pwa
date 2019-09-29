import {
  TETRIS,
  startGame,
  moveDown,
  moveLeft,
  moveRight
} from "./tetrisActions"

const initialState = []

export const tetrisReducer = (state = initialState, action) => {
  switch (action.type) {
    case TETRIS.StartGame:
      console.log("Reducer: start")
      return putFirstTetrominoFromStockOnStartPosition(state, action.config)
    case TETRIS.MoveDown:
      console.log("Reducer: down")
      return moveActiveTetrominoDown(state, action.config)
    case TETRIS.MoveLeft:
      console.log("Reducer: left")
      return moveActiveTetrominoLeft(state, action.config)
    case TETRIS.MoveRight:
      console.log("Reducer: right")
      return moveActiveTetrominoRight(state, action.config)
  }
  return state
}

const putFirstTetrominoFromStockOnStartPosition = (state, { width }) => {
  return placeOnStart(activate(firstTetrominoFromStock))
}

const moveActiveTetrominoDown = (state, { height }) => {
  const active = state.filter(point => point.isActive === true)
  const movedActive = canBeMovedDown(active, height) ? moveDown(active) : active

  const inactive =
    !movedActive &&
    state.filter(point => point.isActive !== true).append(desactivate(active))
  const purged = isAnyRowFull ? deleteFullRows(inactive) : inactive

  return [...inactive, ...movedActive]
}
