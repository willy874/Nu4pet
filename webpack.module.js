const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (option)=>{
    return {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: false,
                        publicPath: option.mode === 'production' ? '..' :  '..'
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                    }
                }
            ]
        },{
            test: /\.pug$/,
            use: [
                {
                    loader: 'html-loader',
                    options: {
                        attributes: false,
                        minimize: option.mode === 'development' ? false : true,
                    }
                },{
                    loader: 'pug-html-loader',
                    options: {
                        pretty: option.mode === 'production' ? false : true,
                    }
                },
            ]
          }, {
            test: /\.js$/,
            exclude: /\/node_modules\//,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1000, //bytes
                    name: '[name].[ext]',
                    outputPath: option.mode === 'production' ? 'Images/2021' :  'assets/image'
                }
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: option.mode === 'production' ? '2021' :  'css'
                    },
                },
            ],
        }, {
            test: /\.(txt|xml)$/i,
            use: 'raw-loader',
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                fix: true
            },
        }]
    }
    
}