import Popup from './popup'

class Dialog {
    constructor() {
        this.arrPopup = new Array()
        this.popupRoot = null
        this.popupCache = null
        this.drapPosition = {
            x: 0,
            y: 0
        }
        this.draperMove = (e)=>{
            const popup = this.popupCache
            const box = {
                x: e.x  - this.drapPosition.x,
                y: e.y - this.drapPosition.y 
            }
            const maxBox = {
                x: window.innerWidth - popup.popupView.offsetWidth ,
                y: window.innerHeight - popup.popupView.offsetHeight
            }
            if (box.x >= maxBox.x) {
                popup.position.x = maxBox.x 
                popup.popupItem.style.left = maxBox.x + 'px'
            }else if(box.x <= 0){
                popup.position.x = 0
                popup.popupItem.style.left = 0 + 'px'
            }else{
                popup.position.x = box.x
                popup.popupItem.style.left = box.x + 'px'
            }
            if (box.y >= maxBox.y) {
                popup.position.y = maxBox.y
                popup.popupItem.style.top = maxBox.y + 'px'
            }else if(box.y <= 0){
                popup.position.y = 0
                popup.popupItem.style.top = 0 + 'px'
            }else{
                popup.position.y = box.y
                popup.popupItem.style.top = box.y + 'px'
            }
        }
        this.draperStart = (e)=>{
            this.popupCache = this.arrPopup.find(item=>e.path.includes(item.popupItem))
            const popup = this.popupCache
            this.drapPosition.x = e.x - popup.popupItem.offsetLeft
            this.drapPosition.y = e.y - popup.popupItem.offsetTop
            this.popupRoot.addEventListener('mousemove', this.draperMove)
        }
        this.draperEed = ()=>{
            // const popup = this.popupCache
            this.popupCache = null
            this.drapPosition.x = 0
            this.drapPosition.y = 0
            this.popupRoot.removeEventListener('mousemove', this.draperMove)
        }
    }
    /**
     * 由 Popup 裡面的 Promise 來傳遞事件執行關閉事件
     * 事件與 Promise 儲存在 this.arrPopup[].attrs
     */
    removePopup(strEvent, id = null) {
        document.body.style.overflow = 'auto'
        if (typeof id === 'number') {
            const remove = this.arrPopup[id][strEvent]
            remove(this.arrPopup[id].attrs)
            return this.arrPopup.splice(id, 1)
        } else if (typeof id === 'string' && id.length === 36) {
            const index = this.arrPopup.map(item => item.id).indexOf(id)
            const remove = this.arrPopup[index][strEvent]
            remove(this.arrPopup[index].attrs)
            return this.arrPopup.splice(index, 1)
        } else if (id === 'all') {
            const arrSplicePopup = this.arrPopup.map(element => {
                const remove = element[strEvent]
                remove(element.attrs)
                return element
            })
            this.arrPopup.splice(0)
            return arrSplicePopup
        }else if(id instanceof Popup){
            const index = this.arrPopup.indexOf(id)
            const remove = this.arrPopup[index][strEvent]
            remove(this.arrPopup[index].attrs)
            return this.arrPopup.splice(index, 1)
        }else {
            const index = this.arrPopup.length - 1
            const remove = this.arrPopup[index][strEvent]
            remove(this.arrPopup[index].attrs)
            return this.arrPopup.splice(index, 1)
        }
    }
    /**
     * 呼叫 this.arrPopup[].attrs 裡面的 Promise 來關閉 Dialog
     * @param {Number || String || 'all' || Popup || null} id 用對應的方式關閉 Dialog
     * @return {Array} 被移除的 Popup
     */
    close(id = null) {
        const result = this.removePopup('onClose', id)
        this.removeDraper(result)
        return result
    }
    cancel(id = null) {
        const result =  this.removePopup('onCancel', id)
        this.removeDraper(result)
        return result
    }
    /**
     * 綁定拖拉事件
     * @param { Popup } popup 
     */
    addDraper(popup){
        popup.popupDraper.addEventListener('mousedown', this.draperStart)
        popup.popupDraper.addEventListener('mouseup', this.draperEed)
    }
    /**
     * 解除綁定拖拉事件
     * @param { Array<HTMLElement> } arrElement 
     */
    removeDraper(arrElement){
        arrElement.forEach(item=>{
            if (item.popupDraper) {
                item.popupDraper.removeEventListener('mousedown', this.draperStart)
                item.popupDraper.removeEventListener('mouseup', this.draperEed)
            }
        })
    }
    /**
     * 呼叫 Popup 
     * @param {VueComponentObject} view 要建立的 PopupComponent
     * @param {Object} props 要傳入 Popup 的設定
     */
    popup(options) {
        document.body.style.overflow = 'hidden'
        const popup = new Popup(options)
        this.arrPopup.push(popup)
        if (popup.onClose || popup.onCancel) {
            // Promise.resolve
            // Promise.reject
            return popup
        }
        return new Promise((resolve, reject) => {
            popup.onClose = (attrs) => {
                resolve(attrs)
            }
            popup.onCancel = (attrs) => {
                reject(attrs)
            }
        })
    }
}

export default Dialog