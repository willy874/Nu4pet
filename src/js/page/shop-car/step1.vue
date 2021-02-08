<template>
    <div class="shop-car-1 py-3">
        <div class="border my-3">
            <div class="row no-gutters">
                <div class="col">
                    <div class="p-3 h6 mb-0 text-center">商品( 共<span>{{model.ShopCarList.length}}</span>件 )</div>
                </div>
                <div class="col-2 d-md-block d-none">
                    <div class="p-3 h6 mb-0 text-center">單價</div>
                </div>
                <div class="col-2 d-md-block d-none">
                    <div class="p-3 h6 mb-0 text-center">數量</div>
                </div>
                <div class="col-2 d-md-block d-none">
                    <div class="p-3 h6 mb-0 text-center">小計</div>
                </div>
                <div class="col-1"></div>
            </div>
            <div class="prod-list border-top py-3">
                <div v-for="item in model.ShopCarList" class="prod-item row no-gutters" :key="item.id">
                    <div class="col-12"><div class="border-spacing"></div></div>
                    <!-- 圖片 -->
                    <div class="col col-md-2 px-3" v-if="item.image&&item.image.length">
                        <img class="w-100" :src="item.image[0].url" :alt="item.subject">
                    </div>
                    <div class="col col-md-2 px-3" v-else>
                        <div class="p-100 bg-gray"></div>
                    </div>
                    <!-- 標題 -->
                    <div class="col-auto col-md px-3">
                        <h3 class="mb-0 rwd-h4" v-html="item.subject"></h3>
                    </div>
                    <!-- 價目 -->
                    <div class="col-12 d-md-none"></div>
                    <div class="col col-md-2 p-3 align-self-center">
                        <div class="rwd-h4 text-primary">NT${{item.sale_price}}</div>
                        <del class="d-block">原價：{{item.original_price}}</del>
                    </div>
                    <!-- 刪除 -->
                    <div class="col-auto col-md-auto p-3 align-self-center order-md-10">
                        <button
                            type="button"
                            class="btn rounded-circle bg-light text-dark p-2"
                            @click="deleteShopCar(item.id)"
                        >
                            <icon-component pattern="Close" size="20" />
                        </button>
                    </div>
                    <div class="col-12 d-md-none"></div>
                    <!-- 數量 -->
                    <div class="col col-md-2 p-3 align-self-center">
                        <div class="d-flex justify-content-between align-items-center border">
                            <button class="btn-icon text-dark m-1" @click="countMinus(item)">
                                <icon-component pattern="BtnMinus" size="20"/>
                            </button>
                            <input class="h6 btn-icon w-100 text-center mb-0" type="text" @change="countChange(item)" v-model="item.count"/>
                            <button class="btn-icon text-dark m-1" @click="countPlus(item)">
                                <icon-component pattern="BtnPlus" size="20"/>
                            </button>
                        </div>
                    </div>
                    <!-- 小計 -->
                    <div class="col-auto col-md-2 p-3 align-self-center d-flex justify-content-center">
                        <div class="rwd-h5 mb-0">
                            <span class="d-md-none">小計：</span>
                            {{ isNaN(Number(item.count)) ? 0 : item.sale_price*item.count }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3" v-if="model.giveaway.length">
            <div class="row no-gutters">
                <div class="col">
                    <div class="p-3 h6 mb-0">贈品項目</div>
                </div>
            </div>
            <div class="prod-list border-top py-3">
                <div v-for="item in model.giveaway" :class="['prod-item','row','no-gutters',{disabled: item.disabled}]" :key="item.id">
                    <div class="col col-md-2 px-3" v-if="item.image_url">
                        <img class="w-100" :src="item.image_url" :alt="item.title">
                    </div>
                    <div class="col col-md-2 px-3" v-else>
                        <div class="p-100 bg-gray"></div>
                    </div>
                    <div class="col col-md-10 px-3">
                        <h5 class="text-primary">{{ item.title }}</h5>
                        <div v-html="item.description"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <div class="text-center">
                <h5 class="mb-0 p-3">購物袋加購</h5>
            </div>
            <div class="border-top p-3">
                <div class="vue-slick pb-3" v-if="recommend[0].id">
                    <Slick ref="slick" v-bind="settings">
                        <div class="px-3" v-for="item in recommend" :key="item.uuid">
                            <div class="row no-gutters">
                                <div class="col-xs-6 px-2">
                                    <div>
                                        <img class="w-100" :src="item.image[0].url" :alt="item.subject">
                                    </div>
                                </div>
                                <div class="col-xs-6 d-flex justify-content-between flex-column text-center px-2">
                                    <div class="overflow-line-16" v-html="item.subject"></div>
                                    <div class="text-primary">優惠價{{item.sale_price}}</div>
                                    <button type="button" class="btn btn-primary text-white rounded-pill" @click="addShopCar(item)">加入購物車</button>
                                </div>
                            </div>
                        </div>
                    </Slick>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 my-3">
                <div class="border h-100">
                    <div class="text-center">
                         <h5 class="mb-0 p-3">我要捐款</h5>
                    </div>
                    <div class="border-top p-3">
                        <div class="p-3">
                            <h6>我要一日捐</h6>
                            <div class="text-primary mb-3">
                                "捐款金額"<br/>
                                不納入商品消費總金額免運及開立發票範圍內
                            </div>
                            <div>
                                <div class="custom-control custom-radio my-3">
                                    <input type="radio" class="custom-control-input" :id="uuid.donatePrice0" :value="0" v-model="model.donate_price">
                                    <label class="custom-control-label" :for="uuid.donatePrice0">下次捐</label>
                                </div>
                                <div class="custom-control custom-radio my-3">
                                    <input type="radio" class="custom-control-input" :id="uuid.donatePrice30" :value="30" v-model="model.donate_price">
                                    <label class="custom-control-label" :for="uuid.donatePrice30">NT$30</label>
                                </div>
                                <div class="custom-control custom-radio my-3">
                                    <input type="radio" class="custom-control-input" :id="uuid.donatePrice50" :value="50" v-model="model.donate_price">
                                    <label class="custom-control-label" :for="uuid.donatePrice50">NT$50</label>
                                </div>
                            </div>
                            <div class="border-top">
                                <div class="d-flex justify-content-end pt-3 px-3">
                                    <span class="mr-3">捐款金額</span>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ model.donate_price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="border h-100">
                    <div class="text-center">
                        <h5 class="mb-0 p-3">訂單金額總計資訊</h5>
                    </div>
                    <div class="border-top p-3">
                        <div>
                            <div class="d-flex justify-content-center py-2">
                                <div class="col-8">
                                    <input class="form-control text-center" type="text" v-model="model.point_discount" @change="checkPointDiscoun">
                                    <div class="h4 mb-0 position-absolute" style="left: 100%;top: 0;line-height:35px;">P</div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center py-2">
                                <button class="btn btn-primary text-white rounded-pill" @click="changeMaxPointDiscoun">一鍵折抵最大額</button>
                            </div>
                            <div class="text-center py-2">
                                <span>目前剩餘</span>
                                <span class="text-primary">{{ user.point - model.point_discount }}</span>
                                <span>枚P幣</span>
                                <span>，本筆消費最多可折抵</span>
                                <span class="text-primary">{{ model.max_point_discount }}</span>
                                <span>元</span>
                            </div>
                            <div class="d-flex justify-content-center py-2">
                                <div class="col-8">
                                    <input class="form-control text-center" type="text" placeholder="＋輸入優惠促銷代碼" @change="inputSaleCode">
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="d-flex justify-content-between align-items-center py-1">
                                    <div>商品金額小計</div>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ prodPriceSum }}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                    <div>商城折扣</div>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ model.shop_discount }}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                    <div>優惠代碼折扣</div>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ model.code_discount }}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                    <div>P幣折抵</div>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ pointDiscount }}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center py-1">
                                    <div>運費</div>
                                    <div>
                                        <span class="mr-1">NT$</span>
                                        <span>{{ model.shipping_rate }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="border-top">
                                <div class="d-flex justify-content-end px-3">
                                    <div class="py-2">
                                        <div class="py-1">
                                            <span class="mr-3">商品總計</span>
                                            <span class="mr-1">NT$</span>
                                            <span>{{ recordPriceSum }}</span>
                                        </div>
                                        <div class="text-primary py-1">此金額為發票金額</div>
                                        <div class="py-1">
                                            <span>取貨後獲得點數+</span>
                                            <span>{{ model.order_point }}</span>
                                            <span>P幣</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <h4 class="d-flex justify-content-center mb-0 p-3">
                <div class="mr-2">總計</div>
                <div class="mr-1">NT$</div>
                <div>{{ recordTotal }}</div>
            </h4>
        </div>
        <div class="border my-3">
            <div class="text-center">
                <h5 class="mb-0 p-3">選擇付款方式</h5>
            </div>
            <div class="border-top px-3">
                <div :class="{'border-top': index,disabled: item.disabled}" v-for="(item,index) in payMethodFilter" :key="item.uuid">
                    <div class="row align-items-center">
                        <div class="py-2 col-lg-6">
                            <div class="custom-control custom-radio my-3">
                                <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['pay']}]" :disabled="item.disabled" :id="item.uuid" :value="item.name" v-model="model.pay">
                                <label class="custom-control-label" :for="item.uuid">{{ item.title }}</label>
                            </div>
                        </div>
                        <div class="col-lg-6 py-2">
                            <div class="d-flex" v-if="item.description">
                                <div>※</div>
                                <div v-html="item.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center py-3" v-if="payMethodFilter.length===0">
                    無付款方式
                </div>
            </div>
        </div>
        <div class="py-3">
            <div class="row no-gutters">
                <div class="col-md-3 col-xl-2 d-none d-md-block bg-primary">
                    <svg class="w-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
                        <g id="precautions">
                            <text x="125" y="115" text-anchor="middle">注意</text>
                            <text x="125" y="185" text-anchor="middle">事項</text>
                        </g>
                    </svg>
                </div>
                <div class="col-12 col-md-9 col-xl-10 bg-light py-3 px-4 d-flex flex-center">
                    <div class="text-dark">
                        <h2 class="text-center font-weight-bold d-md-none mb-4">注意事項</h2>
                        <h4 class="text-primary">提醒您陪心商城之商品將會隨『正式客製寵糧』一同出貨</h4>
                        <div class="py-lg-2"></div>
                        <div>＃若本訂單已進入包裝作業，恕無法取消或修改訂單內容。</div>
                        <div>＃您可以隨時到本網站『訂單查詢』查看目前訂單進度。</div>
                        <div>＃如訂購商品無法順利出貨或缺貨，我們將主動通知您並取消該訂單品項。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center py-3">
            <a class="btn btn-primary text-white rounded-pill mx-3" href="./shop">繼續購物</a>
            <a class="btn btn-primary text-white rounded-pill mx-3" @click="nextStep">下一步</a>
        </div>
    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
