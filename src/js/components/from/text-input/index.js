import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'TextInput',
    data() {
        return {
            value: this.model[this.handle],
            passwordClosed: false,
            prefixClientWidth: 0,
            suffixClientWidth: 0
        }
    },
    props: {
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
        type: {
            type: String,
            default: 'text'
        },
        plassholder: String,
        attrs: {
            type: Object,
            default: () => {
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
    mounted() {
        this.prefixClientWidth = this.$refs.prefix && this.$refs.prefix.clientWidth || 0
        this.suffixClientWidth = this.$refs.suffix && this.$refs.suffix.clientWidth || 0
        
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
        inputType() {
            if (this.type === 'password' && this.passwordClosed) {
                return 'text'
            }
            return this.type
        },
        inputStyle(){
            if (this.template === 'bottomLine' || this.template === 'outLine') {
                return
            }
            return {
                paddingLeft: (this.prefixClientWidth + 16) + 'px',
                paddingRight: (this.suffixClientWidth + 16) + 'px',
            }
        },
        flylabel() {
            if (this.value === 0) {
                return '0'
            }
            return this.$slots.prefix || this.plassholder || this.value
        },
        prepend(){
            return this.$slots.prepend
        },
        append(){
            return this.$slots.append
        },
        prefix() {
            return this.$slots.prefix
        },
        suffix() {
            const h = this.$createElement
            if (this.type === 'password') {
                if (this.passwordClosed) {
                    return h('i', {
                        class: classNames('suffix-password', {
                            'is-invalid': this.isError,
                        }),
                        on: { click: () => { this.passwordClosed = false } },
                        domProps: {
                            innerHTML: `
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                            </svg>`}
                    })
                } else {
                    return h('i', {
                        class: classNames('suffix-password', {
                            'is-invalid': this.isError,
                        }),
                        on: { click: () => { this.passwordClosed = true } },
                        domProps: {
                            innerHTML: `
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>`}
                    })
                }
            }
            return this.$slots.suffix
        }
    },
    render(h) {
        console.log(this.$slots)
        return h('div', {
            class: classNames('text-input', {
                'disabled': this.disabled,
                'readonly': this.readonly,
                'native': this.template === 'native',
                'bottom-line': this.template === 'bottomLine',
                'out-line': this.template === 'outLine'
            }),
            style:{
                paddingBottom: this.isError && this.$slots.error ? '18px' : 0
            }
        }, [
            (this.prepend) ?
                h('div', {
                    class: 'input-group-prepend'
                }, [
                    h('span', {
                        class: 'input-group-text'
                    },[
                        this.$slots.prepend
                    ])
                ]) 
            : null,
            h('div', {
                class: classNames('text-input-container')
            }, [
                (this.prefix) ?
                    h('div', {
                        class: 'text-input-prefix',
                        ref: 'prefix',
                    }, [
                        this.$slots.prefix
                    ]) 
                : null,
                h('div', {
                    class: classNames('text-input-wrapper')
                }, [
                    h('input', {
                        ref: 'input',
                        class: classNames('form-control', {
                            'is-invalid': this.isError,
                        }),
                        style: {
                            ...this.inputStyle
                        },
                        attrs: {
                            type: this.inputType,
                            plassholder: this.plassholder,
                            disabled: this.disabled,
                            readonly: this.readonly,
                            value: this.value,
                            ...this.attrs
                        },
                        on: {
                            input: (e) => {
                                this.model[this.handle] = e.target.value
                                this.value = e.target.value
                                this.model.edited = true
                                this.$emit('input', e, this)
                            },
                            change: (e) => {
                                this.$emit('change', e, this)
                            },
                            focus: (e) => {
                                this.$emit('focus', e, this)
                            },
                            blur: (e) => {
                                this.$emit('blur', e, this)
                            },
                        }
                    })
                ]),
                (this.suffix) ?
                    h('div', {
                        class: 'text-input-suffix',
                        ref: 'suffix',
                    }, [
                        this.suffix
                    ]) 
                : null,
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
                    class: classNames('text-input-line',{
                        'is-invalid': this.isError
                    })
                })
                : null,
                (this.label && (this.template === 'outLine' || this.template === 'bottomLine')) ?
                h('div',{
                    class: classNames('text-input-flylabel',{
                        'flying': this.flylabel,
                        'is-invalid': this.isError
                    })
                },[
                    h('span',this.label)
                ])
                : null
            ]),
            (this.append) ?
                h('div', {
                    class: 'input-group-append'
                }, [
                    h('span', {
                        class: 'input-group-text'
                    },[
                        this.$slots.append
                    ])
                ])
            : null,
            (this.$slots.error) ?
            h('div', {
                class: 'text-input-error-box'
            },[
                this.$slots.error
            ])
            : null
        ])
    }
}