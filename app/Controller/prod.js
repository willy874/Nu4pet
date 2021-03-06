const Controller = require('./core')
const Model = require('../model')

module.exports = class ProdController extends Controller {
    constructor(app){
        super(app)
    }
    getProdListData(req, res){
        const ProdModel = new Model.Prod
        const response = ProdModel.pagination(req.query)
        response.data.forEach(p=>{
            const ProdImageModel = new Model.ProdImage
            p.image = ProdImageModel.where('prod_id',p.id).get()
        })
        res.send( response )
    }
    getProdAllData(req, res){
        const ProdModel = new Model.Prod
        const response = ProdModel.get()
        response.forEach(p=>{
            const ProdImageModel = new Model.ProdImage
            p.image = ProdImageModel.where('prod_id',p.id).get()
        })
        res.send( response )
    }
    getProdDataById(req, res){
        const { id } = req.params
        const ProdModel = new Model.Prod
        const data = ProdModel.get().find(p=>Number(p.id)===Number(id))
        if (data) {
            const ProdImageModel = new Model.ProdImage
            data.image = ProdImageModel.where('prod_id',id).get()
        }
        const response = data || {}
        res.send( response )
    }
}