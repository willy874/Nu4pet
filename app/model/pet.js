const Model = require('./core')

module.exports = class PetModel extends Model {
    constructor(){
        super({
            table: 'pet',
            fillable: ['id','sort','name','type','sex','age','variety','body_weight','ligation','active','body_type','snacks','status','memo','image_url','created_at','updated_at','deleted_at'],
            middleware: {
                getTable: (table)=>{
                    return {
                        id: table.id,
                        sort: table.sort,
                        name: table.name,
                        type: table.type,
                        sex: table.sex,
                        age: table.age,
                        variety: table.variety,
                        body_weight: table.body_weight,
                        ligation: table.ligation,
                        active: table.active,
                        body_type: table.body_type,
                        snacks: table.snacks,
                        status: table.status.split(','),
                        memo: table.memo,
                        image_url: table.image_url,
                        created_at: table.created_at,
                        updated_at: table.updated_at,
                        deleted_at: table.deleted_at
                    }
                }
            }
        })
    }
}