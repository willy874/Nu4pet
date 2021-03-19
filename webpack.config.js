const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackModules = require('webpack-modules')
const WebpackModuleSettings = require('./webpack.module.js')
const WebpackHtmlSettings = require('./webpack.html.js')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (evn,option)=>{
    return {
        mode: option.mode,
        entry: {
            main: './src/main.js',
            pet: './src/pet.js',
            'shop-car': './src/shop-car.js',
            svgTool: './src/svg-tool.js'
        },
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, option.mode === 'production' ? 'prod' : 'dist'),
            filename: './js/[name].bundle.js'
        },
        plugins: [
            ...WebpackHtmlSettings(option),
            new HtmlWebpackPlugin({
                template: `./src/pug/svg-tool.pug`,
                filename: `svg-tool.html`,
                chunks: 'svgTool'
            }),
            new VueLoaderPlugin(),
            new ESLintPlugin(),
            new MiniCssExtractPlugin({
                filename: option.mode === 'production' ? './2021/[name].bundle.css' :  './css/[name].bundle.css'
            }),
            new WebpackModules(),
            // new CleanWebpackPlugin(),
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
        module: WebpackModuleSettings(option)
    }
    
}