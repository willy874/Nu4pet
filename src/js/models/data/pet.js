import DataModel from './data-model'
// import ImageModel from './image'

export default class PetModel extends DataModel {
    constructor(args) {
        super(args)
        const entity = this.entity || {}
        this.id = entity.id || 0
        this.sort = entity.sort || 0
        this.name = entity.name || ''
        this.type = entity.type || 'dog'
        this.sex = entity.sex || 'M'
        this.age = entity.age || '0'
        this.variety = entity.variety || ''
        this.body_weight = entity.body_weight || ''
        this.ligation = entity.ligation || false
        this.active = entity.active || 'NormallyActive'
        this.body_type = entity.body_type || 'M'
        this.snacks = entity.snacks || false
        this.status = (()=>{
            if (typeof entity.status === 'string') {
                return entity.status.split(',')
            }else if (Array.isArray(entity.status)){
                return entity.status
            }
            return []
        })()
        this.memo = entity.memo || ''
        this.image_url = entity.image_url || ''
        // this.image = entity.image&&entity.image.length&&[].map.apply(entity.image,p=>new ImageModel(p)) || []
        this.protein = entity.protein || 0
        this.fat = entity.fat || 0
        this.metabolism = entity.metabolism || 0
        this.recommend = entity.recommend && entity.recommend.map(item =>{
            return item
        }) || []
    }
    toDatabase(addObject) {
        const formData = new FormData()
        if(this.id) formData.append('id',this.id)
        formData.append('sort',this.sort)
        formData.append('name',this.name)
        formData.append('type',this.type)
        formData.append('sex',this.sex)
        formData.append('age',this.age)
        formData.append('variety',this.variety)
        formData.append('body_weight',this.body_weight)
        formData.append('ligation',this.ligation)
        formData.append('active',this.active)
        formData.append('body_type',this.body_type)
        formData.append('snacks',this.snacks)
        formData.append('status',this.status.join(','))
        formData.append('memo',this.memo)
        formData.append('body_weight',this.body_weight)
        formData.append('image_file',this.image_file)
        formData.append('image_url',this.image_url)
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
            variety: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫品種'
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