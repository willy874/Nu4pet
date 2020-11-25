/**
 * 判斷使用者當前是否使用行動設備
 * @return {*} boolen
 */
export const isMobileDevice = function() {
    const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
    return  mobileDevice.some(d => navigator.userAgent.match(d))
}