export interface CustomConfigI {}

export interface TetrisConfigI {
  width: number
  height: number
}

export const defaultConfig: TetrisConfigI = {
  width: 10,
  height: 20
}
