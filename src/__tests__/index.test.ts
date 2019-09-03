import Tetris from "../index";
import { defaultConfig } from "../defaultConfig";

describe("First moves and turns of random tetromino", () => {
  test("something", () => {
    const tetris = new Tetris();
    expect(tetris.getConfig()).toBe(defaultConfig);
  });
});
