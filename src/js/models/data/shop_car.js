import ProdModel from './prod'
import PetModel from './pet'
/**
* @param {String} taste_date 選擇的客製化寵量的出貨日期
* @param {String} taste_odd 選擇的客製化口味(單月)
* @param {String} taste_even 選擇的客製化口味(雙月)
 */
export default class ShopCarModel extends ProdModel {
  constructor(args){
    super(args)
    const entity = args ? args : {}
    this.shop_car_id = entity.shop_car_id || 0
    this.pet_id = entity.pet_id || 0
    this.pet = entity.pet && new PetModel(entity.pet) || undefined
    this.user_id = entity.user_id || 0
    this.count = entity.count || 0
    this.order_code = entity.order_code || ''
    this.taste_date = entity.taste_date || ''
    this.taste_odd = entity.taste_odd || ''
    this.taste_even = entity.taste_even || ''
  }
  rules(){
    return {
      taste_date: {
        presence: {
            allowEmpty: false,
            message: "^請選擇指定出貨日期"
        }
      },
      taste_odd: ()=> {
        if(this.case!=='year') return false
        return {
          presence: {
            allowEmpty: false,
            message: "^請選擇單月特調口味"
          }
        }
      },
      taste_even: ()=> {
        if(this.case!=='year') return false
        return {
          presence: {
            allowEmpty: false,
            message: "^請選擇雙月特調口味"
          }
        }
      }
    }
  }
}