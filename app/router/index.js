const route = require('./route')

module.exports = (app)=>{
    const Route = new route(app)
    Route.get('/', (req,res)=>{
        return res.send('這是首頁')
    })

    // API
    Route.get('/shop', 'ShopController@getName')

    return Route
}

