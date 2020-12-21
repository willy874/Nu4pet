import classNames from 'classnames'
// import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'ErrorMessage',
    data(){
        return {
            
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
        tag: {
            type: String,
            default: 'div'
        }
    },
    render(h){
        return ( this.model.errors && this.model.errors[this.handle] )? 
        h(this.tag,{
            class: classNames('error-message')
        },[
            (this.$slots.default)
            ? this.$slots.default
            : this.model.errors[this.handle][0]
        ])
        :null
    }
}