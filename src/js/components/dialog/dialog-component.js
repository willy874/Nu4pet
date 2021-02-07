import classNames from 'classnames'
import PopupComponent from './popup/popup-component'

export default {
    name: 'Dialog',
    data() {
        return {
            dialog: this.$dialog
        }
    },
    mounted(){
        this.dialog.vm = this
        this.dialog.popupRoot = this.$refs.popupRoot
    },
    render(h) {
        return h('div', {
            class: classNames('dialog')
        },[
            // Popup Array
            h('div', {
                class: classNames('dialog-popup', {
                    show: this.$dialog.arrPopup.length
                }),
                style:{
                    zIndex: 20
                },
                ref: 'popupRoot',
                on: {
                    click: ()=> {
                        this.$dialog.arrPopup.forEach((item, index) => {
                            if (typeof item.onBackgroundClick === 'function') {
                                item.onBackgroundClick(this.$dialog.arrPopup)
                            }
                            if (item.onBackgroundClick === true) {
                                this.$dialog.cancel(index)
                            }
                        })
                    }
                }
            },[
                h('transition-group',{
                    class: classNames('dialog-transition-group'),
                    props: {
                        name: 'fade',
                        tag: 'div',
                    }
                },[
                    this.$dialog.arrPopup.map((popup,index) =>{
                        return h(PopupComponent,{
                            props: {
                                popup,
                                index
                            },
                            key: popup.id
                        })
                    })
                ])
            ])
            // Alert
        ])
    }
}
