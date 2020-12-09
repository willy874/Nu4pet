const Controller = require('./core')
const Model = require('../model')

module.exports = class PetController extends Controller {
    constructor(app){
        super(app)
    }
    getPetAllData(req, res){
        const PetModel = new Model.Pet
        res.send( PetModel.get() )
    }
    getPetListData(req, res){
        const PetModel = new Model.Pet
        res.send( PetModel.pagination(req.query) )
    }
    getPetDataById(req, res){
        const PetModel = new Model.Pet
        const { id } = req.params
        const data = PetModel.get().find(p=>Number(p.id)===Number(id))
        res.send(data || {})
    }
}