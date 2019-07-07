const Webpack = require("webpack");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir);
}

module.exports = {
  target: 'node',
  devtool: "source-map",

  node: {
    __dirname: true,
    __filename: true,
  },

  externals: [nodeExternals()],
  
  context: resolve('src'),
  
  entry: {
    server: './main.ts',
  },

  resolve: {
    extensions: [".js", ".ts", ".json"]
  },

  output: {
    path: resolve('dist/server'),
    publicPath: '/',
    filename: "[name].bundle.js",
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: [
        /node_modules/,
      ]
    }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.IgnorePlugin(/uws/),
  ],
};
