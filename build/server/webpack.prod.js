const baseWebpackConfig = require('./webpack.base');

module.exports = Object.assign(baseWebpackConfig, {
    mode: "production",
});