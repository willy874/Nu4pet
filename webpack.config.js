const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackModules = require('webpack-modules')
const WebpackModuleSettings = require('./webpack.module.js')
const WebpackHtmlSettings = require('./webpack.html.js')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    plugins: [
        ...WebpackHtmlSettings,
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].bundle.css'
        }),
        new WebpackModules(),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, './src/js'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
        modules: [
            'node_modules'
        ]
    },
    module: WebpackModuleSettings
}