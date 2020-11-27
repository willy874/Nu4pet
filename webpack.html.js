const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const headData = fs.readFileSync('./src/html/head.html').toString('utf8')
// const headerHtml = fs.readFileSync('./src/html/header.html').toString('utf8')
// const footerHtml = fs.readFileSync('./src/html/footer.html').toString('utf8')

module.exports =  [
    // {name: 'layout',title: '共用版'},
    {name: 'home',title: '首頁'}
].map((chunk)=>{
    return new HtmlWebpackPlugin({
        template: `./src/index.html`,
        filename: `${chunk.name}.html`,
        minify: process.env.NODE_ENV == 'development' ? false : true,
        meta: {
            viewport: 'width=device-width, initial-scale=1.0',
            title: 'nu4PET 陪心商城',
            url: 'https://www.nu4pet.com/Shop/',
            author: '唯寵股份有限公司 - nu4PET',
            generator: '唯寵股份有限公司 - nu4PET - HTML Optimizer v1.0',
            copyright: 'Copyright (C) 2018-2020 nu4PET 陪心商城 All rights reserved.',
            description: '最貼近毛小孩的陪心商城，提供客製化寵糧、罐頭、乾+濕、床墊...等等各種毛小孩及拔麻最喜愛的小物',
            keywords: ['nu4PET','陪心寵糧','客製化','毛小孩','飼料','乾糧','濕糧','罐頭','床','狗','貓'].join(','),
            robots: ['index','follow'].join(','),
            logo70: 'http://www.nu4pet.com/Images/logo_70x70.png',
            logo150: 'http://www.nu4pet.com/Images/logo_150x150.png',
            logo310: 'http://www.nu4pet.com/Images/logo_310x310.png',
            image: 'https://www.nu4pet.com/images/LandingPage/FBShare.jpg,',
            'format-detection': 'telephone=no',
        },
        headData: headData,
        chunksSortMode: 'manual',
        chunks: ['main',chunk.name],
        title: chunk.title ? ' - '+chunk.title : '',
        favicon: './src/assets/favicon.ico',
        main: fs.readFileSync(`./src/html/${chunk.name}.html`).toString('utf8'),
        // header: headerHtml,
        // footer: footerHtml,
    })
})
/**
 * 使用變數引入的HTML不受 Watch 同步
 * /(<%=\s?)([a-z0-9_\.-]+)(\s?%>)/g
 */