const Model = require('./core')

module.exports = class ShopModel extends Model {
    constructor(){
        super({
            table: 'shop',
            fillable: []
        })
    }
}