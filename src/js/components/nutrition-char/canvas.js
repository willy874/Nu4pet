export default class Canvas{
    constructor(ops){
        this.ctx = ops.ctx
    }
    drawPath(path){
        const ctx = this.ctx
        path.forEach(p=>{
            ctx.save()
            if (p.transform) {
                if (p.transform.translate) {
                    ctx.translate.apply(ctx,p.transform.translate.split(','))
                }
                if (p.transform.rotate) {
                    const x = p.transform.rotate.cx
                    const y =  p.transform.rotate.cy
                    ctx.translate(x,y)
                    ctx.rotate( Math.PI / 180 * p.transform.rotate.deg)
                    ctx.translate(-x,-y)
                }
            }
            if (p.fill) {
                if (!p.stroke) {
                    ctx.strokeStyle = p.fill
                }
                ctx.fillStyle = p.fill
            }
            if (p.stroke) {
                if (!p.fill) {
                    ctx.fillStyle = p.fill
                }
                ctx.strokeStyle = p.stroke
            }
            if (p.path) {
                ctx.stroke(p.path);
                ctx.fill(p.path);
            }
            if (p.text) {
                const type = ['fill','stroke'].includes(p.text.type) ? p.text.type : 'fill'
                if (p.text.font) {
                    ctx.font = p.text.font;
                }
                if (p.text.align) {
                    ctx.textAlign = p.text.align;
                }
                ctx[type + 'Text'](String(p.text.str), p.text.x, p.text.y);
            }
            ctx.restore()
        })
    }
}