import { getRecommend,getDiscountRules,getSaleCodeDiscount,getPayMethod } from '@/api'
import { RecordModel,ProdModel,ShopCarModel,UserModel,GiveawayModel } from '@/models'
import { addShopCarMethod,updateShopCarMethod,deleteShopCarMethod } from '@/library'
import Slick from '@/plugins/slick/vue'
import getShopCarPromise from '../get-shop-car'

export default {
    data(){
        return {
            model: new RecordModel(),
            recommend: [new ProdModel],
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true,
                arrows: true,
                autoplay: true,
                infinite: true,
                speed: 300,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }]
            },
            uuid: {
                donatePrice0: uuidv4(),
                donatePrice30: uuidv4(),
                donatePrice50: uuidv4(),
            },
            user: new UserModel(),
            payMethod: undefined
        }
    },
    created(){
        getShopCarPromise(({user,shopCar})=>{
            this.user = new UserModel(user)
            const record = this.$store.state.record
            if (record && (record.status==='step1' || record.status==='step2')) {
                    this.model = new RecordModel(record)
            }else{
                getDiscountRules(user.account).then(res=>{
                    this.model = new RecordModel({
                        ShopCarList: shopCar.map(p=>new ShopCarModel({
                            ...p,
                            user_id: user.id,
                        })),
                        giveaway: res.data.giveaway.map(p=>new GiveawayModel(p)),
                        max_point_discount: res.data.max_point_discount,
                        order_point: res.data.order_point,
                        shipping_rate: res.data.shipping_rate,
                        shop_discount: res.data.shop_discount
                    })
                }).catch(err =>{
                    console.error(err)
                })
            }
            
            getRecommend(user.id).then(res=>{
                this.recommend = res.data.map(p=>new ProdModel(p))
                this.recommend.forEach(p=>{
                    p.uuid = uuidv4()
                })
            }).catch(err =>{
                console.error(err)
            })

            getPayMethod().then(res=>{
                this.payMethod = res.data.map(p=>{
                    p.uuid = uuidv4()
                    return p 
                })
            }).catch(err =>{
                console.error(err)
            })
        })
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    computed: {
        ...mapState(['step','record']),
        pointDiscount(){
            return Math.ceil(this.model.point_discount / 100) 
        },
        prodPriceSum(){
            const price = this.model.ShopCarList.reduce((price, item) =>{
                return item.sale_price*item.count + price
            },0)
            return price
        },
        recordPriceSum(){
            return this.prodPriceSum - this.model.shop_discount - this.model.code_discount - this.pointDiscount + this.model.shipping_rate
        },
        recordTotal(){
            return this.recordPriceSum + this.model.donate_price
        },
        payMethodFilter(){
            return this.payMethod || []
        }
    },
    watch: {
        recordTotal(val){
            this.model.total_price = val
            return this.model.total_price
        }
    },
    methods: {
        getDiscountRules(){
            getDiscountRules(this.user.account).then(res=>{
                this.model.giveaway = res.data.giveaway && res.data.giveaway.map(p=>new GiveawayModel(p))
                this.model.shop_discount = res.data.shop_discount
                this.model.shipping_rate = res.data.shipping_rate
                this.model.max_point_discount = res.data.max_point_discount
                this.model.order_point = res.data.order_point
            })
        },
        updateRecord(item){
            updateShopCarMethod.call(this,{
                id: item.shop_car_id,
                prod_id: item.id,
                count: item.count,
                user_id: this.user.id,
            }).then(()=>{
                this.getDiscountRules()
            })
        },
        countMinus(item){
            item.count--
            this.updateRecord(item)
        },
        countPlus(item){
            item.count++
            this.updateRecord(item)
        },
        countChange(item){
            if (isNaN(Number(item.count))) {
                item.count = 0
            }
            this.updateRecord(item)
        },
        addShopCar(item){
            addShopCarMethod.call(this,{
                prod_id: item.id,
                user_id: this.user.id,
            }).then(res=>{
                this.model.ShopCarList = res.data.map(p=>new ShopCarModel({
                    ...p,
                    user_id: this.user.id,
                }))
                this.getDiscountRules()
            })
        },
        deleteShopCar(id){
            deleteShopCarMethod.call(this,{
                id,
                user_id: this.user.id,
            }).then(res=>{
                this.model.ShopCarList = res.data.map(p=>new ShopCarModel(p))
                this.getDiscountRules()
            })
        },
        inputSaleCode(e){
            const input = e.target.value
            getSaleCodeDiscount(input,this.model).then(res=>{
                this.model.code_discount = Number(res.data.code_discount)
            })
        },
        checkPointDiscoun(e){
            const input = e.target.value
            const minPoint = Math.min(this.model.max_point_discount,this.user.point)
            if (this.model.point_discount > minPoint) {
                this.model.point_discount = minPoint
            }else if(isNaN(Number(input))){
                this.model.point_discount = 0
            }
        },
        changeMaxPointDiscoun(){
            this.model.point_discount = Math.min(this.model.max_point_discount,this.user.point)
        },
        nextStep(){
            const errors = this.model.validate()
            const errorsMessage = Object.keys(errors).map(key=>errors[key][0])
            if (errorsMessage.length) {
                Swal.fire({
                    icon: 'error',
                    title: '請完整填寫資料',
                    html: errorsMessage.map(msg=>{
                        return `<h6>${msg}</h6>`
                    }).join(''),
                })
                return
            }
            this.model.status = 'step2'
            this.$store.commit('setRecord',this.model)
            this.$store.commit('setStep')
            this.$router.push('2')
            $('html,body').animate({scrollTop: 216}, 400);
        }
    },
    components: { 
        Slick
    }
}
</script>
<style scoped>
    .disabled{
        opacity: 0.5;
    }
    #precautions{
        fill: #ffffff;
        font: bold 72px sans-serif;
    }
</style>