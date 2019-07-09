const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir);
}

module.exports = {
  target: 'web',
  devtool: "source-map",

  context: resolve(path.join('src')),

  entry: {
    app: './public/index.tsx',
    style: './public/sass/index.scss',
  },

  resolve: {
    extensions: ['.scss', '.ts', '.tsx', '.es6', '.js', '.jsx', '.json', '.svg', '.woff2', '.png', '.html'],
    modules: [
      'src',
      'node_modules',
    ],
 },

  output: {
    path: resolve('dist/public'),
    publicPath: '/public/',
    filename: "[name].bundle.js",
  },
};
