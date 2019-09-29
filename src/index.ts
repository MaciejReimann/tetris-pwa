import { defaultConfig, ConfigInterface } from "./defaultConfig"

interface TetrisInterface {
  gameboard: ConfigInterface
}

class TetrisAPI {
  gameboard = []
  config = {}
  constructor(config?: ConfigInterface) {
    this.config = Object.assign(defaultConfig, config)
  }

  getConfig() {
    return this.gameboard
  }
}

export default TetrisAPI
