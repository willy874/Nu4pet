import Dialog from './index'
import DialogComponent from './dialog-component'

const DialogInstall = {
	install(Vue) {
		Vue.prototype.$dialog = new Dialog
		Vue.component('dialog-component', DialogComponent)
	}
}

export default DialogInstall