import Validate from 'validate.js'
import '../validate'
import dayjs from 'dayjs'

/**
 * @param {*} args 若為 JSON 字串則會經過轉型
 * @param {String} created_at 該筆資料建立時間 YYYY/MM/DD HH:MM:ss
 * @param {String} updated_at 該筆資料最後編輯時間 YYYY/MM/DD HH:MM:ss
 * @param {String} deleted_at 該筆資料刪除時間 YYYY/MM/DD HH:MM:ss
 */
export default class DataModel {
    constructor(args) {
        const entity = (() => {
            if (args) {
                return (typeof args === 'string') ? JSON.parse(args) : args
            }
            return {}
        })()
        this.created_at = entity.created_at || dayjs().format('YYYY/MM/DD HH:mm:ss')
        this.updated_at = entity.updated_at || dayjs().format('YYYY/MM/DD HH:mm:ss')
        this.deleted_at = entity.deleted_at || null
        this.errors = entity.errors || {}
        this.definePropertySet({
            entity,
            loaded: !entity,
            baseData: [],
            mode: entity.mode || 'static',
            edited: entity.edited || false,
            deleted: entity.deleted || false,
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
    /**
     * 取得當前錯誤訊息
     * @param {string} field 指定的 model key
     * @return {object} 取得指定的錯誤訊息
     */
    hasError(field) {
        return (this.errors && this.errors[field]) ? this.errors[field][0] : null
    }
    /**
     * 進行指定的 model key 的驗證
     * @param {string} field 指定的 model key
     * @return {object} 取得指定驗證項目的錯誤訊息
     */
    valid(field) {
        const rules = this.rules() || {}
        let error = Validate.single(this[field], rules[field])
        this.errors = this.errors || []
        this.errors[field] = error
        return error ? error[0] : null
    }
    /**
     * 進行 model 的驗證
     * @return {object} 取得與 model 同結構且需驗證項目的所有錯誤訊息
     */
    validate() {
        const data = this
        const rules = this.rules() || {}

        this.errors = Validate(data, rules) || {}
        return this.errors || false
    }
    /**
     * 設定 model property 值
     * @param {*} entity 
     */
    set(entity) {
        Object.keys(entity).map(key => {
            this[key] = entity[key]
        })
    }
    rules() {
        return {
        }
    }
}
