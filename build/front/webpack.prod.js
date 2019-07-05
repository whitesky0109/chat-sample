const baseWebpackConfig = require('./webpack.base');
const TerserPlugin = require('terser-webpack-plugin');

var conf = baseWebpackConfig;
conf = Object.assign(conf, {
    mode: "production",
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: true,
                sourceMap: true
            }),
        ]
    },
});

module.exports = conf;