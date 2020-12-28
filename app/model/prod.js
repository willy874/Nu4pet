const Model = require('./core')

module.exports = class ProdModel extends Model {
    constructor(){
        super({
            table: 'prod',
            fillable: ['id','subject','content','sale_price','original_price','created_at','updated_at','deleted_at']
        })
    }
}