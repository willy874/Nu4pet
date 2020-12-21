import classNames from 'classnames'
import Popup from './index'

export default {
    props: {
        popup: Popup,
        index: Number
    },
    created() {
        this.popup.vm = this
    },
    mounted(){
        const refs = this.$refs
        const popup = Object.assign(this.popup,{
            popupItem: refs['popupItem'],
            popupView: refs['popupView'],
            popupDraper: refs['popupDraper']
        })
        if (refs.popupDraper) {
            this.$dialog.addDraper(popup)
        }
        const { x , y } = popup.attrs.position
        if (x === 'center') {
            popup.position.left = (window.innerWidth / 2) - (popup.popupView.offsetWidth / 2) 
        }else if (x === 'left'){
            popup.position.left = 20
        }else if (x === 'right'){
            popup.position.left = window.innerWidth - 20
        }else if(typeof x === 'number'){
            popup.position.left = x
        }
        if (y === 'center') {
            popup.position.top = (window.innerHeight / 2) - (popup.popupView.offsetHeight / 2)
        }else if (y === 'top'){
            popup.position.top = 20
        }else if (y === 'bottom'){
            popup.position.top = window.innerHeight - 20
        }else if(typeof y === 'number'){
            popup.position.top = y
        }
        this.popup.popupItem.style.top = this.popup.position.top + 'px'
        this.popup.popupItem.style.left = this.popup.position.left + 'px'
    },
    computed: {
        viewProps() {
            return {
                props: {
                    attrs: this.popup.attrs,
                    index: this.index,
                }
            }
        }
    },
    methods: {
        dialogCancel(e) {
            e.stopPropagation();
            console.log("cancel return", this.$dialog.cancel(this.indexPopup));
        },
        dialogCheck() {
            const check = () => {
                console.log(
                    "close return",
                    this.$dialog.close(this.indexPopup)
                );
            };
            check();
        },
    },
    render(h){
        return h('div',{
            class: classNames('dialog-popup__item', {
                show: this.$dialog.arrPopup.length
            }),
            style:{
                zIndex: this.index*2,
                maxWidth: this.popup.size || 'auto',
                width: (this.popup.size)? '100%' : 'auto'
            },
            key: this.key,
            ref: 'popupItem',
            on:{ 
                click: (e)=>{e.stopPropagation()} 
            }
        },[
            h('transition',{
                props: {
                    name: 'fade',
                    tag: 'div'
                }
            },[
                h('div',{
                    class: classNames('popup-view'),
                    ref: 'popupView',
                    attrs: {
                        tabindex: '-1'
                    }
                },[
                    (this.popup.header) ?
                    h('div',{
                        class: classNames('popup-view-header'),
                        ref: 'popupDraper',
                    },[
                        this.popup.view('header',this.viewProps)
                    ])
                    : null,
                    (this.popup.body) ?
                    h('div',{
                        class: classNames('popup-view-body'),
                    },[
                        this.popup.view('body',this.viewProps)
                    ])
                    : null,
                    (this.popup.footer) ?
                    h('div',{
                        class: classNames('popup-view-footer'),
                    },[
                        this.popup.view('footer',this.viewProps)
                    ])
                    : null
                ])
            ])
        ])
    }
}