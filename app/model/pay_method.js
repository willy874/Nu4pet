const Model = require('./core')

module.exports = class PetStatusModel extends Model {
    constructor(){
        const fillable = ['id','name','title','description','disabled']
        super({
            table: 'pay_method',
            fillable
        })
    }
}