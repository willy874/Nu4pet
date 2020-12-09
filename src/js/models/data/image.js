import DataModel from './data-model'
import { v4 as uuidv4 } from 'uuid';

export default class ImageModel extends DataModel {
    constructor(args) {
        super(args)
        const entity = args ? args : {}
        this.id = entity.uuid || uuidv4()
        this.sort = entity.sort || 0
        this.name = entity.name || ''
        this.size = entity.size || null
        this.url = entity.url || ''
        this.saveType = entity.saveType || null
        this.article_id = entity.article_id || null
        this.created_at = entity.created_at || null
        this.updated_at = entity.updated_at || null
        this.deleted_at = entity.deleted_at || null
        this.created_user = entity.created_user || ''
        this.updated_user = entity.updated_user || ''
        this.deleted_user = entity.deleted_user || ''
    }
    toDatabase(addObject) {
        const formData = new FormData()
        formData.append('uuid',this.id)
        formData.append('article_id',this.article_id)
        formData.append('sort',this.sort)
        formData.append('name',this.name)
        formData.append('size',this.size)
        formData.append('saveType',this.saveType)
        if (this.file) {
            formData.append('file',this.file)
        }else{
            formData.append('base64',this.url)
        }
        for (const key in addObject) {
            if (addObject.hasOwnProperty(key)) {
                formData.append(key,addObject[key])
            }
        }
        return formData
    }
    rules() {

    }
}