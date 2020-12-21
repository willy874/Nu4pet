const Controller = require('./core')
const Model = require('../model')

module.exports = class ProdController extends Controller {
    constructor(app){
        super(app)
    }
    getProdAllData(req, res){
        const ProdModel = new Model.Prod
        const response = ProdModel.get()
        res.send( response )
    }
    getProdListData(req, res){
        const ProdModel = new Model.Prod
        const response = ProdModel.pagination(req.query)
        res.send( response )
    }
    getProdDataById(req, res){
        const ProdModel = new Model.Prod
        const { id } = req.params
        const data = ProdModel.get().find(p=>Number(p.id)===Number(id))
        const response = data || {}
        res.send( response )
    }
}