import Tetris from "../index"
import { defaultConfig } from "../defaultConfig"

const myConfig = {
  width: 20,
  height: 40
}

describe("Configuring tetris", () => {
  it("should return default config when no custom config is provided", () => {
    const tetris = new Tetris()
    expect(tetris.getConfig()).toBe(defaultConfig)
  })

  it("should override default config", () => {
    const tetris = new Tetris(myConfig)
    expect(tetris.getConfig()).toStrictEqual(myConfig)
  })

  it("should merge default config with custom config", () => {
    const tetris = new Tetris({ height: 20 })
    expect(tetris.getConfig()).toStrictEqual({ width: 20, height: 20 })
  })
})
