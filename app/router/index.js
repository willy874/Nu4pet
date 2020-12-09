const route = require('./route')

module.exports = (app)=>{
    const Route = new route(app)
    Route.get('/', (req,res)=>{
        res.send('Hello World!')
    })

    /**
     * API
     */
    
    // ShopController
    Route.api('get','/shop', 'ShopController@getShopListData')
    Route.api('get','/shop/all', 'ShopController@getShopAllData')
    Route.api('get','/shop/:id?', 'ShopController@getShopDataById')

    // PetController
    Route.api('get','/pet', 'PetController@getPetListData')
    Route.api('get','/pet/all', 'PetController@getPetAllData')
    Route.api('get','/pet/:id?', 'PetController@getPetDataById')

    return Route
}

