import { tetrominos } from "./tetrominos"

class Point {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export const gameStartPoint = config => new Point(config.width / 2, 0)

export const buildQueue = (stock, length) =>
  new Array(length).map(item => stock[Math.floor(Math.random() * stock.length)])

export const tetrominosQueue = buildQueue(tetrominos, 3)

// const tetrominoOnStartPoint = (config, tetromino) =>
