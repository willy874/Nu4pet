import Dog from './dog'
import Char from './char'

const canvas = document.getElementById('nutrition-char')
if (canvas) {
    const ww = canvas.offsetWidth
    const wh = canvas.offsetHeight
    const bw = 1000
    const bh = 1000
    const ctx = canvas.getContext('2d')
    const target = {
        protein: 26.57,
        fat: 11.71,
        metabolism: 327.34,
    }
    const animate = {
        count: 0,
        durationCount: 180
    }
    console.log('ww:',ww,'wh:',wh)
    class NutritionChar {
        constructor(ops){
            const entity = ops ? ops : {}
            this.DogObject = new Dog({
                ctx
            })
            this.CharObject = new Char({
                ctx
            })
            this.draw()
            this.animate = entity.animate || { durationCount: 180 }
            this.count = 0
            this.targetData = entity.target || {
                protein: 0,
                fat: 0,
                metabolism: 0,
            }
        }
        draw(){
            ctx.save()
                ctx.translate(110,30)
                ctx.scale(1.2,1.2)
                this.DogObject.draw()
            ctx.restore()

            ctx.save()
                ctx.scale(1.4,1.4)
                this.CharObject.draw()
            ctx.restore()
        }
        dataMathUpdate(arrKey){
            arrKey.forEach(key=>{
                const x = this.targetData[key] * (this.count / this.animate.durationCount)
                const str = String(Math.ceil(x*100))
                const arr = str.split('').reverse()
                arr.splice(2,0,'.')
                this.CharObject.data[key] = Number(arr.reverse().join(''))
            })
        }
    }
    
    const NutritionCharCanvas = new NutritionChar({
        target,
        animate
    })
    const update = ()=>{
        const cav = NutritionCharCanvas
        cav.dataMathUpdate(['protein','fat','metabolism'])
        ctx.clearRect(0,0,bw,bh)
        cav.draw()
        if (cav.count !== cav.animate.durationCount) {
            cav.count++
            window.requestAnimationFrame(update)
        }
    }
    window.requestAnimationFrame(update)
        
}