// import classNames from 'classnames'
import * as Pattern from './index'

/**
 * 主要由 Webpack 來動態判斷 pattern 的檔案類型或填入 URL
 * @type {js} => svg
 * @type {svg || png || jpg} => img
 * @type {xml || txt} => xml
 * @type {*} font
 */
export default {
    props: {
        pattern: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 'auto auto'
        },
        type: {
            type: String,
            default: 'svg'
        },
        alt: {
            type: String,
            default: ''
        }
    },
    computed: {
        svgSize() {
            const size = this.size.split(',')
            return {
                width: size[0],
                height: size[1] || size[0],
            }
        }
    },
    render(h) {
        if (this.type === 'font') {
            return h('i',this.$children)
        }else if(this.type === 'img'){
            return h('img',{
                attrs: {
                    src: Pattern[this.pattern],
                    alt: this.alt,
                    width: this.svgSize.width,
                    height: this.svgSize.height
                }
            })
        }else if(this.type === 'xml'){
            return h('i',{
                domProps:{
                    innerHTML: Pattern[this.pattern]
                }
            })
        }else{
            const attrs = ((typeof Pattern[this.pattern] !== 'string') && ('attrs' in Pattern[this.pattern])) ? Pattern[this.pattern].attrs : {}
            return h('svg',{
                attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: this.svgSize.width,
                    height: this.svgSize.height,
                    ...attrs
                },
                domProps:{
                    innerHTML: Pattern[this.pattern].path
                }
            })
        }

    }
}