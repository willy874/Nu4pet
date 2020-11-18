const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    rules: [{
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: false,
                }
            }
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
                name: '[hash:16].[ext]',
                outputPath: 'assets',
            }
        }
    }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets',
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