const Controller = require('./core')
const Model = require('../model')

module.exports = class ShopController extends Controller {
    constructor(app){
        super(app)
    }
    getShopAllData(req, res){
        const ShopModel = new Model.Shop
        res.send( ShopModel.get() )
    }
    getShopListData(req, res){
        const ShopModel = new Model.Shop
        res.send( ShopModel.pagination(req.query) )
    }
    getShopDataById(req, res){
        const ShopModel = new Model.Shop
        const { id } = req.params
        const data = ShopModel.get().find(p=>Number(p.id)===Number(id))
        res.send(data || {})
    }
}