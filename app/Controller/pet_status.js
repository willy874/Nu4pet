const Controller = require('./core')
const Model = require('../model')

module.exports = class PetStatusController extends Controller {
    constructor(app){
        super(app)
    }
    getPetStatusAllData(req, res){
        const PetStatusModel = new Model.PetStatus
        const response = PetStatusModel.get()
        res.send( response )
    }
    getPetStatusDataByType(req, res){
        const PetStatusModel = new Model.PetStatus
        const { type } = req.params
        const response = PetStatusModel.where('type',type).get()
        res.send( response )
    }
}