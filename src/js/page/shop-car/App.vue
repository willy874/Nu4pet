<template>
    <section class="container py-5" id="shop-car">
        <h2 class="pb-5">購物袋</h2>
        <!-- md -->
        <div class="row align-items-md-end align-items-center justify-content-center">
            <div :class="['col-auto','step','py-2',{active: step===1}]">
                <icon-component class="mx-auto" pattern="Step1" size="40"/>
                <span>購物袋</span>
            </div>
            <div class="col horizontal-line-2 d-none d-md-block"></div>
            <div :class="['col-auto','step','py-2',{active: step===2}]">
                <icon-component class="mx-auto" pattern="Step2" size="40"/>
                <span>資料填寫</span>
            </div>
            <div class="col horizontal-line-2 d-none d-md-block"></div>
            <div :class="['col-auto','step','py-2',{active: step===3}]">
                <icon-component class="mx-auto" pattern="Step3" size="40"/>
                <span>結帳</span>
            </div>
            <div v-if="petCustomizedProd" class="col horizontal-line-2 d-none d-md-block"></div>
            <div v-if="petCustomizedProd" :class="['col-auto','step','py-2',{active: step===4}]">
                <icon-component class="mx-auto" pattern="Step4" size="40"/>
                <span>綁定毛孩</span>
            </div>
            <div class="col horizontal-line-2 d-none d-md-block"></div>
            <div :class="['col-auto','step','py-2',{active: step===5}]">
                <icon-component class="mx-auto" pattern="Step5" size="40"/>
                <span>完成訂單</span>
            </div>
        </div>
        <router-view></router-view>
        <dialog-component></dialog-component>
    </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['step','record']),
        petCustomizedProd(){
            if (this.record) {
                return this.record.ShopCarList.some(p=>p.is_pet_customized)
            }
            return false
        }
    }
}
</script>
<style scoped>
    .step{
        color: #5A5B5B;
        font-size: 20px;
        opacity: 0.5;
    }
    .step.active{
        color: #49c5b1;
        font-weight: bold;
        opacity: 1;
    }
    .horizontal-line-2{
        margin-bottom: 22px;
    }
</style>