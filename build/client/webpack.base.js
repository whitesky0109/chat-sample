const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir);
}

module.exports = {
  target: 'web',
  devtool: "source-map",

  context: resolve(path.join('src', 'public')),

  entry: {
    app: './index.tsx',
    style: './sass/index.scss',
  },

  resolve: {
    extensions: ['.scss', '.ts', '.tsx', '.es6', '.js', '.json', '.svg', '.woff2', '.png', '.html'],
  },

  output: {
    path: resolve('dist/public'),
    publicPath: '/public/',
    filename: "[name].bundle.js",
  },
};
