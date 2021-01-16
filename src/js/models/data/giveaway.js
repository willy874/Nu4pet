import DataModel from './data-model'

export default class GiveawayModel extends DataModel {
  constructor(args){
    super(args)
    const entity = this.entity || {}
    this.id = entity.id || 0
    this.title = entity.title || ''
    this.description = entity.description || ''
    this.image_url = entity.image_url || ''
    this.disabled = entity.disabled || false
  }
}