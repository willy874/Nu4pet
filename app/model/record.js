const Model = require('./core')

module.exports = class RecordModel extends Model {
    constructor(){
        const fillable = ['id',
        'created_at','updated_at','deleted_at']
        super({
            table: 'record',
            fillable
        })
    }
}