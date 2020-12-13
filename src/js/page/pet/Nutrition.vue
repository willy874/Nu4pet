<template>
    <div class="prt-nutrition border border-primary">
        <div class="pt-4 px-4 px-sm-5">
            <h2>營養評估</h2>
            <div class="px-md-5">
                <canvas ref="canvas" width="1000" height="1000"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import onCreatedDetail from './created-detail'
import { PetModel } from '@/models'
import NutritionChar from '@/components/nutrition-char'

export default {
    data(){
        return {
            model: new PetModel()
        }
    },
    created(){
        onCreatedDetail.call(this)
    },
    mounted(){
        const canvas = this.$refs.canvas
        if (canvas) {
            const ctx = new NutritionChar({
                el: canvas,
                delay: Number(500),
                target: {
                    protein: Number(26.57),
                    fat: Number(11.71),
                    metabolism: Number(327.34),
                },
                animate: {
                    durationCount: 240,
                    easings: 'easeOutElastic'
                },
                
            })
            ctx.oncreate()
        }
    }
};
</script>
<style scoped>
    canvas{
        width: 100%;
    }
</style>