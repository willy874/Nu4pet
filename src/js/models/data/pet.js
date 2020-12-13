import DataModel from './data-model'

export default class PetModel extends DataModel {
    constructor(args) {
        super(args)
        console.log();
        const entity = args ? args : {}
        this.id = entity.id || 0
        this.sort = entity.sort || 0
        this.name = entity.name || ''
        this.type = entity.type || ''
        this.sex = entity.sex || ''
        this.age = entity.age || ''
        this.variety = entity.variety || ''
        this.body_weight = entity.body_weight || ''
        this.ligation = entity.ligation || false
        this.active = entity.active || ''
        this.body_type = entity.body_type || ''
        this.snacks = entity.snacks || false
        this.status = Array.isArray(entity.status)&&entity.status || []
        this.memo = entity.memo || ''
        this.image_url = entity.image_url || ''
        this.created_at = entity.created_at || null
        this.updated_at = entity.updated_at || null
        this.deleted_at = entity.deleted_at || null
    }
    toDatabase(addObject) {
        const formData = new FormData()
        formData.append('sort',this.sort)
        formData.append('name',this.name)
        formData.append('age',this.age)
        formData.append('body_weight',this.body_weight)
        formData.append('image_file',this.image_file)
        for (const key in addObject) {
            if (Object.hasOwnProperty.call(addObject,key)) {
                formData.append(key,addObject[key])
            }
        }
        return formData
    }
    rules() {
        return {
            name: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫名字'
                }
            },
            age: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫年齡'
                }
            },
            body_weight: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫體重'
                }
            },
        }
    }
}