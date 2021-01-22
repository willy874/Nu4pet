import ProdModel from './prod'
import PetModel from './pet'

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
  }
}