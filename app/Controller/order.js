const Controller = require('./core')
// const Model = require('../model')
const getRecommend = require('./data/get-recommend')
const fs = require('fs')

module.exports = class PetStatusController extends Controller {
    constructor(app){
        super(app)
    }
    getRecommend(req, res){
        const {
            id
        } = req.params
        if (isNaN(Number(id))) {
            // 字串
        }else{
            // 數字
        }
        const response = getRecommend(6)
        res.send( response )
    }
    getDiscountRules(req, res){
        const {
            id
        } = req.params
        // const UserModel = new Model.User
        // const ProdModel = new Model.Prod
        // const ShopCarModel = new Model.ShopCar
        if (isNaN(Number(id))) {
            // 字串
        }else{
            // 數字
        }
        const response = {
            giveaway: [],
            shop_discount: Math.floor(Math.random() * Math.floor(100)),
            shipping_rate: 50,
            max_point_discount: 1000,
            order_point: Math.floor(Math.random() * Math.floor(5000))
        }
        res.send( response )
    }
    getSaleCodeDiscount(req, res){
        const {
            code
        } = req.params
        const code_discount = 'nu4pet'
        const response = (code===code_discount) ? (Math.floor(Math.random() * Math.floor(100))) : 0
        res.send( String(response) )
    }
    getCity(req, res){
        const response = JSON.parse(fs.readFileSync(`./app/db/city.json`).toString())
        res.send( response )
    }
}