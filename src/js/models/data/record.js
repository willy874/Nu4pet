import DataModel from './data-model'
import ShopCarModel from './shop_car'

/**
 * @param {Number} id 
 * @param {Number} user_id 
 * @param {String} order_code 
 * @param {String} status 
 * @param {String} name 
 * @param {String} sex 
 * @param {String} phone 
 * @param {String} email 
 * @param {String[3]} address_code 
 * @param {String} address_city 
 * @param {String} address_area 
 * @param {String} address 
 * @param {String} pay 
 * @param {String} card_code 
 * @param {String} card_date 
 * @param {String[3]} card_security 
 * @param {Number} donate_price 
 * @param {Number} prod_price 
 * @param {Number} prod_point 
 * @param {Array<ShopCarModel>} ShopCarList 
 */
export default class RecordModel extends DataModel {
    constructor(args){
      super(args)
      const entity = this.entity || {}
      this.id = entity.id || 0
      this.user_id = entity.user_id || 0
      this.order_code = entity.order_code || ''
      // ready
      this.status = entity.status || 'ready'
      this.name = entity.name || ''
      this.sex = entity.sex || ''
      this.phone = entity.phone || ''
      this.email = entity.email || ''
      this.address_code = entity.address_code || ''
      this.address_city = entity.address_city || ''
      this.address_area = entity.address_area || ''
      this.address = entity.address || ''
      this.pay = entity.pay || ''
      this.card_code = entity.card_code || ''
      this.card_date = entity.card_date || ''
      this.card_security = entity.card_security || ''
      this.donate_price = entity.donate_price || 0
      this.prod_price = entity.prod_price || 0
      this.prod_point = entity.prod_point || 0
      this.ShopCarList = entity.ShopCarList && entity.ShopCarList.map(p=>new ShopCarModel(p)) || []
    }
    toDatabase(){
      return {
        id: this.id,
      }
    }
    rules(){
      return {
        
      }
    }
  }