const Model = require('./core')

module.exports = class UserModel extends Model {
    constructor(){
        const fillable = ['id','account','password','name','sex','address_code','address_city','address_area','address',
        'email','phone','point','card_code','card_date','card_security','created_at','updated_at','deleted_at']
        super({
            table: 'user',
            fillable
        })
    }
}