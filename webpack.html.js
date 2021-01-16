const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =  (option)=>{
    return [
        {name: 'home'},
        {name: 'shop-list'},
        {name: 'shop-home'},
        {name: 'shop-detail'},
        {name: 'pet'},
        {name: 'member'},
        {name: 'evaluation'},
        {name: 'shop-car'},
    ].map((chunk)=>{
        return new HtmlWebpackPlugin({
            template: `./src/pug/${chunk.name}.pug`,
            filename: `${chunk.name}.html`,
            minify: option.mode === 'development' ? false : true,
            chunksSortMode: 'manual',
            chunks: ['main',chunk.name]
        })
    })
}