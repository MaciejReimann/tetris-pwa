module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    libraryTarget: "commonjs2",
    filename: "index.js"
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
