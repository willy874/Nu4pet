const Model = require('./core')

module.exports = class RecordModel extends Model {
    constructor(){
        const fillable = ['id','order_code','status','name','sex','address_code','address_city','address_area','address',
        'email','phone','pay','card_code','card_date','card_security','donate_price','prod_price','prod_point',
        'created_at','updated_at','deleted_at']
        super({
            table: 'record',
            fillable
        })
    }
}