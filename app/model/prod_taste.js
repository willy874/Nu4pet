const Model = require('./core')

module.exports = class PetStatusModel extends Model {
    constructor(){
        const fillable = ['id','name','subject']
        super({
            table: 'prod_taste',
            fillable
        })
    }
}