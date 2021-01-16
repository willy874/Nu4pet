const Controller = require('./core')
const Model = require('../model')
const getRecommend = require('./data/get-recommend')

module.exports = class UserController extends Controller {
    constructor(app){
        super(app)
    }
    getUserLogin(req, res){
        const UserModel = new Model.User
        const {
            account,
            password
        } = req.query
        const UserData = UserModel.where('account',account).get().find(p=>p)
        if (UserData) {
            if (UserData.password === password) {
                const PetModel = new Model.Pet
                UserData.pet = PetModel.where('user_id',UserData.id).get()
                const response = UserData
                UserData.pet.forEach(p=>{
                    p.recommend = getRecommend(3)
                })
                res.send( response )
                
            }else{
                res.status(500).send('密碼錯誤')
            }
        }else{
            res.status(500).send('無此帳號')
        }
    }
    updateUserData(req, res){
        const UserModel = new Model.User
        UserModel.update(req.body)
        res.send( 'success' )
    }
}