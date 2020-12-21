<template>
    <div class="prt-nutrition border border-primary">
        <div class="pt-4 px-4 px-sm-5">
            <h2>營養評估</h2>
            <div class="px-md-5">
                <canvas ref="canvas" width="1000" height="1000"
                    :data-protein="model.protein"
                    :data-fat="model.fat"
                    :data-metabolism="model.metabolism"
                ></canvas>
            </div>
        </div>
        <div class="px-3 px-sm-5">
            <div class="px-md-5 py-2 py-md-4">
                <h3 class="font-weight-bold rwd-h2" style="color: #619EED;">粗脂肪</h3>
                <p class="rwd-h4">
                    狗狗進入壯年期，但蛋白質在肌肉的維持上還是相當重要，建議飲食當中供應26.57%的蛋白質會比較理想唷！
                </p>
            </div>
            <div class="px-md-5 py-2 py-md-4">
                <h3 class="font-weight-bold rwd-h2" style="color: #ECB850;">粗蛋白質</h3>
                <p class="rwd-h4">
                    狗狗進入壯年期，但蛋白質在肌肉的維持上還是相當重要，建議飲食當中供應26.57%的蛋白質會比較理想唷！
                </p>
            </div>
            <div class="px-md-5 py-2 py-md-4">
                <h3 class="font-weight-bold rwd-h2" style="color: #6BC0B1;">代謝能</h3>
                <p class="rwd-h4">
                    狗狗進入壯年期，但蛋白質在肌肉的維持上還是相當重要，建議飲食當中供應26.57%的蛋白質會比較理想唷！
                </p>
            </div>
        </div>
        <div class="container-fluid border-top border-primary">
            <div class="row justify-content-center py-sm-4">
                <div class="col-sm"></div>
                <div class="col-sm-auto py-3 d-flex justify-content-center">
                    <icon-component pattern="Logo2" size="83,77"></icon-component>
                </div>
                <p class="col-sm-6 py-3 text-primary rwd-h4 mb-0">
                    以上為預設配方讓您更了解營養比例及基礎營養建議，毛孩最適合的『營養配置』請依毛孩營養師團隊評估調配結果為主！
                </p>
                <div class="col-sm"></div>
            </div>
        </div>
        <div class="container-fluid border-top border-primary d-flex flex-center py-4">
            <h3 class="font-weight-bold text-dark mb-0 rwd-h3">建議訂購</h3>
            <div class="bg-primary rounded-pill text-white font-weight-bold rwd-h1 px-3 px-lg-5 mx-3 mb-0">L</div>
            <h5 class="text-dark mb-0 rwd-h5">尺寸</h5>
        </div>
        <div class="container-fluid border-top border-primary d-flex flex-center py-4 mb-0">
            <div class="row">
                <figure class="prod-card col-lg-4 py-3 mb-0" v-for="item in model.recommend" :key="item.id">
                    <div class="border border-dark">
                        <div class="mb-3 card-img">
                            <img class="w-100 img-cover" :src="item.image_url" alt="">
                            <div class="card-hover py-2 bg-primary text-center">
                                <a class="text-white stretched-link" href="javascript:;">加入購物袋</a>
                            </div>
                        </div>
                        <figcaption class="font-weight-bold text-dark mb-2 overflow-line-20 px-3">多貓家庭 <br>搭伙合菜『美味雞魚配方』</figcaption>
                        <div class="border-bottom"></div>
                        <div class="d-flex justify-content-between pt-2 pb-3 px-3">
                            <div class="pt-1">
                                <div>
                                    <span class="font-weight-bold h6 text-dark">NT$</span>
                                    <span class="font-weight-bold h3 text-primary">1488</span>
                                </div>
                                <div>
                                    <span class="text-dark">原價：</span>
                                    <del class="text-dark">1900</del>
                                </div>
                            </div>
                            <div>
                                <a class="d-inline-block" href="javascript:;">
                                    <icon-component class="d-inline-block mx-1" pattern="HeartRound" size="40"></icon-component>
                                </a>
                                <a class="d-inline-block" href="javascript:;">
                                    <icon-component class="d-inline-block mx-1" pattern="Share" size="40"></icon-component>
                                </a>
                            </div>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
        <div class="container-fluid border-top border-primary d-flex flex-center py-4 mb-0">
            <div>
                <p class="text-primary h5 mb-1">以上為建議訂購配方，如需訂購點選圖片即可選購所需尺寸及方案唷！</p>
                <p class="text-primary h5 d-flex align-items-center mb-0">
                    <span>
                        或者可以點選
                        <icon-component class="d-inline-block mx-1" pattern="HeartRound" size="26"></icon-component>
                        收藏商品OR點選
                        <icon-component class="d-inline-block mx-1" pattern="Share" size="26"></icon-component>
                        分享給朋友唷！
                    </span>
                </p>
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
        onCreatedDetail.call(this,()=>{
            console.log(this.model);
        })
    },
    mounted(){
        const canvas = this.$refs.canvas
        if (canvas) {
            const ctx = new NutritionChar({
                el: canvas,
                delay: Number(500),
                target: {
                    protein: Number(this.model.protein),
                    fat: Number(this.model.fat),
                    metabolism: Number(this.model.metabolism),
                },
                animate: {
                    durationCount: 240,
                    easings: 'easeOutElastic'
                },
                
            })
            ctx.oncreate()
        }
    },
    updated(){
        console.log(this.model);
        const canvas = this.$refs.canvas
        if (canvas) {
            const ctx = new NutritionChar({
                el: canvas,
                delay: Number(500),
                target: {
                    protein: Number(this.model.protein),
                    fat: Number(this.model.fat),
                    metabolism: Number(this.model.metabolism),
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