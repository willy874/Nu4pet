const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const metaData = fs.readFileSync('./src/meta.html').toString('utf8')

module.exports =  [
    {name: 'home'}
].map((chunk)=>{
    return new HtmlWebpackPlugin({
        template: `./src/index.html`,
        filename: `${chunk.name}.html`,
        minify: process.env.NODE_ENV == 'development' ? false : true,
        meta: {
            viewport: 'width=device-width, initial-scale=1.0'
        },
        metaData: metaData,
        chunksSortMode: 'manual',
        chunks: ['main',chunk.name],
        title: chunk.title ? ' - '+chunk.title : '',
        // favicon: './src/img/favicon.ico',
        main: fs.readFileSync(`./src/html/${chunk.name}.html`).toString('utf8')
    })
})
