<template>
    <div class="shop-car-2 py-3">
        <div class="border my-3">
            <h4 class="d-flex justify-content-center mb-0 p-3">
                <div class="mr-2">總計</div>
                <div class="mr-1">NT$</div>
                <div>{{ model.total_price }}</div>
            </h4>
        </div>
        <div class="border my-3">
            <div class="text-center">
                <h5 class="mb-0 p-3">收件資料</h5>
            </div>
            <div class="border-top p-3">
                <div class="row align-items-center">
                    <div class="col-auto h6 mb-0 py-2">收件姓名</div>
                    <div class="col-12 d-sm-none"></div>
                    <div class="col py-2">
                        <input :class="['form-control',{'is-invalid':model.errors['name']}]" placeholder="請輸入您的姓名" type="text" v-model="model.name">
                    </div>
                    <div class="col-auto py-2">
                        <select :class="['custom-select',{'is-invalid':model.errors['sex']}]" v-model="model.sex">
                            <option value="M">先生</option>
                            <option value="G">小姐</option>
                        </select>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-auto h6 mb-0 py-2">收件電話</div>
                    <div class="col py-2">
                        <input :class="['form-control',{'is-invalid':model.errors['phone']}]" placeholder="請輸入您的電話" type="text" v-model="model.phone">
                    </div>
                    <div class="col-12 d-lg-none"></div>
                    <div class="col-auto h6 mb-0 py-2">E-mail</div>
                    <div class="col py-2">
                        <input :class="['form-control',{'is-invalid':model.errors['email']}]" placeholder="請輸入您的信箱" type="text" v-model="model.email">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-auto h6 mb-0 py-2">收件地址</div>
                    <div class="col-auto py-2">
                        <input style="max-width:80px;" :class="['text-center','form-control',{'is-invalid':model.errors['address_code']}]" placeholder="郵遞區號" type="text" v-model="model.address_code" @input="inputAddressCode">
                    </div>
                    <div class="col-12 d-md-none"></div>
                    <div class="col-6 col-md-auto py-2">
                        <select :class="['custom-select',{'is-invalid':model.errors['address_city']}]" v-model="model.address_city" @change="changeAddressCityOrArea">
                            <option value="" :selected="model.address_city" disabled>請選擇</option>
                            <option v-for="str in arrCityList" :key="str" :value="str">{{ str }}</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-auto py-2">
                        <select :class="['custom-select',{'is-invalid':model.errors['address_area']}]" v-model="model.address_area" @change="changeAddressCityOrArea">
                            <option value="" :selected="model.address_area" disabled>請選擇</option>
                            <option v-for="str in arrAreaList" :key="str" :value="str">{{ str }}</option>
                        </select>
                    </div>
                    <div class="col-12 d-lg-none"></div>
                    <div class="col py-2">
                        <input :class="['form-control',{'is-invalid':model.errors['address']}]" placeholder="請輸入您的地址" type="text" v-model="model.address">
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <div class="text-center">
                <h5 class="mb-0 p-3">選擇付款方式</h5>
            </div>
            <div class="border-top px-3">
                <div class="border-bottom">
                    <div class="row">
                        <div :class="['py-2',model.pay==='card'?'col-lg-6':'col-12']">
                            <div class="custom-control custom-radio my-3">
                                <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['pay']}]" :id="uuid.card" value="card" v-model="model.pay">
                                <label class="custom-control-label" :for="uuid.card">信用卡一次付清</label>
                            </div>
                        </div>
                        <div class="col-lg-6 py-2" v-show="model.pay==='card'">
                            <div class="row no-gutters align-items-center py-2 mx-n2">
                                <div class="col-auto px-2">
                                    信用卡號：
                                </div>
                                <div class="w-100 d-sm-none py-1"></div>
                                <div class="col pl-2">
                                    <input class="text-center card-input" type="text" 
                                    @input="inputCardCode($event,0)" @focus="focusCardCode($event,0)" ref="CardCode[0]">
                                </div>
                                <div class="col-auto px-1 px-sm-2">
                                    <div class="horizontal-line-1"></div>
                                </div>
                                <div class="col">
                                    <input class="text-center card-input" type="text" 
                                    @input="inputCardCode($event,1)" @focus="focusCardCode($event,1)" ref="CardCode[1]">
                                </div>
                                <div class="col-auto px-1 px-sm-2">
                                    <div class="horizontal-line-1"></div>
                                </div>
                                <div class="col">
                                    <input class="text-center card-input" type="text" 
                                    @input="inputCardCode($event,2)" @focus="focusCardCode($event,2)" ref="CardCode[2]">
                                </div>
                                <div class="col-auto px-1 px-sm-2">
                                    <div class="horizontal-line-1"></div>
                                </div>
                                <div class="col pr-2">
                                    <input class="text-center card-input" type="text" 
                                    @input="inputCardCode($event,3)" @focus="focusCardCode($event,3)" ref="CardCode[3]">
                                </div>
                            </div>
                            <div class="row no-gutters align-items-center mx-n2">
                                <div class="col-auto p-2">
                                    到期日
                                </div>
                                <div class="col p-2">
                                    <input class="text-center card-input" placeholder="MM/YY" type="text" 
                                    @input="inputCardDate" @change="changeCardDate" @focus="focusCardDate" ref="CardDate">
                                </div>
                                <div class="w-100 d-sm-none"></div>
                                <div class="col-auto p-2">
                                    信用卡安全碼
                                </div>
                                <div class="col p-2">
                                    <input class="text-center card-input" type="text" ref="CardSecurity" 
                                    @input="inputCardSecurity">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-bottom">
                    <div class="row align-items-center">
                        <div :class="['py-2',model.pay==='atm'?'col-lg-6':'col-12']">
                            <div class="custom-control custom-radio my-3">
                                <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['pay']}]" :id="uuid.atm" value="atm" v-model="model.pay">
                                <label class="custom-control-label" :for="uuid.atm">ATM一次付清</label>
                            </div>
                        </div>
                        <div class="col-lg-6 py-2" v-show="model.pay==='atm'">
                            <div class="d-flex">
                                <div>※</div>
                                <div>
                                    訂購完成後，請記住14碼的「付款帳號」，或可至訂單查詢查詢該筆訂單的付款帳號，並於指定日期前至自動櫃員機或線上ATM操作轉帳。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="row align-items-center">
                        <div :class="['py-2',model.pay==='staging'?'col-lg-6':'col-12']">
                            <div class="custom-control custom-radio my-3">
                                <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['pay']}]" :id="uuid.staging" value="staging" v-model="model.pay">
                                <label class="custom-control-label" :for="uuid.staging">
                                    <span>信用卡定期定額</span>
                                    <span>只有單筆寵糧的季方案或年方案才能使用此付款！</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-lg-6 py-2" v-show="model.pay==='staging'">
                            <div>信用卡號：</div>
                            <div>{{ model.staging_card_code }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border my-3">
            <div class="text-center">
                <h5 class="mb-0 p-3">索取發票</h5>
            </div>
            <div class="border-top px-3">
                <div class="border-bottom row align-items-center justify-content-center">
                    <div class="col-auto my-3">
                        <div class="custom-control custom-radio"> 
                            <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['invoice_type']}]" :id="uuid.double" value="double" v-model="model.invoice_type">
                            <label class="custom-control-label" :for="uuid.triple">二聯式電子發票</label>
                        </div>
                    </div>
                    <div class="col-auto my-3">
                        <div class="custom-control custom-radio"> 
                            <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['invoice_type']}]" :id="uuid.triple" value="triple" v-model="model.invoice_type">
                            <label class="custom-control-label" :for="uuid.triple">三聯式電子發票</label>
                        </div>
                    </div>
                    <div class="col-auto my-3">
                        <div class="custom-control custom-radio"> 
                            <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['invoice_type']}]" :id="uuid.vehicle" value="vehicle" v-model="model.invoice_type">
                            <label class="custom-control-label" :for="uuid.vehicle">手機條碼載具</label>
                        </div>
                    </div>
                    <div class="col-auto my-3">
                        <div class="custom-control custom-radio"> 
                            <input type="radio" :class="['custom-control-input',{'is-invalid':model.errors['invoice_type']}]" :id="uuid.natural" value="natural" v-model="model.invoice_type">
                            <label class="custom-control-label" :for="uuid.natural">自然人憑證條碼</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="border-bottom d-flex align-items-center justify-content-center">
                        <div class="col-auto my-3">
                            <div class="custom-control custom-radio"> 
                                <input type="radio" class="custom-control-input" :id="uuid.donateY" value="Y" v-model="model.invoice_donate">
                                <label class="custom-control-label" :for="uuid.donateY">捐贈發票</label>
                            </div>
                        </div>
                        <div class="col-auto my-3">
                            <div class="custom-control custom-radio"> 
                                <input type="radio" class="custom-control-input" :id="uuid.donateN" value="N" v-model="model.invoice_donate">
                                <label class="custom-control-label" :for="uuid.donateN">不捐贈發票</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-3">
            <img class="w-100" :src="bank" alt="">
        </div>
        <div class="d-flex justify-content-center">
            <a class="btn btn-primary text-white rounded-pill" @click="nextStep">下一步</a>
        </div>
    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery'
