import DataModel from './data-model'
import ImageModel from './image'
import { v4 as uuidv4 } from 'uuid';

export default class ArticleModel extends DataModel {
    constructor(args) {
        super(args)
        const entity = args ? args : {}
        this.id = entity.uuid || uuidv4()
        this.sort = entity.sort || 0
        this.subject = entity.subject || ''
        this.content = entity.content || ''
        this.link_url = entity.link_url || ''
        this.keywords = entity.keywords || ''
        this.images = entity.images && entity.images.map(image => new ImageModel(image)) ||　null
        this.attachments = entity.attachments || null
        this.created_at = entity.created_at || null
        this.updated_at = entity.updated_at || null
        this.deleted_at = entity.deleted_at || null
        this.node_id = entity.node_id || ''
        this.created_user = entity.created_user || ''
        this.updated_user = entity.updated_user || ''
        this.deleted_user = entity.deleted_user || ''
        this.article_status = entity.article_status || 0
        this.published_at = entity.published_at || null
        this.finished_at = entity.finished_at || null
        
    }
    toDatabase(addObject) {
        return Object.assign({
            uuid: this.id,
            sort: this.sort,
            subject: this.subject,
            content: this.content,
            link_url: this.link_url,
            keywords: this.keywords,
            article_status: this.article_status,
            published_at: this.published_at,
            finished_at: this.finished_at
        }, addObject)
    }
    getImageArray(){
        const imageArray = []
        if(this.images){
            this.images.forEach(image =>{
                image.article_id = this.id
                imageArray.push(image)
            })
        }
        return imageArray
    }
}