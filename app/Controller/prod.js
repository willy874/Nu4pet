const Controller = require('./core')
const Model = require('../model')

module.exports = class ProdController extends Controller {
    constructor(app){
        super(app)
    }
    getProdAllData(req, res){
        const ProdModel = new Model.Prod
        const ProdImageModel = new Model.ProdImage
        const response = ProdModel.get()
        response.forEach(p=>{
            p.image = ProdImageModel.where('prod_id',p.id).get()
        })
        res.send( response )
    }
    getProdListData(req, res){
        const ProdModel = new Model.Prod
        const ProdImageModel = new Model.ProdImage
        const response = ProdModel.pagination(req.query)
        response.forEach(p=>{
            p.image = ProdImageModel.where('prod_id',p.id).get()
        })
        res.send( response )
    }
    getProdDataById(req, res){
        const { id } = req.params
        const ProdModel = new Model.Prod
        const ProdImageModel = new Model.ProdImage
        const data = ProdModel.get().find(p=>Number(p.id)===Number(id))
        if (data) {
            data.image = ProdImageModel.where('prod_id',id).get()
        }
        const response = data || {}
        res.send( response )
    }
}