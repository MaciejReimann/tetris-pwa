import { defaultConfig } from "../defaultConfig"
import { tetrominos } from "../tetrominos"
import { buildQueue, tetrominosQueue } from "../game"

describe("What happens when we build a tetromino queue", () => {
  it("should", () => {
    const queue = buildQueue(tetrominos, 3)
    expect(queue.length).toBe(3)
  })
})
