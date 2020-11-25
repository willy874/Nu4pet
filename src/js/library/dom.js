/**
 * 建立一個觸控裝置滑動事件，可監聽四個方向的滑動。
 * @param {HTMLElement} this 要被加入事件的元素
 * @param {String} type 觸發事件的類型，可傳入 "top","left","right","bottom","move" 其一
 * @param {Function} callback 當被觸發時運行的 Function
 */
HTMLElement.prototype.addEventListenerTouch = function(type,callback){
    if (typeof type != 'string') {
        throw new Error('傳入的 type 參數必須是個 string')
    }
    if (typeof callback != 'function') {
        throw new Error('傳入的 callback 參數必須是個 function')
    }
    const allowed = ['top', 'left', 'right', 'bottom','move']
    if (!allowed.includes(type)) {
        throw new Error('傳入的 type 參數必須是 "top","left","right","bottom","move" 其一')
    }
    if (this instanceof HTMLElement) {
        const dom = this
        const touchstart = function(e){
            dom.startX = e.touches[0].pageX
            dom.startY = e.touches[0].pageY
        }
        const touchend = function(e){
            dom.endX = e.changedTouches[0].pageX
            dom.endY = e.changedTouches[0].pageY
            const direction = (function (startX, startY, endX, endY){
                const dy = startY - endY;
                const dx = endX - startX;
                let result = 'move';
                if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result
                }
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                if(angle >= -45 && angle < 45) {
                    return 'right'
                }else if (angle >= 45 && angle < 135) {
                    return 'top'
                }else if (angle >= -135 && angle < -45) {
                    return 'bottom'
                }
                else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    return 'left'
                }
                return result
            })(dom.startX, dom.startY, dom.endX, dom.endY)
            if (type === 'move' && direction !== 'move') {
                e.direction = direction
                callback(e)
            }else{
                if (direction === type) {
                    callback(e)
                }
            }
        }
        this.addEventListener('touchstart',touchstart,false)
        this.addEventListener('touchend',touchend,false)
        return {
            touchstart,
            touchend,
            callback
        }
    }else{
        throw new Error('必須是個 HTMLElement')
    }
}

/**
 * 取得絕對位置的box座標
 * @param {HTMLElement} this 要傳入的偵測DOM
 * @return {Object} box = { x , y , path }
 */
HTMLElement.prototype.getCoordinateBox = function(){
    const box = {
        y: 0,
        x: 0,
        path: []
    }
    function boxCount(dom){
        const offsetParent = dom.offsetParent
        box.y = box.y + ((dom.offsetTop)?dom.offsetTop:0)
        box.x = box.x + ((dom.offsetLeft)?dom.offsetLeft:0)
        if (dom === document.body) {
            return document
        }
        box.path.push(offsetParent) 
        return boxCount(offsetParent)
    }
    box.path.push(boxCount (this))
    return box
}
