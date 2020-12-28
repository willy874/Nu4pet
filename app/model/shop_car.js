const Model = require('./core')

module.exports = class ShopCarModel extends Model {
    constructor(){
        const fillable = ['id','user_id','prod_id','count']
        super({
            table: 'shop_car',
            fillable
        })
    }
}