import DataModel from './data-model'
import { v4 as uuidv4 } from 'uuid';

export default class UserModel extends DataModel {
  constructor(args){
    super(args)
    const entity = args ? args : {}
    this.id = entity.uuid || uuidv4()
    this.name = entity.name || ''
    this.account = entity.account || ''
    this.password = entity.password || ''
    this.createDate = entity.create_date || ''
    const competence = (typeof entity.competence === 'string') ? JSON.parse(entity.competence) : entity.competence
    this.competence = competence || []
  }
  toDatabase(){
    return {
      id: this.id,
      name: this.name
    }
  }
  rules(){
    return {
      id: {
        presence:{
          allowEmpty: false,
          message: '^請填寫id'
        }
      }
    }
  }
}