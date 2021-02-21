<template>
    <div class="shop-car-5 py-3">
        <div class="row flex-center py-3">
            <div class="col-2 col-lg-1 d-none d-md-block">
                <icon-component class="text-primary" pattern="CheckRound" size="100%"></icon-component>
            </div>
            <div class="col-auto">
                <h3 class="font-weight-bold">您的訂單已成立！</h3>
                <div>
                    您可以到<a href="javascript:;">訂單查詢查</a>看<a href="javascript:;">訂單進度</a>，<br/>
                    若有疑慮及意見，歡迎與我們客服人員聯繫，感謝您的訂購！
                </div>
            </div>
        </div>
        <div class="border-bottom py-3">
            <div>親愛的 {{ user.name }} 您好，感謝您的訂購。</div>
        </div>
        <div class="border-bottom py-3" v-if="model.pay==='atm'">
            <div>繳費詳情</div>
            <div class="px-4" v-if="payMethod.length">
                <div>您選擇的付款方式為{{ getPayMethod.title || '' }}，繳費資訊如下：</div>
                <div v-if="model.pay==='card'">
                    <div>繳費信用卡：{{ hiddenCardCode }}</div>
                </div>
                <div v-else-if="model.pay==='staging'">
                    <div>繳費信用卡：{{ hiddenCardCode }}</div>
                </div>
                <div v-else-if="model.pay==='atm'">
                    <div>銀行代碼：{{ model.bank_code }}</div>
                    <div>繳費帳號：{{ model.virtual_account }}</div>
                    <div>繳費期限：{{ model.payment_deadline }}</div>
                </div>
                <div v-else>
                    無
                </div>
            </div>
        </div>
        <div class="border-bottom py-3">
            <div>發票詳情</div>
            <div class="px-4">
                <div>發票類型 {{ getInvoiceType }}</div>
                <div v-if="model.invoice_type==='double'">
                    
                </div>
                <div v-else-if="model.invoice_type==='triple'">
                    <div>公司名稱：{{ corporation_name }}</div>
                    <div>統一編號：{{ corporation_code }}</div>
                </div>
                <div v-else-if="model.invoice_type==='vehicle'">
                    
                </div>
                <div v-else-if="model.invoice_type==='natural'">
                    
                </div>
            </div>
        </div>
        <div class="border-bottom py-3">
            <div>收件人詳情</div>
            <div class="px-4">
                <div>{{ model.name }}</div>
                <div>{{ model.phone }}</div>
                <div>{{ model.address_code }} {{ model.address_city }}{{ model.address_area }}{{ model.address }}</div>
            </div>
        </div>
        <div class="py-4">
            <h3 class="font-weight-bold py-3">產品明細</h3>
            <div class="border">
                <div class="row no-gutters border-bottom">
                    <div class="col">
                        <div class="p-3 h6 mb-0">商品( 共<span>{{model.ShopCarList.length}}</span>件 )</div>
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
                </div>
                <div class="border-bottom" v-for="item in model.ShopCarList" :key="item.shop_car_id">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <div class="row no-gutters">
                                <div class="col col-lg-3 py-3 px-3">
                                    <img v-if="item.image&&item.image.length" class="w-100" :src="item.image[0].url" :alt="item.subject">
                                    <div v-else class="bg-light p-100"></div>
                                </div>
                                 <div class="col-12 col-xs py-3 px-3">
                                    <div v-if="item.order_code">
                                        客製寵糧訂單編號：<br/>
                                        {{ item.order_code }}
                                    </div>
                                    <div v-html="item.subject"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row no-gutters align-items-center h-100">
                                <div class="col-12 col-sm-4 p-3 d-flex flex-center">
                                    <div>
                                        <div class="">NT${{item.sale_price}}</div>
                                        <del class="d-block">原價：{{item.original_price}}</del>
                                    </div>
                                </div>
                                <div class="col-4 col-sm-4 p-3 d-flex flex-center">
                                    <div>X {{item.count}}</div>
                                </div>
                                <div class="col-8 col-sm-4 p-3 d-flex flex-center">
                                    <div>NT$ {{item.count * item.sale_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="item.order_code && item.pet_id">
                        <div class="col-12">
                            <div class="d-flex justify-content-center py-2">
                                <icon-component class="text-primary mx-1" pattern="CheckRound" size="24"></icon-component>
                                <span class="text-primary mx-1">此筆訂單已綁定給 {{ item.pet.name }}</span>
                            </div>
                        </div>
                        <div class="col-md-6 py-3">
                            <div class="d-flex flex-center">
                                <div class="col-6 col-sm-4 col-xl-3">
                                    <div class="rounded-circle p-1 bg-primary">
                                        <div class="bg-white rounded-circle p-1">
                                            <img class="w-100 rounded-circle" :src="item.pet.image_url" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="h6 mb-0 py-1">{{ item.pet.name }}</div>
                                    <div class="h6 mb-0 py-1">{{ item.pet.body_weight }}kg</div>
                                </div>
                            </div>
                        </div>
                        <!-- TODO: 彈窗選項 -->
                        <div class="col-md-6 py-2" v-if="recordCount">
                            <div class="p-3" v-if="recordCount === 1">
                                <div class="pb-1">試吃包出貨日期：：</div>
                                <div class="p-2">
                                    <input class="form-control rounded-pill bg-light" type="date" v-model="item.taste_date">
                                </div>
                            </div>
                            <div class="p-3" v-else-if="item.case==='mouth' || item.case==='season'">
                                <div class="pb-1">指定出貨日期：</div>
                                <div class="p-2">
                                    <button type="button" class="btn btn-light text-left rounded-pill w-100" @click="openDialog(item)">
                                        <span class="text-gray" v-if="item.taste_date">選擇日期</span>
                                        <span v-else>{{ item.taste_date }}</span>
                                    </button>
                                </div>
                            </div>
                            <div class="p-3" v-else-if="item.case==='year'">
                                <div class="pb-1">指定出貨日期：</div>
                                <div class="p-2">
                                    <button type="button" class="btn btn-light text-left rounded-pill w-100" @click="openDialog(item)">
                                        <span class="text-gray" v-if="!item.taste_date">選擇日期</span>
                                        <span v-else>{{ item.taste_date }}</span>
                                    </button>
                                </div>
                                <div class="pb-1">指定單月特調口味：</div>
                                <div class="p-2">
                                    <button type="button" class="btn btn-light text-left rounded-pill w-100" @click="openDialog(item)">
                                        <span class="text-gray" v-if="!item.taste_odd">選擇口味</span>
                                        <span v-else>{{ item.taste_odd }}</span>
                                    </button>
                                </div>
                                <div class="pb-1">指定雙月特調口味：</div>
                                <div class="p-2">
                                    <button type="button" class="btn btn-light text-left rounded-pill w-100" @click="openDialog(item)">
                                        <span class="text-gray" v-if="!item.taste_even">選擇口味</span>
                                        <span v-else>{{ item.taste_even }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="col-lg-6 py-3">
                        <div class="py-2">
                            <div class="d-flex justify-content-between align-items-center py-1">
                                <div>商品金額小計</div>
                                <div>
                                    <span class="mr-1">NT$</span>
                                    <span>{{ prodPriceSum }}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1">
                                <div>捐款金額</div>
                                <div>
                                    <span class="mr-1">NT$</span>
                                    <span>{{ model.donate_price }}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center py-1">
                                <div>折扣</div>
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
        <div class="border">
            <h4 class="d-flex justify-content-center mb-0 p-3">
                <div class="mr-2">總計</div>
                <div class="mr-1">NT$</div>
                <div>{{ model.total_price }}</div>
            </h4>
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
                        <h4 class="text-primary">提醒您陪心商城之商品將會隨『正式客製寵糧』一同出貨</h4>
                        <div>＃若本訂單已進入包裝作業，恕無法取消或修改訂單內容。</div>
                        <div>＃您可以隨時到本網站『<a href="javascript:;">訂單查詢</a>』查看目前訂單進度。</div>
                        <div>＃如訂購商品無法順利出貨或缺貨，我們將主動通知您並取消該訂單品項。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center py-3">
            <a class="btn btn-primary text-white rounded-pill mx-3" href="./shop">再次逛逛</a>
            <a class="btn btn-primary text-white rounded-pill mx-3" href="./record">訂單查詢</a>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { getPayMethod,getProdTaste,updateRecordShopCarListData,getRecordCountByAccount } from '@/api'
import { RecordModel,UserModel } from '@/models'
import getUserPromise from '../get-user'
import DialogView from './dialog.vue'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
            payMethod: [],
            recordCount: 0
        }
    },
    created(){
        // TODO: test mode
        const record = this.$store.state.record || JSON.parse(localStorage.getItem('record'))
        if (record) {
            localStorage.setItem('record',JSON.stringify(record))
            getUserPromise(user=>{
                this.user = new UserModel(user)
                this.model = new RecordModel(record)
                getRecordCountByAccount(this.user.account).then(res=>{
                    this.recordCount = Number(res.data.count)
                })
            })
            getPayMethod().then(res=>{
                this.payMethod = res.data.map(p=>{
                    p.uuid = uuidv4()
                    return p 
                })
            }).catch(err =>{
                console.error(err)
            })
        }else{
            this.$router.replace('1')
        }
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    computed: {
        getPayMethod(){
            return this.payMethod.find(p=>p.name===this.model.pay)
        },
        hiddenCardCode(){
            const cardCode = this.model.card_code
            if (cardCode) {
                return [
                    '****',
                    '****',
                    '****',
                    cardCode.substring(15, 19)
                ].join('-')
            }
           return ''
        },
        getInvoiceType(){
            switch (this.model.invoice_type) {
                case 'double': return '二聯式發票';
                case 'triple': return '三聯式發票';
                case 'vehicle': return '行動載具';
                case 'natural': return '自然人憑證';
                default: return ''
            }
        },
        pointDiscount(){
            return Math.ceil(this.model.point_discount / 100) + this.model.code_discount
        },
        prodPriceSum(){
            const price = this.model.ShopCarList.reduce((price, item) =>{
                return item.sale_price*item.count + price
            },0)
            return price
        },
        recordPriceSum(){
            return this.prodPriceSum - this.model.shop_discount - this.model.code_discount - this.pointDiscount + this.model.shipping_rate + this.model.donate_price
        }
    },
    methods: {
        openDialog(model){
            if (model.taste_date) {
                return
            }
            getProdTaste(model.id).then(res=>{
                const taste_odd = res.data.map(item=>{
                    return {
                        ...item,
                        uuid: uuidv4()
                    }
                })
                const taste_even = res.data.map(item=>{
                    return {
                        ...item,
                        uuid: uuidv4()
                    }
                })
                this.$dialog.popup({
                    body: DialogView,
                    size: '630px',
                    attrs: {
                        model,
                        taste_odd,
                        taste_even
                    }
                }).then(attrs=>{
                    updateRecordShopCarListData(attrs.model).then(() => {
                        Swal.fire({
                            icon: 'success',
                            timer: 1500,
                            title: '已成功修改指定出貨資訊',
                            showConfirmButton: false,
                        })
                    })
                }).catch(()=>{
                    return
                })
            })
        }
    }
}
</script>
<style scoped>
    #precautions{
        fill: #ffffff;
        font: bold 72px sans-serif;
    }
</style>