const Controller = require('./core')
const Model = require('../model')

module.exports = class ShopCarController extends Controller {
    constructor(app){
        super(app)
    }
    getShopCarData(req, res){
        const {
            id,
            account,
            search
        } = req.query
        const ShopCarModel = new Model.ShopCar
        const ShopCarData = (()=>{
            if(account){
                const UserModel = new Model.User
                const UserData = UserModel.where('account',account).get().find(p=>p)
                const userId = UserData ? UserData.id : 0
                return ShopCarModel.where('user_id',userId).get()
            }else if(id){
                return ShopCarModel.where('user_id',id).get()
            }else if(search){
                return ShopCarModel.where(search,req.query[search]).get()
            }else{
                return ShopCarModel.get()
            }
        })()
        const response = []
        ShopCarData.forEach(p=>{
            const ProdModel = new Model.Prod
            const ProdImageModel = new Model.ProdImage
            const ProdData = ProdModel.where('id',p.prod_id).get().find(p=>p)
            const ProdImageData = ProdImageModel.where('prod_id',p.prod_id).get()
            ProdData.count = p.count
            ProdData.shop_car_id = p.id
            ProdData.image = ProdImageData
            response.push(ProdData) 
        })
        res.send( response )
        
    }
    addShopCarData(req, res){
        const ShopCarModel = new Model.ShopCar
        ShopCarModel.add(req.body)
        res.send('success')
    }
    updateShopCarData(req, res){
        const ShopCarModel = new Model.ShopCar
        ShopCarModel.update(req.body)
        res.send('success')
    }
    deleteShopCarData(req, res){
        const { id } = req.params
        const ShopCarModel = new Model.ShopCar
        ShopCarModel.delete(id)
        res.send('success')
    }
}