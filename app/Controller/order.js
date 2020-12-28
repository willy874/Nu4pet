const Controller = require('./core')
// const Model = require('../model')
const getRecommend = require('./data/get-recommend')

module.exports = class PetStatusController extends Controller {
    constructor(app){
        super(app)
    }
    getRecommend(req, res){
        const {
            // user_id,
            // account,
            count
        } = req.query
        const response = getRecommend(count || 6)
        res.send( response )
    }
}