import { defaultConfig, ConfigInterface } from "./defaultConfig";

interface TetrisInterface {
  gameboard: ConfigInterface;
}

class Tetris implements TetrisInterface {
  gameboard: ConfigInterface;
  constructor(config?: ConfigInterface) {
    this.gameboard = Object.assign(defaultConfig, config);
  }

  getConfig() {
    return this.gameboard;
  }
}

export default Tetris;