import Swal from 'sweetalert2'
import { addRecordData } from '@/api'
import { RecordModel,UserModel } from '@/models'
import getUserPromise from '../get-user'
import getCityPromise from '../get-city'
import assets from '@assets'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
            city: undefined,
            cardCode: new Array(4).fill(''),
            uuid: {
                card: uuidv4(),
                atm: uuidv4(),
                staging: uuidv4(),
                triple: uuidv4(),
                double: uuidv4(),
                vehicle: uuidv4(),
                natural: uuidv4(),
                donateY: uuidv4(),
                donateN: uuidv4(),
            },
            mountedPromise: undefined,
            bank: assets.bank
        }
    },
    created(){
        this.mountedPromise = new Promise((resolve)=>{
            const record = this.$store.state.record
            if (record) {
                getUserPromise(user=>{
                    this.model = new RecordModel(record)
                    this.user = new UserModel(user)
                    resolve({user,record})
                })
            }else{
                this.$router.replace('1')
            }
        })
    },
    mounted(){
        this.mountedPromise.then(({user,record})=>{
            this.cardCode[0] = this.$refs['CardCode[0]'].value = record.card_code.split('-')[0] || ''
            this.cardCode[1] = this.$refs['CardCode[1]'].value = record.card_code.split('-')[1] || ''
            this.cardCode[2] = this.$refs['CardCode[2]'].value = record.card_code.split('-')[2] || ''
            this.cardCode[3] = this.$refs['CardCode[3]'].value = record.card_code.split('-')[3] || ''
            this.$refs['CardDate'].value = record.card_date || ''
            this.$refs['CardSecurity'].value = record.card_security || ''
            this.model.name = record.name || user.name
            this.model.sex = record.sex || user.sex
            this.model.email = record.email || user.email
            this.model.phone = record.phone || user.phone
            this.model.address_code = record.address_code || user.address_code
            this.model.address_city = record.address_city || user.address_city
            this.model.address_area = record.address_area || user.address_area
            this.model.address = record.address || user.address
            this.model.staging_card_code = record.staging_card_code || user.staging_card_code
            this.model.staging_card_date = record.staging_card_date || user.staging_card_date
            this.model.staging_card_security = record.staging_card_security || user.staging_card_security
            getCityPromise.call(this,()=>{
                this.inputAddressCode()
                this.changeAddressCityOrArea()
            })
        })
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    computed: {
        arrCityList(){
            if (this.city) {
                return this.city.map(p=>p.city_name)
            }
            return ''
        },
        arrAreaList(){
            const city = this.model.address_city
            if (this.city && city) {
                const cityData = this.city.find(p=>p.city_name===city)
                return cityData ? cityData.area_list.map(p=>p.area_name) : ''
            }
            return []
        }
    },
    methods: {
        inputAddressCode(){
            const code = this.model.address_code
            if (code && code.length===3) {
                this.city.forEach(item=>{
                    item.area_list.forEach(_item=>{
                        if (_item.zip_code===code) {
                            this.model.address_city = item.city_name
                            this.model.address_area = _item.area_name
                        }
                    })
                })
            }
        },
        changeAddressCityOrArea(){
            if (this.model.address_city && this.model.address_area) {
                const city = this.city.find(p=>p.city_name===this.model.address_city)
                if (city) {
                    const area = city.area_list.find(p=>p.area_name===this.model.address_area)
                    if (area) {
                        this.model.address_code = area.zip_code
                    }
                }
            }
        },
        inputCardCode(e,index){
            let value = e.target.value
            if ( isNaN(Number(value)) ) {
                e.target.value = ''
                this.cardCode[index] = ''
            }else{
                this.cardCode[index] = value.split('').splice(0,4).join('')
            }
            if (value.length >= 4) {
                if (index >= 3) {
                    this.$refs[`CardDate`].focus()
                }else{
                    this.$refs[`CardCode[${index+1}]`].focus()
                }
            }
            this.model.card_code = this.cardCode.join('-')
        },
        focusCardCode(e,index){
            e.target.value = ''
            this.cardCode[index] = ''
        },
        inputCardDate(e){
            let value = e.target.value
            if (value.length >= 4) {
                this.$refs[`CardSecurity`].focus()
            }
            this.model.card_date = value
        },
        changeCardDate(e){
            let value = e.target.value
            if (value.length >= 2) {
                const arrString = value.split('')
                if (arrString.every(s=>isNaN(Number(s)))) {
                    value = ''
                }else{
                    arrString.splice(2,0,'/')
                    value = arrString.join('')
                }
            }
            e.target.value = value
            this.model.card_date = value
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
            }else{
                this.model.card_security = value
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
            this.$store.commit('setRecord',this.model)
            this.$store.commit('nextStep')
            this.$router.push('3')
            $('html,body').animate({scrollTop: 216}, 400);
            if (this.model) {
                return // 暫時不要送出
            }
            addRecordData(this.model).then(res=>{
                console.log(res.data)
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