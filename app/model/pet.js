const Model = require('./core')

module.exports = class PetModel extends Model {
    constructor(){
        super({
            table: 'pet',
            fillable: ['id','name','type','sex','age','variety','weight','image']
        })
    }
}