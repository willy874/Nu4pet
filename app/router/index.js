const route = require('./route')

module.exports = (app)=>{
    const Route = new route(app)
    Route.get('/', (req,res)=>{
        res.send('Hello! This is serve system.')
    })

    /**
     * API
     */

    // ProdController
    Route.api('get','/Prod', 'ProdController@getProdListData')
    Route.api('get','/Prod/all', 'ProdController@getProdAllData')
    Route.api('get','/Prod/:id?', 'ProdController@getProdDataById')

    // PetController
    Route.api('get','/pet', 'PetController@getPetListData')
    Route.api('get','/pet/all', 'PetController@getPetAllData')
    Route.api('get','/pet/:id?', 'PetController@getPetDataById')
    Route.api('get','/pet/user/:account?', 'PetController@getPetListDataByAccount')
    Route.api('post','/pet', 'PetController@addPetDataById')
    Route.api('post','/pet/:id?', 'PetController@updatePetDataById')

    // UserController
    Route.api('get','/login', 'UserController@getUserLogin')

    // PetStatusController
    Route.api('get','/pet/status/all', 'PetStatusController@getPetStatusAllData')
    Route.api('get','/pet/status/:type?', 'PetStatusController@getPetStatusDataByType')

    return Route
}

