const Controller = require('./core')
const Model = require('../model')
const formidable = require('formidable')
const getRecommend = require('./data/get-recommend')


module.exports = class PetController extends Controller {
    constructor(app){
        super(app)
    }
    getPetAllData(req, res){
        const PetModel = new Model.Pet
        const response = PetModel.get()
        response.forEach(p=>{
            p.recommend = getRecommend(3)
        })
        res.send( response )
    }
    getPetListData(req, res){
        const PetModel = new Model.Pet
        const response = PetModel.pagination(req.query)
        response.data.forEach(p=>{
            p.recommend = getRecommend(3)
        })
        res.send( response )
    }
    getPetListDataByAccount(req, res){
        const UserModel = new Model.User
        const user = UserModel.where('account',req.params.account).get()
        const userId = (user.length) ? user[0].id : 0
        const PetModel = new Model.Pet
        const response = PetModel.where('user_id',userId).pagination(req.query)
        response.data.forEach(p=>{
            p.recommend = getRecommend(3)
        })
        res.send( response )
    }
    getPetDataById(req, res){
        const PetModel = new Model.Pet
        const { id } = req.params
        const data = PetModel.get().find(p=>Number(p.id)===Number(id))
        if (data) {
            data.recommend = getRecommend(3)
        }
        const response = data || {}
        res.send(response)
    }
    addPetData(req, res){
        const PetModel = new Model.Pet
        PetModel.add(req.body)
        res.send('success')
    }
    updatePetDataById(req, res){
        // param-3 files
        const form = new formidable.IncomingForm()
        form.parse(req, function(err,fields) {
            if (err) {
                return 
            }
            const PetModel = new Model.Pet
            PetModel.update(fields)
            // const delayTimeout = setTimeout(() => {
            //     res.send('success')
            // },1000);
            // clearTimeout(delayTimeout);
            res.send('success')
        })
    }
}