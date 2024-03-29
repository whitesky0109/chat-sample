const baseWebpackConfig = require('./webpack.base');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'tslint-loader',
                    options: {
                        emitErrors: true,
                        typeCheck: false,
                    }
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    },
                },
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            require('./sass.rule.js')({
                sourceMap: false, preserveUrl: false
            }),
            {
                test: /\.(png|jpg|gif?)(\?[a-z0-9=&.]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: '/',    // where the fonts will go
                      publicPath: '/public'       // override the default path
                    }
                }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CopyWebpackPlugin([
            { from: './public/fonts/*', to: '..' },
        ]),

        new HtmlWebpackPlugin({
            template: `public/index.html`,
            filename: 'index.html',
            inject: 'body',
        }),
    ],
});

module.exports = conf;