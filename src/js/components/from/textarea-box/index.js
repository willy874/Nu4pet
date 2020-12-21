import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'TextareaBox',
    data(){
        return {
            value: this.model[this.handle]
        }
    },
    props:{
        model: {
            type: Object,
            required: true
        },
        handle: {
            type: String,
            required: true
        },
        template: {
            type: String,
            default: 'native'
        },
        id: {
            type: String,
            default: uuidv4()
        },
        plassholder: String,
        attrs:  {
            type: Object,
            default: ()=>{
                return {}
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        validate:{
            type: Function,
            default: ()=>{
                return undefined
            }
        },
        error: { 
            type: Boolean,
            default: undefined
        }
    },
    computed: {
        isError() {
            if (this.model.errors && this.model.errors[this.handle]) {
                const validateEvent = this.validate({
                    target: this.$refs.input,
                    value: this.value,
                    error: this.model.errors[this.handle]
                })
                const errorMessage = this.error || validateEvent
                if (errorMessage || errorMessage === false) {
                    return errorMessage
                }else{
                    return this.model.valid(this.handle)
                }
            }else{
                return false
            }
        },
        flylabel() {
            if (this.value === 0) {
                return '0'
            }
            return this.plassholder ||  this.value
        }
    },
    render(h) {
        return h('div',{
            class: classNames('textarea-box',{
                'disabled': this.disabled,
                'readonly': this.readonly,
                'native': this.template === 'native',
                'bottom-line': this.template === 'bottomLine',
                'out-line': this.template === 'outLine'
            })
        },[
            h('div', {
                class: classNames('textarea-container')
            },[
                h('div',{
                    class: classNames('textarea-wrapper')
                },[
                    h('textarea', {
                        class: classNames('form-control',{
                            'is-invalid': this.isError,
                        }),
                        attrs: {
                            plassholder: this.plassholder,
                            disabled: this.disabled,
                            readonly: this.readonly,
                            value: this.value,
                            ...this.attrs
                        },
                        on: {
                            input: (e)=>{
                                this.model[this.handle] = e.target.value
                                this.value = e.target.value
                                this.model.edited = true
                                this.$emit('input', e, this)
                            },
                            change: (e)=>{
                                this.$emit('change', e , this)
                            },
                            focus: (e)=>{
                                this.$emit('focus', e , this)
                            },
                            blur: (e)=>{
                                this.$emit('blur', e , this)
                            },
                        }
                    },[ this.value ])
                ]),
                (this.template === 'outLine') ?
                h('fieldset', {
                    class: classNames({
                        'flying': this.flylabel,
                        'is-invalid': this.isError
                    })
                }, [
                    (this.label) ?
                    h('legend', [
                       h('span',this.label)
                    ])
                    : null
                ])
                : null,
                (this.template === 'bottomLine') ?
                h('div', {
                    class: classNames('textarea-line',{
                        'is-invalid': this.isError
                    })
                })
                : null,
                (this.label && (this.template === 'outLine' || this.template === 'bottomLine')) ?
                h('div',{
                    class: classNames('textarea-flylabel',{
                        'flying': this.flylabel,
                        'is-invalid': this.isError
                    })
                },[
                    h('span',this.label)
                ])
                : null
            ]),
            (this.$slots.error) ?
            h('div', {
                class: 'textarea-error-box'
            },[
                this.$slots.error
            ])
            : null
        ])
    }
}