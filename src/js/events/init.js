import './navbar'
import NutritionChar from '../components/nutrition-char'

const canvas = document.querySelector('#nutrition')
if (canvas) {
    const ctx = new NutritionChar({
        el: canvas,
        delay: Number(canvas.getAttribute('data-delay')),
        target: {
            protein: Number(canvas.getAttribute('data-protein')),
            fat: Number(canvas.getAttribute('data-fat')),
            metabolism: Number(canvas.getAttribute('data-metabolism'))
        },
        animate: {
            durationCount: Number(canvas.getAttribute('data-duration')),
            easings: 'easeOutElastic'
        },
        
    })
    ctx.oncreate()
}