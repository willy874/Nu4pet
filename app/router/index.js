/* eslint-disable no-unused-vars */
const route = require('./route')
//const ListModel = require('../../src/js/models/data/list-model')
//const ProdModel = require('../../src/js/models/data/prod')
//const PetModel = require('../../src/js/models/data/pet')
//const UserModel = require('../../src/js/models/data/user')
//const ShopCarModel = require('../../src/js/models/data/shop_car')
//const RecordModel = require('../../src/js/models/data/record')
//const GiveawayModel = require('../../src/js/models/data/giveaway')

module.exports = (args)=>{
    const Route = new route(args)
    Route.get('/', (req,res)=>{
        res.send('Hello! This is serve system.')
    })

    /**
     * API
     */

    // ProdController
    // Route.api('get','/prod', 'ProdController@getProdListData')
    // Route.api('get','/prod/all', 'ProdController@getProdAllData')
    // Route.api('get','/prod/:id?', 'ProdController@getProdDataById')

    // PetController
    /**
     * @query {page,per}
     * page: 要取得的頁數，不提供預設為第一頁
     * per: 最大顯示筆數
     * @response ListModel<PetModel>
     */
    Route.api('get','/pet', 'PetController@getPetListData')
    /**
     * @response Array<PetModel>
     */
    Route.api('get','/pet/all', 'PetController@getPetAllData')
    /**
     * @params {id}
     * id: 依據 User 的 id 來搜尋
     * @response PetModel
     */
    Route.api('get','/pet/:id?', 'PetController@getPetDataById')
    /**
     * @params {account}
     * account: 依據 User 的 account 來搜尋
     * @response ListModel<PetModel>
     */
    Route.api('get','/pet/user/:account?', 'PetController@getPetListDataByAccount')
    /**
     * @request PetModel
     * @ContentType FromData
     */
    Route.api('post','/pet', 'PetController@addPetData')
    /**
     * @params {id}
     * id: 依據 User 的 id 來搜尋
     * @request PetModel
     * @ContentType FromData
     */
    Route.api('post','/pet/:id?', 'PetController@updatePetDataById')

    // PetStatusController
    /**
     * @response Array<PetStatusModel>
     */
    Route.api('get','/pet/status/all', 'PetStatusController@getPetStatusAllData')
    /**
     * @params {type}
     * type: 依據 Pet 的 type 來搜尋，目前只有 dog && cat
     * @response Array<PetStatusModel>
     */
    Route.api('get','/pet/status/:type?', 'PetStatusController@getPetStatusDataByType')

    // UserController
    /**
     * @query {account,password}
     * @response UserModel
     */
    Route.api('get','/login', 'UserController@getUserLogin')
    /**
     * @request UserModel
     */
    Route.api('put','/user', 'UserController@updateUserData')

    // ShopCarController
    // 注意事項: ShopCarModel 內的 id 是指 prod_id ，而真正的 id 是 shop_car_id
    /**
     * @query {id,account}
     * id: 依據 ShopCar 的 id 來搜尋
     * account: 依據 User 的 account 來搜尋
     * @response ShopCarModel
     */
    Route.api('get','/shopcar', 'ShopCarController@getShopCarData')
    /**
     * @request ShopCarModel
     */
    Route.api('post','/shopcar', 'ShopCarController@addShopCarData')
    /**
     * @request ShopCarModel
     */
    Route.api('put','/shopcar', 'ShopCarController@updateShopCarData')
    /**
     * @params {id}
     */
    Route.api('delete','/shopcar/:id?', 'ShopCarController@deleteShopCarData')

    // RecordController
    // Route.api('get','/record/all', 'RecordController@getRecordAllData')
    /**
     * @query {order}
     * order: 依據 Record 的 order_code 來搜尋
     * @response RecordModel
     */
    Route.api('get','/record/pay', 'RecordController@getPayMethodData')
    /**
     * @params {account}
     * account: 依據 User 的 account 來搜尋
     * @response {id,address_code,address_city,address_area,address}
     */
    Route.api('get','/record/address/:account?', 'RecordController@getRecordAddress')
    /**
     * @params {account}
     * account: 依據 User 的 account 來搜尋
     * @response RecordModel
     */
    Route.api('get','/record/count/:account?', 'RecordController@getRecordCountByAccount')
    /**
     * @params {id}
     * id: 依據 Record 的 id 來搜尋
     * @response RecordModel
     */
    Route.api('get','/record/:id?', 'RecordController@getRecordDataById')
    /**
     * @request RecordModel
     * @response = { toRouter: Number }
     */
    Route.api('post','/record', 'RecordController@addRecordData')
    /**
     * @request RecordModel
     * @response = { toRouter: Number }
     */
    Route.api('put','/record', 'RecordController@updateRecordData')
    /**
     * @request RecordModel
     */
    Route.api('put','/record/shopcar', 'RecordController@updateRecordShopCarListData')

    // OrderController
    /**
     * @response city data，參照 app/db/city.json
     */
    Route.api('get','/city', 'OrderController@getCity')
    /**
     * @response city data，參照 app/db/city.json
     */
    Route.api('get','/prod/taste/:id?', 'OrderController@getProdTaste')
    /**
     * @params {id}
     * id: 依據 User 的 id 來搜尋
     * @response Array<ProdModel>
     */
    Route.api('get','/recommend/user/:id?', 'OrderController@getRecommend')
    /**
     * @params {id}
     * id: 依據 User 的 id 來搜尋
     * @response {
     *      giveaway: Array<GiveawayModel>
     *      shop_discount: Number,
     *      shipping_rate: Number,
     *      max_point_discount: Number,
     *      order_point: Number
     * }
     */
    Route.api('get','/discount/user/:id?', 'OrderController@getDiscountRules')
    /**
     * @params {code}
     * code: 依據折價碼字串進行比對搜尋
     * @response {code_discount: String }
     * code_discount: 回應一個數字形式的字串，代表折價碼能折扣的金額。
    */
    Route.api('post','/discount/salecode/:code?', 'OrderController@getSaleCodeDiscount')
    /**
     * @response Array<PayMethodModel>
     */
    Route.api('get','/pay/method','OrderController@getPayMethod')
    /**
     * @params {code}
     * code: 確認是否為合法手機條碼
     */
    Route.api('get','/vehicle/mobile/:code?', 'OrderController@checkMobileVehicle')
    /**
     * @params {code}
     * code: 確認是否為合法自然人憑證條碼
     */
    Route.api('get','/vehicle/natural/:code?', 'OrderController@checkNaturalVehicle')
    /**用來驗證信用卡
     * @request RecordModel
     * @response 'OK' 或 http code 500
     */
    Route.api('post','/pay/card', 'OrderController@checkCardCode')

    // ToolController
    Route.get('/api/svg/all','ToolController@getSvgAll')
    Route.post('/api/svg/create','ToolController@createSvgJavascript')
    Route.put('/api/svg/index','ToolController@updateSvgIndex')

    return Route
}

