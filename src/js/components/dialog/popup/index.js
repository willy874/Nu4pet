import { v4 as uuidv4 } from 'uuid';

export default class Popup {
    constructor(option) {
        this.id = uuidv4()
        this.attrs = Object.assign({
            position: {
                x: 'center',
                y: 'center'
            },
        },option.attrs)
        this.position = {top: null,left: null}
        this.popupItem = null
        this.popupView = null
        this.popupDraper = null

        this.onBackgroundClick = true,
        this.onClose = option.onClose || null,
        this.onCancel = option.onCancel || null,
        this.header = option.header || null
        this.body = option.body || null
        this.footer = option.footer || null
        this.size = option.size || null

    }
    view(scope,props){
        if (this[scope].render) {
            return window.VueCreateElement(this[scope],props)
        }else if(this[scope] instanceof window.VNode){
            return this[scope]
        }else if(this[scope] === undefined || this[scope] === null){
            return null
        }
        throw new Error('this view instanceof is not a VNode.')
    }
}