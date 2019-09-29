import { defaultConfig, TetrisConfigI } from "./defaultConfig"
import { createStore } from "redux"
import { tetrisReducer } from "./tetrisReducer"
import { startGame, moveDown, moveLeft, moveRight } from "./tetrisActions"

interface TetrisI {
  gameboard: any[]
  config: TetrisConfigI
}

class TetrisAPI implements TetrisI {
  gameboard = null
  config = null
  constructor(config?) {
    this.config = { ...defaultConfig, ...config }
    this.gameboard = createStore(tetrisReducer)
  }

  startGame = () => {
    this.gameboard.dispatch(startGame(this.config))
  }

  moveDown = () => {
    this.gameboard.dispatch(moveDown(this.config))
  }

  moveLeft = () => {
    this.gameboard.dispatch(moveLeft(this.config))
  }

  moveRight = () => {
    this.gameboard.dispatch(moveRight(this.config))
  }

  getGameboard = () => this.gameboard.getState()
  getConfig = () => this.config
}

export default TetrisAPI
