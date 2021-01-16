const Model = require('./core')

module.exports = class RecordModel extends Model {
    constructor(){
        const fillable = ['id','user_id','order_code','status','name','sex','phone','email',
        'address_code','address_area','address_city','address','pay','card_code','card_date','card_security',
        'invoice_type','invoice_code','corporation_name','corporation_code','invoice_donate','invoice_donate_code',
        'donate_price','prod_price','prod_price','point_discount','point_discount','sale_code',
        'bank_code','virtual_account','payment_deadline',
        'shop_discount','code_discount','shipping_rate','max_point_discount','order_point','total_price',
        'created_at','updated_at','deleted_at']
        super({
            table: 'record',
            fillable
        })
    }
}