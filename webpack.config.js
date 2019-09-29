module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    library: "@maciejreimann/tetris",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  }
}
