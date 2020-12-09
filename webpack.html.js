const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =  (option)=>{
    return [
        {name: 'home'},
        {name: 'shop'},
        {name: 'shop-detail'},
        {name: 'pet'},
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
/**
 * /(<%=\s?)([a-z0-9_\.-]+)(\s?%>)/g
 */