import { defaultConfig, TetrisConfigI } from "./defaultConfig"

interface TetrisI {
  gameboard: any[]
  config: TetrisConfigI
}

class TetrisAPI implements TetrisI {
  gameboard = []
  config = defaultConfig
  constructor(config?) {
    this.config = Object.assign(this.config, config)
  }

  getConfig() {
    return this.config
  }

  moveRight() {
    console.log("TETRIS moved right")
  }
}

export default TetrisAPI
