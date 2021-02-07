const Model = require('./core')

module.exports = class RecordRelation extends Model {
    constructor(){
        const fillable = ['id','order_code','user_id','prod_id','taste_date','taste_odd','taste_even','count','record_id','pet_id']
        super({
            table: 'record_relation',
            fillable
        })
    }
}