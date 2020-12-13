const Controller = require('./core')
const Model = require('../model')

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
                res.send( UserData )
            }else{
                res.status(500).send('密碼錯誤')
            }
        }else{
            res.status(500).send('無此帳號')
        }
    }
}