// import Validate from 'validate.js'
import DataModel from './data-model'
import '../validate'

// RequestPayloadModel
export default class ListModel extends Array {
    constructor(args) {
        super()
        const entity = args ? args : {}
        const data = entity.data || []
        const Model = entity.model || DataModel
        data.forEach((item,index)=>{
            this[index] = new Model(item)
        })
        this.definePropertySet({
            listErrors: [],
            loaded: entity.loaded || !args
        },{
            enumerable: false,
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
