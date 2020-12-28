// import Validate from 'validate.js'
import DataModel from './data-model'
import '../validate'

// RequestPayloadModel
export default class ListModel {
    constructor(args) {
        const entity = (() => {
            if (args) {
                return (typeof args === 'string') ? JSON.parse(args) : args
            }
            return {}
        })()
        const Model = entity.model || DataModel
        this.data = entity.data && entity.data.map(p=>new Model(p)) || []
        this.listErrors = entity.listErrors || []
        this.loaded = entity.loaded || !args
        this.definePropertySet({
            entity,
            modelType: Model
        },{
            enumerable: false,
            writable: true,
        })
    }
    definePropertySet(obj,set){
        Object.keys(obj).forEach(key=>{
            const setting = set || {}
            setting.value = obj[key]
            Object.defineProperty(this,key,setting)
        })
    }
}
