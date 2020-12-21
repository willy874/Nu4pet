import DataModel from './data-model'
export default class ImageModel extends DataModel {
    constructor(args) {
        super(args)
        const entity = args ? args : {}
        this.id = entity.id || 0
        this.name = entity.name || ''
        this.size = entity.size || null
        this.url = entity.url || ''
    }
    toDatabase(addObject) {
        const formData = new FormData()
        formData.append('id',this.id)
        formData.append('name',this.name)
        formData.append('size',this.size)
        formData.append('file',this.file)
        for (const key in addObject) {
            if (Object.hasOwnProperty.call(addObject,key)) {
                formData.append(key,addObject[key])
            }
        }
        return formData
    }
    rules() {

    }
}