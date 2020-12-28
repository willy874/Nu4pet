<template>
    <div class="shop-car-1 py-3">
        <div class="border my-3">
            <div class="row no-gutters">
                <div class="col-6">
                    <div class="p-3">商品( 共<span>{{model.ShopCarList.length}}</span>件 )</div>
                </div>
                <div class="col-2">
                    <div class="p-3">單價</div>
                </div>
                <div class="col-2">
                    <div class="p-3">數量</div>
                </div>
                <div class="col-2">
                    <div class="p-3">小計</div>
                </div>
            </div>
            <div class="prod-list border-top py-3">
                <div v-for="item in model.ShopCarList" class="prod-item row no-gutters" :key="item.id">
                    <div class="col-12"><div class="border-spacing"></div></div>
                    <div class="col-2 px-3" v-if="item.image&&item.image.length">
                        <img class="w-100" :src="item.image[0].url" :alt="item.subject">
                    </div>
                    <div class="col-2 px-3" v-else>
                        <div class="p-100 bg-gray"></div>
                    </div>
                    <div class="col-4 px-3">
                        <h3 class="mb-0 rwd-h4" v-html="item.subject"></h3>
                    </div>
                    <div class="col-2 p-3 align-self-center">
                        <div class="rwd-h4 text-primary">NT${{item.sale_price}}</div>
                        <div class="">原價：{{item.original_price}}</div>
                    </div>
                    <div class="col-2 p-3 align-self-center">
                        <div class="">{{item.count}}</div>
                    </div>
                    <div class="col-2 p-3 align-self-center d-flex align-items-center justify-content-between">
                        <div class="rwd-h5">{{item.original_price*item.count}}</div>
                        <button
                            type="button"
                            class="btn rounded-circle bg-light text-dark p-2"
                            @click="deleteShopCar(item.id)"
                        >
                            <icon-component pattern="Close" size="20" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <div class="text-center">
                購物袋加購價
            </div>
            <div class="border-top p-3">
                <div class="vue-slick">
                    <Slick ref="slick" v-bind="settings">
                        <div class="px-3" v-for="item in [1,2,3,4,5,6]" :key="item">
                            <div>123</div>
                        </div>
                    </Slick>
                </div>
            </div>
        </div>
        <div class="row my-3">
            <div class="col-6">
                <div class="border">
                    <div class="text-center">我要捐款</div>
                    <div class="border-top p-3">
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="border">
                    <div class="text-center">訂單金額總計資訊</div>
                    <div class="border-top p-3">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <h4 class="d-flex justify-content-center mb-0">
                <div>總計</div>
                <div>NT$</div>
                <div>1000</div>
            </h4>
        </div>
        <div class="text-dark text-center">
            <h6 class="font-weight-bold">注意事項</h6>
            <p class="h6">※<span class="text-primary">客製化寵糧</span>需約<span class="text-primary">7</span>個工作天，如訂單中有其他陪心商品將會隨寵糧製作<span class="text-primary">完成後一同出貨</span>唷！</p>
        </div>
        <div class="d-flex justify-content-center">
            <a class="btn btn-primary text-white rounded-pill" href="./shop">繼續購物</a>
            <router-link to="2" class="btn btn-primary text-white rounded-pill">下一步</router-link>
        </div>
    </div>
</template>
<script>
import onCreatedStep from './created-step'
import { RecordModel } from '@/models'
import Slick from '@/plugins/slick/vue'

export default {
    data(){
        return {
            model: new RecordModel(),
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true,
                arrows: true,
                infinite: true,
                speed: 300,
            },
        }
    },
    created(){
        onCreatedStep.call(this,({user})=>{
            console.log('user',user)
            console.log(this.model)
        })
    },
    methods: {
        deleteShopCar(id){
            console.log(id);
        }
    },
    components: { 
        Slick
    }
}
</script>