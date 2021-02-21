import DataModel from './data-model'
import ImageModel from './image'

export default class PetRecordModel extends DataModel {
  constructor(args){
    super(args)
    const entity = this.entity || {}
    console.log(entity)
    this.id = entity.id || 0
    this.prod_id = entity.prod_id || 0
    this.subject = entity.subject || ''
    this.content = entity.content || '' 
    this.sale_price = entity.sale_price || 0
    this.original_price = entity.original_price || 0
    this.is_pet_customized = entity.is_pet_customized || false
    this.pet_size = entity.pet_size || 0
    this.prod_size = entity.prod_size || ''
    this.case = entity.case || ''
    this.image = entity.image && entity.image.map(p=>new ImageModel(p)) || []
    this.count = entity.count || 0
    this.order_code = entity.order_code || ''
    this.taste_date = entity.taste_date || ''
    this.taste_odd = entity.taste_odd || ''
    this.taste_even = entity.taste_even || ''
  }
  rules(){
    return {
      
    }
  }
}