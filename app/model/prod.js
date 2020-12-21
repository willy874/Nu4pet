const Model = require('./core')

module.exports = class ProdModel extends Model {
    constructor(){
        super({
            table: 'prod',
            fillable: []
        })
    }
}