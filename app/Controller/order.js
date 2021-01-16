const Controller = require('./core')
const Model = require('../model')
const getRecommend = require('./data/get-recommend')
const fs = require('fs')

module.exports = class PetStatusController extends Controller {
    constructor(app){
        super(app)
    }
    getRecommend(req, res){
        const { id } = req.params
        if (isNaN(Number(id))) {
            // 字串
        }else{
            // 數字
        }
        const response = getRecommend(6)
        res.send( response )
    }
    getDiscountRules(req, res){
        const { id } = req.params
        // const UserModel = new Model.User
        // const ProdModel = new Model.Prod
        // const ShopCarModel = new Model.ShopCar
        if (isNaN(Number(id))) {
            // 字串
        }else{
            // 數字
        }
        const response = {
            giveaway: [{
                id: 1,
                title: '滿額贈',
                description: '消費滿888即贈「黑木耳罐罐」<br/>（可累計 / 上限6罐）',
                image_url: './assets/image/prod-01.min.jpg',
                disabled: true
            }],
            shop_discount: Math.floor(Math.random() * Math.floor(100)),
            shipping_rate: 50,
            max_point_discount: 1000,
            order_point: Math.floor(Math.random() * Math.floor(5000))
        }
        res.send( response )
    }
    getSaleCodeDiscount(req, res){
        const { code } = req.params
        const code_discount = 'nu4pet'
        const response = (code===code_discount) ? (Math.floor(Math.random() * Math.floor(100))) : 0
        res.send( String(response) )
    }
    getCity(req, res){
        const response = JSON.parse(fs.readFileSync(`./app/db/city.json`).toString())
        res.send( response )
    }
    getPayMethod(req, res){
        const PayMethodData = new Model.PayMethod
        const response = PayMethodData.get()
        res.send( response )
    }
    checkMobileVehicle(req, res){
        const { code } = req.params
        const code_discount = 'nu4pet'
        if (code===code_discount) {
            res.send( 'OK' )
        }else{
            res.status('500').send( '找不到該條碼' )
        }
    }
    checkNaturalVehicle(req, res){
        const { code } = req.params
        const code_discount = 'nu4pet'
        if (code===code_discount) {
            res.send( 'OK' )
        }else{
            res.status('500').send( '找不到該條碼' )
        }
    }
    getVirtualAccount(req, res){
        const { order } = req.query
        const response = {
            order_code: order,
            bank_code: '013',
            virtual_account: '40430110053565',
            payment_deadline: '2021/01/10 23:59:59',
        }
        res.send( response )
    }
    checkCardCode(req, res){
        if (req.body.card_code&&req.body.card_date&&req.body.card_security) {
            res.send( 'OK' )
        }else{
            res.status('500').send( '信用卡資料不正確' )
        }
    }
}