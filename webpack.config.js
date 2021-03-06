module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    library: "@maciejreimann/tetris",
    libraryTarget: "umd"
  },
  resolve: { extensions: ["*", ".js"] },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  }
};
