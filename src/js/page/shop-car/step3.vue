<template>
    <div class="shop-car-3 py-3">
        <div v-if="model.pay==='atm'">
            <div class="border my-3">
                <div class="text-center">
                    <h5 class="mb-0 p-3">ATM 繳款資料</h5>
                </div>
                <div class="border-top px-3">
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-5 rwd-h5 mb-0 px-3 pr-sm-5">
                                <div class="text-right">訂單編號</div>
                            </div>
                            <div class="col-7 rwd-h5 mb-0 pl-sm-5">
                                <div class="">{{ model.order_code }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-5 rwd-h5 mb-0 pr-sm-5">
                                <div class="text-right">訂單金額</div>
                            </div>
                            <div class="col-7 rwd-h5 mb-0 px-3 pl-sm-5">
                                <div class="">{{ model.prod_price }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-5 rwd-h5 mb-0 pr-sm-5">
                                <div class="text-right">銀行代碼</div>
                            </div>
                            <div class="col-7 rwd-h5 mb-0 px-3 pl-sm-5">
                                <div class="">{{ model.bank_code }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-5 rwd-h5 mb-0 pr-sm-5">
                                <div class="text-right">繳費帳號</div>
                            </div>
                            <div class="col-7 rwd-h5 mb-0 px-3 pl-sm-5">
                                <div class="">{{ model.virtual_account }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="row flex-center">
                            <div class="col-5 rwd-h5 mb-0 pr-sm-5">
                                <div class="text-right">繳費期限</div>
                            </div>
                            <div class="col-7 rwd-h5 mb-0 px-3 pl-sm-5">
                                <div class="">{{ model.payment_deadline }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="model.pay==='card'">
            <div class="border my-3">
                <div class="text-center">
                    <h5 class="mb-0 p-3">信用卡付款</h5>
                </div>
                <div class="border-top px-3">
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">訂單編號</div>
                            </div>
                            <div class="col-6">
                                {{ model.order_code }}
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">訂單金額</div>
                            </div>
                            <div class="col-6">
                                {{ model.total_price }}
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-auto my-2">
                                <div class="custom-control custom-radio"> 
                                    <input type="radio" class="custom-control-input" :id="uuid.bindCard" :value="true" v-model="model.is_bind_card">
                                    <label class="custom-control-label" :for="uuid.bindCard">使用已綁定信用卡</label>
                                </div>
                            </div>
                            <div class="col-auto my-2">
                                <div class="custom-control custom-radio"> 
                                    <input type="radio" class="custom-control-input" :id="uuid.unBindCard" :value="false" v-model="model.is_bind_card">
                                    <label class="custom-control-label" :for="uuid.unBindCard">輸入信用卡</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="['py-2',{'border-bottom': !(model.is_bind_card && user.bind_card_code)}]">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡號</div>
                            </div>
                            <div v-if="model.is_bind_card && user.bind_card_code" class="col-lg-6">
                                {{ user.bind_card_code }}
                            </div>
                            <div v-else class="col-lg-6">
                                <div class="row no-gutters align-items-center py-2 mx-n2">
                                    <div class="w-100 d-sm-none py-1"></div>
                                    <div class="col pl-2">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(0)" ref="CardCode[0]" v-model="cardCode[0]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(1)" ref="CardCode[1]" v-model="cardCode[1]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(2)" ref="CardCode[2]" v-model="cardCode[2]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col pr-2">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(3)" ref="CardCode[3]" v-model="cardCode[3]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!(model.is_bind_card && user.bind_card_code)" class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡到期日</div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row no-gutters align-items-center justify-content-center justify-content-lg-start mx-n2">
                                    <div class="col p-2" style="max-width: 120px">
                                        <input class="text-center card-input" placeholder="MM/YY" type="text" 
                                        @input="inputCardDate" @change="changeCardDate" @focus="focusCardDate" ref="CardDate" v-model="model.card_date">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!(model.is_bind_card && user.bind_card_code)" class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡安全碼</div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row no-gutters align-items-center justify-content-center justify-content-lg-start mx-n2">
                                    <div class="col p-2" style="max-width: 120px">
                                        <input class="text-center card-input" type="text" ref="CardSecurity" 
                                        @input="inputCardSecurity" v-model="model.card_security">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!model.is_bind_card" class="d-flex justify-content-end py-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :id="uuid.checkBindCard" v-model="model.save_bind_card">
                            <label class="form-check-label" :for="uuid.checkBindCard">
                                我同意綁定本次付款資訊，方便下次快速結帳。
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="model.pay==='staging'">
            <div class="border my-3">
                <div class="text-center">
                    <h5 class="mb-0 p-3">信用卡定期定額付款</h5>
                </div>
                <div class="border-top px-3">
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">訂單編號</div>
                            </div>
                            <div class="col-6">
                                {{ model.order_code }}
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">訂單金額</div>
                            </div>
                            <div class="col-6">
                                {{ model.total_price }}
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">每次扣款</div>
                            </div>
                            <div class="col-6">
                                NT${{ model.staging_price }}
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="py-2 text-center">扣款區間</div>
                            </div>
                            <div class="col-6">
                                每月自動扣款１次<br/>
                                扣款上限為{{ model.staging_limt }}次
                            </div>
                        </div>
                    </div>
                    <div class="border-bottom py-2">
                        <div class="row flex-center">
                            <div class="col-auto my-2">
                                <div class="custom-control custom-radio"> 
                                    <input type="radio" class="custom-control-input" :id="uuid.bindCard" :value="true" v-model="model.is_bind_card">
                                    <label class="custom-control-label" :for="uuid.bindCard">使用已綁定信用卡</label>
                                </div>
                            </div>
                            <div class="col-auto my-2">
                                <div class="custom-control custom-radio"> 
                                    <input type="radio" class="custom-control-input" :id="uuid.unBindCard" :value="false" v-model="model.is_bind_card">
                                    <label class="custom-control-label" :for="uuid.unBindCard">輸入信用卡</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="['py-2',{'border-bottom': !(model.is_bind_card && user.bind_card_code)}]">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡號</div>
                            </div>
                            <div v-if="model.is_bind_card && user.bind_card_code" class="col-lg-6">
                                {{ user.bind_card_code }}
                            </div>
                            <div v-else class="col-lg-6">
                                <div class="row no-gutters align-items-center py-2 mx-n2">
                                    <div class="w-100 d-sm-none py-1"></div>
                                    <div class="col pl-2">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(0)" ref="CardCode[0]" v-model="cardCode[0]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(1)" ref="CardCode[1]" v-model="cardCode[1]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(2)" ref="CardCode[2]" v-model="cardCode[2]">
                                    </div>
                                    <div class="col-auto px-1 px-sm-2">
                                        <div class="horizontal-line-1"></div>
                                    </div>
                                    <div class="col pr-2">
                                        <input class="text-center card-input" type="text" 
                                        @input="inputCardCode(3)" ref="CardCode[3]" v-model="cardCode[3]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!(model.is_bind_card && user.bind_card_code)" class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡到期日</div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row no-gutters align-items-center justify-content-center justify-content-lg-start mx-n2">
                                    <div class="col p-2" style="max-width: 120px">
                                        <input class="text-center card-input" placeholder="MM/YY" type="text" 
                                        @input="inputCardDate" @change="changeCardDate" @focus="focusCardDate" ref="CardDate" v-model="model.card_date">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!(model.is_bind_card && user.bind_card_code)" class="border-bottom py-2">
                        <div class="row align-items-center">
                            <div class="col-lg-6">
                                <div class="py-2 text-center">信用卡安全碼</div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row no-gutters align-items-center justify-content-center justify-content-lg-start mx-n2">
                                    <div class="col p-2" style="max-width: 120px">
                                        <input class="text-center card-input" type="text" ref="CardSecurity" 
                                        @input="inputCardSecurity" v-model="model.card_security">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!model.is_bind_card" class="d-flex justify-content-end py-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :id="uuid.checkBindCard" v-model="model.save_bind_card">
                            <label class="form-check-label" :for="uuid.checkBindCard">
                                我同意綁定本次付款資訊，方便下次快速結帳。
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="model.pay==='card' || model.pay==='staging'" class="bg-light d-flex flex-center" style="min-height: 250px;">
            <div class="p-3 d-flex flex-center">
                <div>
                    <div class="mx-auto mb-3 text-center" style="max-width: 580px;">
                        ※ 提供VISA、MasterCard、JCB信用卡交易，全程使全程使用安全加密，信用卡資料將不會儲存於網站，您可以安心使用信用卡付款。
                    </div>
                    <div class="mx-auto mb-3 text-danger text-center" style="max-width: 600px;">
                        ※ 若您透過APP開發頁面發現無法支付狀況，請改用其他瀏覽器開啟頁面，透過
                        <a target="_blank" href="m.me/nu4pet">m.me/nu4pet</a>
                        聯繫客服或撥打：
                        <a target="_blank" href="tel:+886800-029-920">0800-029-920</a>
                        由客服為您服務。
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="mx-1 my-2" :src="visaLogo" alt="" height="30px">
                        <img class="mx-1 my-2" :src="mastercardLogo" alt="" height="40px">
                        <img class="mx-1 my-2" :src="jcbLogo" alt="" height="35px">
                        <span class="mx-1">刷卡服務由</span>
                        <img class="mx-1 my-2" :src="tappayLogo" alt="" height="30px">
                        <img class="mx-1 my-2" :src="bank013Logo" alt="" height="40px">
                        <span>提供</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="model.pay==='atm'" class="bg-light d-flex flex-center" style="min-height: 250px;">
            <div class="p-3 d-flex align-items-end" style="max-width: 400px;">
                <div>
                    <img class="w-100" :src="bank013Logo" alt="">
                </div>
                <div class="px-2 flex-shrink-0">提供</div>
            </div>
        </div>
        <div class="d-flex justify-content-center py-4">
            <a class="btn btn-primary text-white rounded-pill mx-3" @click="nextStep">下一步</a>
        </div>
    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery'
import Swal from 'sweetalert2'
// import dayjs from 'dayjs'
import { mapState } from 'vuex'
import { getRecordDataById,getPayMethodData,updateRecordData,updateUserData,checkCardCode } from '@/api'
import { RecordModel,UserModel } from '@/models'
import getUserPromise from '../get-user'
import { bank013Logo,tappayLogo,mastercardLogo,jcbLogo,visaLogo } from '@assets'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
            cardCode: new Array(4).fill(''),
            uuid: {
                bindCard: uuidv4(),
                unBindCard: uuidv4(),
                checkBindCard: uuidv4()
            },
            bank013Logo,
            tappayLogo,
            mastercardLogo,
            jcbLogo,
            visaLogo
        }
    },
    computed: {
        ...mapState(['step','record'])
    },
    created(){
        const record = this.$store.state.record
        if (record) {
        // record.id
            getRecordDataById(1).then(res=>{
                this.model = new RecordModel({
                    ...res.data,
                    status: 'step3'
                })
                this.$store.commit('setRecord',this.model)
                this.$watch(()=>this.cardCode,this.cardCodetoModel)
                this.$watch(()=>this.model.card_code,this.cardCodetoData)
                this.cardCodetoData(this.model.card_code)
                getPayMethodData(this.model.order_code).then(res=>{
                    this.model.set({
                        ...res.data
                    })
                })
            })
            getUserPromise(user=>{
                this.user = new UserModel(user)
            })
        }else{
            this.$router.replace('1')
        }
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    methods: {
        cardCodetoModel(value){
            this.model.card_code = value.join('-')
        },
        cardCodetoData(value){
            value.split('-').forEach((v,i)=>{
                this.cardCode[i] = v
            })
        },
        inputCardCode(index){
            let value = this.cardCode[index].split('').splice(0,4).join('')
            if ( isNaN(Number(value)) ) {
                this.cardCode[index] = ''
            }else{
                this.cardCode[index] = value
            }
            if (value.length >= 4) {
                if (index >= 3) {
                    this.$refs[`CardDate`].focus()
                }else{
                    this.$refs[`CardCode[${index+1}]`].focus()
                }
            }
        },
        inputCardDate(e){
            let value = e.target.value
            if (value.length >= 4) {
                this.$refs[`CardSecurity`].focus()
            }
        },
        changeCardDate(e){
            let value = e.target.value
            if (value.length >= 2) {
                const arrString = value.split('')
                if (arrString.every(s=>isNaN(Number(s)))) {
                    this.model.card_date = ''
                }else{
                    arrString.splice(2,0,'/')
                    this.model.card_date = arrString.join('')
                }
            }
        },
        focusCardDate(e){
            e.target.value = ''
            this.model.card_date = ''
        },
        inputCardSecurity(e){
            let value = e.target.value
            if ( isNaN(Number(value)) ) {
                e.target.value = ''
                this.model.card_security = ''
            }
            if (value.length >= 3) {
                e.target.blur()
            }
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
            const model = !this.model.is_bind_card 
                ? this.model.toDatabase() 
                : this.model.toDatabase({
                    card_code: this.user.bind_card_code,
                    card_date: this.user.bind_card_date,
                    card_security: this.user.bind_card_security
                })
            const checkPayData = () =>{
                if (this.model.pay==='card' || this.model.pay==='staging') {
                    return checkCardCode(this.model)
                }else{
                    return new Promise(resolve=>{
                        resolve('OK')
                    })
                }
            }
            checkPayData().then(()=>{
                updateRecordData(model).then(res=>{
                    if (!this.model.is_bind_card&&this.model.save_bind_card) {
                        updateUserData({
                            card_code: model.card_code,
                            card_date: model.card_date,
                            card_security: model.card_security
                        }).then(()=>{}).catch(()=>{
                            Swal.fire({
                                icon: 'error',
                                title: '綁定信用卡資料失敗'
                            })
                        })
                    }
                    const isPetCustomized = this.$store.state.record.ShopCarList.some(p=>p.is_pet_customized)
                    const passRouter = isPetCustomized ? 4 : 5
                    // localStorage.setItem('record',JSON.stringify(this.model))
                    const toRouter = res.data.toRouter || passRouter
                    this.$store.commit('setRecord',this.model)
                    this.$store.commit('setStep',Number(toRouter))
                    this.$router.push(String(toRouter))
                    $('html,body').animate({scrollTop: 216}, 400);
                }).catch(err=>{
                    console.error(err)
                    Swal.fire({
                        icon: 'error',
                        title: '更新訂單資料失敗'
                    })
                })
            }).catch(err=>{
                console.error(err)
                Swal.fire({
                    icon: 'error',
                    title: err.response.data
                })
            })
            
        }
    }
    
}
</script>
<style scoped>
    .card-input{
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #5B5B5B;
        outline: none;
    }
    .horizontal-line-1{
        width: 8px;
    }
    @media (min-width:576px) {
        .horizontal-line-1{
            width: 30px;
        }
    }
</style>