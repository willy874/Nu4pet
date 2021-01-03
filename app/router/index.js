const route = require('./route')

module.exports = (args)=>{
    const Route = new route(args)
    Route.get('/', (req,res)=>{
        res.send('Hello! This is serve system.')
    })

    /**
     * API
     */

    // ProdController
    Route.api('get','/prod', 'ProdController@getProdListData')
    Route.api('get','/prod/all', 'ProdController@getProdAllData')
    Route.api('get','/prod/:id?', 'ProdController@getProdDataById')

    // PetController
    Route.api('get','/pet', 'PetController@getPetListData')
    Route.api('get','/pet/all', 'PetController@getPetAllData')
    Route.api('get','/pet/:id?', 'PetController@getPetDataById')
    Route.api('get','/pet/user/:account?', 'PetController@getPetListDataByAccount')
    Route.api('post','/pet', 'PetController@addPetData')
    Route.api('post','/pet/:id?', 'PetController@updatePetDataById')

    // PetStatusController
    Route.api('get','/pet/status/all', 'PetStatusController@getPetStatusAllData')
    Route.api('get','/pet/status/:type?', 'PetStatusController@getPetStatusDataByType')

    // UserController
    Route.api('get','/login', 'UserController@getUserLogin')

    // ShopCarController
    Route.api('get','/shopcar', 'ShopCarController@getShopCarData')
    Route.api('post','/shopcar', 'ShopCarController@addShopCarData')
    Route.api('put','/shopcar', 'ShopCarController@updateShopCarData')
    Route.api('delete','/shopcar/:id?', 'ShopCarController@deleteShopCarData')

    // RecordController
    Route.api('get','/record/all', 'RecordController@getRecordAllData')
    Route.api('get','/record/:id?', 'RecordController@getRecordDataById')
    Route.api('post','/record', 'RecordController@addRecordData')
    Route.api('put','/record', 'RecordController@updateRecordData')
    Route.api('delete','/record', 'RecordController@deleteRecordData')

    // OrderController
    Route.api('get','/city', 'OrderController@getCity')
    Route.api('get','/recommend/user/:id?', 'OrderController@getRecommend')
    Route.api('get','/discount/user/:id?', 'OrderController@getDiscountRules')
    Route.api('get','/discount/salecode/:code?', 'OrderController@getSaleCodeDiscount')

    // ToolController
    Route.get('/api/svg/all','ToolController@getSvgAll')
    Route.post('/api/svg/create','ToolController@createSvgJavascript')
    Route.put('/api/svg/index','ToolController@updateIndex')

    return Route
}

