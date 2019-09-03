export interface ConfigInterface {
  width: number;
  height: number;
  tempo: number;
}

export const defaultConfig: ConfigInterface = {
  width: 10,
  height: 15,
  tempo: 1
};
