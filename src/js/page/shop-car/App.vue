<template>
    <section class="container py-5">
        <h2 class="pb-5">購物袋</h2>
        <div class="row align-items-center">
            <div class="col-auto">
                <router-link to="/shop-car/1" :class="['router-link']">購物袋</router-link>
            </div>
            <div class="col horizontal-line"></div>
            <div class="col-auto">
                <router-link to="/shop-car/2" :class="['router-link',{disabled: step < 2}]">資料填寫</router-link>
            </div>
            <div class="col horizontal-line"></div>
            <div class="col-auto">
                <router-link to="/shop-car/3" :class="['router-link',{disabled: step < 3}]">結帳</router-link>
            </div>
            <div class="col horizontal-line"></div>
            <div class="col-auto">
                <router-link to="/shop-car/4" :class="['router-link',{disabled: step < 4}]">綁定毛孩</router-link>
                </div>
            <div class="col horizontal-line"></div>
            <div class="col-auto">
                <router-link to="/shop-car/5" :class="['router-link',{disabled: step < 5}]">完成訂單</router-link>
            </div>
        </div>
        <router-view></router-view>
        <dialog-component></dialog-component>
    </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data(){
        return {
            
        }
    },
    computed: {
        ...mapState(['step'])
    }
}
</script>
<style scoped>
    .horizontal-line{
        background-color: #5A5B5B;
        height: 2px;
    }
    .router-link{
        color: #5A5B5B;
        font-size: 20px;
    }
    .router-link.router-link-active{
        color: #49c5b1;
        font-weight: bold;
    }
    .router-link:hover{
        color: #49c5b1;
    }
    .router-link.disabled{
        pointer-events: none;
        opacity: 0.5;
    }
</style>