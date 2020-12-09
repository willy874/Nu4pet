import NutritionChar from '@/components/nutrition-char'

const canvas = document.getElementById('nutrition-char')
if (canvas) {
    const ctx = new NutritionChar({
        el: canvas,
        delay: Number(canvas.getAttribute('data-delay')),
        target: {
            protein: Number(canvas.getAttribute('data-protein')),
            fat: Number(canvas.getAttribute('data-fat')),
            metabolism: Number(canvas.getAttribute('data-metabolism')),
        },
        animate: {
            count: 0,
            durationCount: 180
        },
    })
    ctx.oncreate()
}