const Model = require('./core')

module.exports = class PetStatusModel extends Model {
    constructor(){
        const fillable = ['id','type','name','text','physiological','disease','eat','image_url']
        super({
            table: 'pet_status',
            fillable
        })
    }
}