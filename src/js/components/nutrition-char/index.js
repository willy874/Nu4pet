// import Dog from './dog'
import Char from './char'
import * as easings from './easings'

/**
 * @param {HTMLElement} ops.el *建立 Canvas 的目標
 * @param {Object} ops.animate 設定動畫參數:
 * {durationCount: 要進行更新的總偵數}
 * @param {Object} ops.target 
 * @param {Number} ops.delay *傳入主參數 protein、fat、metabolism
 * @param {Number} ops.boxWidth 
 * @param {Number} ops.boxHeight 
 */
export default class NutritionChar {
    constructor(ops){
        const entity = ops ? ops : {}
        if (!entity.el) {
            throw new Error('沒有傳入 Canvas 建立目標')
        }
        this.ctx = entity.el.getContext('2d')
        this.animate = entity.animate || { 
            durationCount: 180,
            easings: 'easeInSine'
         }
        this.maxTarget = this.maxTarget || {
            protein: entity.maxTarget.protein || 32,
            fat: entity.maxTarget.fat || 17,
            metabolism: entity.maxTarget.metabolism || 1000
        }
        this.delay =  entity.delay || 0
        this.count = 0
        this.bw = entity.boxWidth || 1000
        this.bh = entity.boxHeight || 1000
        this.targetData = entity.target || {
            protein: 0,
            fat: 0,
            metabolism: 0,
        }
        setTimeout(() => {
            window.requestAnimationFrame(this.onupdate.bind(this))
        },this.delay)
    }
    draw(){
        // this.ctx.save()
        // this.ctx.translate(110,30)
        // this.ctx.scale(1.2,1.2)
        // this.Dog.draw()
        // this.ctx.restore()

        this.ctx.save()
        this.ctx.scale(1.4,1.4)
        this.Char.draw()
        this.ctx.restore()
    }
    dataMathUpdate(arrKey){
        arrKey.forEach(key=>{
            const dataMath = (data)=>{
                const x = this.targetData[key] * data
                const floatSet = 2
                const floatCount = 6
                const str = String(Math.ceil(x*10**floatCount))
                const arr = str.split('').reverse()
                if (arr.length < floatCount+1) {
                    arr.push.apply(arr,Array(floatCount+1-arr.length).fill('0'))
                }
                arr.splice(floatCount,0,'.')
                const re = arr.splice(floatCount-floatSet).reverse().join('')
                return re
            }
            this.Char.data[key] = Number(
                dataMath(this.count / this.animate.durationCount)
            )
            this.Char.data[key+'Rotate'] = Number(
                dataMath(easings[this.animate.easings](this.count / this.animate.durationCount))
            )
        })
    }
    oncreate() {
        // this.Dog = new Dog({
        //     ctx: this.ctx
        // })
        this.Char = new Char({
            ctx: this.ctx,
            max: this.maxTarget
        })
        this.draw()
    }
    onupdate(){
        this.dataMathUpdate(['protein','fat','metabolism'])
        this.ctx.clearRect(0,0,this.bw,this.bh)
        this.draw()
        if (this.count !== this.animate.durationCount) {
            this.count++
            window.requestAnimationFrame(this.onupdate.bind(this))
        }
    }
}