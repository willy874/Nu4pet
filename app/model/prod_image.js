const Model = require('./core')

module.exports = class ProdImageModel extends Model {
    constructor(){
        const fillable = ['id','prod_id','url','created_at','updated_at','deleted_at']
        super({
            table: 'prod_image',
            fillable
        })
    }
}