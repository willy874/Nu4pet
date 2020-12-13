const Model = require('./core')

module.exports = class UserModel extends Model {
    constructor(){
        super({
            table: 'user',
            fillable: ['id','account','password','name','email','created_at','updated_at','deleted_at','pet']
        })
    }
}