const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =  (option)=>{
    return [
        {name: 'home'},
        {name: 'shop-list'},
        {name: 'shop-home'},
        {name: 'shop-detail'},
        {name: 'pet'},
        {name: 'pet-list'},
        {name: 'pet-base'},
        {name: 'pet-base-edit'},
        {name: 'pet-nutrition'},
        {name: 'pet-record'},
        {name: 'member'},
        {name: 'evaluation'},
        {name: 'shop-car'},
        {name: 'shopcart-step1'},
        {name: 'shopcart-step2'},
        {name: 'shopcart-step3'},
        {name: 'shopcart-step4'},
        {name: 'shopcart-step5'},
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