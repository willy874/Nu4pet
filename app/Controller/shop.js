const Controller = require('./core')

module.exports = class ShopController extends Controller {
    constructor(app){
        super(app)
    }
    getName(req, res){
        res.send('getName Hello World!')
    }
}