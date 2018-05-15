const path = require("path");

module.exports = {
  entry: "./src/hsf.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "hsf.js",
    library: "hsf",
    libraryTarget: "var"
  },
  externals: {
    $: "jQuery",
    jquery: "jQuery"
  }
};
