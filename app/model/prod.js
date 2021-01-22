const Model = require('./core')

module.exports = class ProdModel extends Model {
    constructor(){
        super({
            table: 'prod',
            fillable: ['id','subject','content','sale_price','pet_size','case','original_price','is_pet_customized','created_at','updated_at','deleted_at']
        })
    }
}
// "pet_size": "3.4kg以下"