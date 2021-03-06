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
                const ProdImageModel = new Model.ProdImage
                const ProdImageData = ProdImageModel.where('prod_id',p.prod_id).get()
                const ProdData = ProdModel.where('id',d.prod_id).get().find(p=>p) || {}
                const PetData = PetModel.where('id',d.pet_id).get().find(p=>p) || {}
                return {
                    ...ProdData,
                    image: ProdImageData,
                    pet: PetData,
                    count: d.count,
                    order_code: d.order_code
                }
            })
        })
        res.send( response )
    }
    getRecordAddress(req, res){
        const { account } = req.params
        const UserModel = new Model.User
        const UserData = UserModel.where('account',account).get().find(p=>p)
        const RecordModel = new Model.Record
        const RecordData = RecordModel.where('user_id',UserData.id).get()
        const response = RecordData.map(p=>{
            return {
                id: p.id,
                address_code: p.address_code,
                address_city: p.address_city,
                address_area: p.address_area,
                address: p.address
            }
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
                const ProdImageModel = new Model.ProdImage
                const ProdImageData = ProdImageModel.where('prod_id',p.prod_id).get()
                const ProdData = ProdModel.where('id',p.prod_id).get().find(p=>p) || {}
                const PetData = PetModel.where('id',p.pet_id).get().find(p=>p) || {}
                return {
                    ...ProdData,
                    image: ProdImageData,
                    shop_car_id: p.id,
                    pet: PetData,
                    count: p.count,
                    order_code: p.order_code
                }
            })
        }
        const response = data || {}
        res.send( response )
    }
    addRecordData(req, res){
        const RecordModel = new Model.Record
        const RecordRelationModel = new Model.RecordRelation
        const body = req.body
        body.order_code = `N000${RecordRelationModel.get().length}`
        const RecordId = RecordModel.add(req.body)
        const ShopCarList = req.body.ShopCarList
        ShopCarList.forEach((shopCar,index)=>{
            const relation = {
                record_id: RecordId,
                prod_id: shopCar.id,
                user_id: shopCar.user_id,
                pet_id: shopCar.pet_id,
                order_code: shopCar.is_pet_customized ? `R${RecordId}${shopCar.id}${RecordRelationModel.get().length}${index}` : '',
                count: shopCar.is_pet_customized ? 1 : shopCar.count
            }
            if (shopCar.is_pet_customized) {
                const customizedData = new Array(shopCar.count).fill()
                customizedData.forEach(()=>{
                    RecordRelationModel.add(relation)
                })
            }else{
                RecordRelationModel.add(relation)
            }
        }) 
        const response = {
            toRouter: 3
        }
        res.send( response )
    }
    updateRecordData(req, res){
        const RecordModel = new Model.Record
        const RecordRelationModel = new Model.RecordRelation
        RecordModel.update(req.body)
        const ShopCarList = req.body.ShopCarList
        ShopCarList.forEach(shopCar=>{
            RecordRelationModel.update({
                ...shopCar,
                id: shopCar.shop_car_id,
                prod_id: shopCar.id
            })
        })
        const response = {
            toRouter: 0
        }
        res.send( response )
    }
    updateRecordShopCarListData(req, res){
        const RecordRelationModel = new Model.RecordRelation
        RecordRelationModel.update({
            ...req.body,
            id: req.body.shop_car_id,
            prod_id: req.body.id
        })
        res.send( 'success' )
    }
    getPayMethodData(req, res){
        const { order } = req.query
        const RecordModel = new Model.Record
        const RecordData = RecordModel.where('order_code',order).get().find(p=>p)
        if (RecordData.pay === 'atm') {
            const response = {
                bank_code: '013',
                virtual_account: '40430110053565',
                payment_deadline: '2021/01/10 23:59:59',
            }
            res.send( response )
        }else if(RecordData.pay === 'staging'){
            const limt = 3
            const response = {
                staging_price: RecordData.total_price  / limt,
                staging_limt: limt
            }
            res.send( response )
        }else{
            res.status('500').send( '無資料' )
        }
    }
    getRecordCountByAccount(req, res){
        const UserModel = new Model.User
        const user = UserModel.where('account',req.params.account).get()
        const userId = (user.length) ? user[0].id : 0
        const RecordModel = new Model.Record
        const response = RecordModel.where('user_id',userId).get().length
        res.send({
            count: response
        })
    }
    getRecordDataByPetId(req, res){
        const { id } = req.params
        const RecordRelationModel = new Model.RecordRelation
        const RecordRelationData = RecordRelationModel.where('pet_id',id).get()
        const response = []
        RecordRelationData.forEach((data, index) => {
            // const RecordModel = new Model.Record
            // const RecordData = RecordModel.where('id',data.record_id).get().find(p=>p)
            const ProdModel = new Model.Prod
            const ProdData = ProdModel.where('id',data.prod_id).get().find(p=>p)
            const ProdImageModel = new Model.ProdImage
            const ProdImageData = ProdImageModel.where('prod_id',ProdData.id).get()
            ProdData.image = ProdImageData
            response[index] = Object.assign(ProdData,data)
        })
        res.send(response)
    }
}