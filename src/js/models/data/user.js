import DataModel from './data-model'
import PetModel from './pet'

/**
 * @param {Number} id 
 * @param {String} account 
 * @param {String} password 
 * @param {String} name 
 * @param {String} sex M or G
 * @param {String[3]} address_code 
 * @param {String} address_city 
 * @param {String} address_area 
 * @param {String} address 
 * @param {String} email 
 * @param {String} phone 
 * @param {Number} point  
 * @param {String} bind_card_code 綁定信用卡卡號
 * @param {String} bind_card_date 綁定信用卡到期日
 * @param {String[3]} bind_card_security 綁定信用卡安全碼
 * @param {String} competence 
 * @param {Array<PetModel>} pet 用戶的寵物資訊
 */
export default class UserModel extends DataModel {
  constructor(args){
    super(args)
    const entity = this.entity || {}
    this.id = entity.id || 0
    this.account = entity.account || ''
    this.password = entity.password || ''
    this.name = entity.name || ''
    this.sex = entity.sex || ''
    this.address_code = entity.address_code || ''
    this.address_city = entity.address_city || ''
    this.address_area = entity.address_area || ''
    this.address = entity.address || ''
    this.email = entity.email || ''
    this.phone = entity.phone || ''
    this.point = entity.point || 0
    this.bind_card_code = entity.bind_card_code || ''
    this.bind_card_date = entity.bind_card_date || ''
    this.bind_card_security = entity.bind_card_security || ''
    // this.createDate = entity.create_date || ''
    const competence = (typeof entity.competence === 'string') ? JSON.parse(entity.competence) : entity.competence
    this.competence = competence || []
    this.pet = entity.pet && entity.pet.map(p=>new PetModel(p)) || []
  }
  toDatabase(){
    return {
      id: this.id,
      account: this.account
    }
  }
  rules(){
    return {
      
    }
  }
}