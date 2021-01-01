const Controller = require('./core')
const Model = require('../model')

module.exports = class RecordController extends Controller {
    constructor(args){
        super(args)
    }
    getRecordAllData(req, res){
        const RecordModel = new Model.Record
        const response = RecordModel.get()
        response.forEach(p=>{
            const RecordRelationModel = new Model.RecordRelation
            const ShopCarData = RecordRelationModel.where('record_id',p.id).get()
            p.ShopCarList = ShopCarData.map(d=>{
                const ProdModel = new Model.Prod
                const PetModel = new Model.Pet
                const ProdData = ProdModel.where('id',d.prod_id).get().find(p=>p) || {}
                const PetData = PetModel.where('id',d.pet_id).get().find(p=>p) || {}
                return {
                    ...ProdData,
                    pet: PetData,
                    count: d.count
                }
            })
        })
        res.send( response )
    }
    getRecordDataById(req, res){
        const { id } = req.params
        const RecordModel = new Model.Record
        const data = RecordModel.where('id',id).get().find(p=>p)
        if (data) {
            const RecordRelationModel = new Model.RecordRelation
            const ShopCarData = RecordRelationModel.where('record_id',data.id).get()
            data.ShopCarList = ShopCarData.map(p=>{
                const ProdModel = new Model.Prod
                const PetModel = new Model.Pet
                const ProdData = ProdModel.where('id',p.prod_id).get().find(p=>p) || {}
                const PetData = PetModel.where('id',p.pet_id).get().find(p=>p) || {}
                return {
                    ...ProdData,
                    pet: PetData,
                    count: p.count
                }
            })
        }
        const response = data || {}
        res.send( response )
    }
    addRecordData(req, res){
        const RecordModel = new Model.Record
        const RecordRelationModel = new Model.RecordRelation
        const RecordId = RecordModel.add(req.body)
        const ShopCarList = req.body.ShopCarList
        for(let i = 0; i < ShopCarList.length; i += 1) {
            const relation = {
                record_id: RecordId,
                prod_id: ShopCarList[i].id,
                user_id: ShopCarList[i].user_id,
                pet_id: ShopCarList[i].pet_id,
                count: ShopCarList[i].count
            }
            RecordRelationModel.add(relation)
        }
        res.send( 'success' )
    }
    updateRecordData(req, res){
        const RecordModel = new Model.Record
        RecordModel.update(req.body)
        res.send( 'success' )
    }
    deleteRecordData(){}
}