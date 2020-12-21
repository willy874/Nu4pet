const Model = require('./core')

module.exports = class PetModel extends Model {
    constructor(){
        const fillable = [
            'id','sort','name','type','sex','age','variety','body_weight','ligation',
            'active','body_type','snacks','status','memo','image_url',
            'protein','fat','metabolism','user_id','created_at','updated_at','deleted_at'
        ]
        super({
            table: 'pet',
            fillable,
            middleware: {
                getTable: (table)=>{
                    const res = {}
                    fillable.forEach(key=>{
                        res[key] = table[key]
                    })
                    return res
                },
                addTable: (value,key)=>{
                    if(key==='status'&&Array.isArray(value))return value.join(',')
                    return value
                },
                updateTable: (value,key)=>{
                    if(key==='status'&&Array.isArray(value))return value.join(',')
                    return value
                }
            }
        })
    }
}