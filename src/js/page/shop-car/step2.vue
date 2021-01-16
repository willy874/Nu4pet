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
                        <input :class="['form-control',{'is-invalid':model.errors['address']}]" :list="uuid.address" placeholder="請輸入您的地址" type="text" v-model="model.address">
                    </div>
                </div>
                <div v-if="recordAddress.length" class="row justify-content-end">
                    <div class="col-auto py-2">
                        <div class="btn btn-light text-dark rounded-pill" @click="changeLastAddressDate">填入最近使用收件地址</div>
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
                            <label class="custom-control-label" :for="uuid.double">二聯式電子發票</label>
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
                    <div class="col-12">
                        <div v-if="model.invoice_type==='vehicle'" class="p-3 mx-auto my-3 bg-light invoice-block" style="max-width: 768px">
                            <div class="row align-items-center">
                                <div class="col-12 py-2">
                                    使用手機條碼載具（手機條碼請至<a target="_blank" title="財政部電子發票整合服務平台(另開視窗)" href="https://www.einvoice.nat.gov.tw/">財政部電子發票整合服務平台</a>申請）
                                </div>
                                <div class="col-sm-4 py-2">請輸入您的手機條碼</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['invoice_code']}]" v-model="model.invoice_code" @change="checkMobileVehicle">
                                </div>
                                <div class="col-sm-4 py-2">手機條碼確認</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['invoice_code_check']}]" v-model="model.invoice_code_check" @change="checkMobileVehicle">
                                </div>
                                <small class="col-12 py-2">*** 含斜線及英數碼，共8碼，例如：/RZREDHQ手機條碼確認。（請再次確認手機條碼是否正確）</small>
                            </div>
                        </div>
                        <div v-if="model.invoice_type==='natural'" class="p-3 mx-auto my-3 bg-light invoice-block" style="max-width: 768px">
                            <div class="row align-items-center">
                                <div class="col-12 py-2">
                                    使用自然人憑證條碼載具（自然人憑證條碼請至<a target="_blank" title="財政部電子發票整合服務平台(另開視窗)" href="https://www.einvoice.nat.gov.tw/">財政部電子發票整合服務平台</a>申請）
                                </div>
                                <div class="col-sm-4 py-2">請輸入您的自然人憑證條碼</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['invoice_code']}]" v-model="model.invoice_code" @change="checkNaturalVehicle">
                                </div>
                                <div class="col-sm-4 py-2">自然人憑證條碼確認</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['invoice_code']}]" v-model="model.invoice_code_check" @change="checkNaturalVehicle">
                                </div>
                                <small class="col-12 py-2">*** 含英數碼，共16碼，例如：GP00000012345678自然人憑證條碼確認（請再次確認自然人憑證條碼是否正確）</small>
                            </div>
                        </div>
                        <div v-if="model.invoice_type==='triple'" class="p-3 mx-auto my-3 bg-light invoice-block" style="max-width: 768px">
                            <div class="row align-items-center">
                                <div class="col-12 py-2">
                                    為公司行號報稅使用，一般消費者請選擇開立個人發票。
                                </div>
                                <div class="col-sm-4 py-2">請輸入公司名稱</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['corporation_name']}]" v-model="model.corporation_name">
                                </div>
                                <div class="col-sm-4 py-2">請輸入統一編號</div>
                                <div class="col-sm-8 py-2">
                                    <input type="text" :class="['form-control',{'is-invalid':model.errors['corporation_code']}]" v-model="model.corporation_code">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-bottom" v-if="model.invoice_type!=='triple'">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-auto my-3">
                            <div class="custom-control custom-radio"> 
                                <input type="radio" class="custom-control-input" :id="uuid.donateN" value="N" v-model="model.invoice_donate">
                                <label class="custom-control-label" :for="uuid.donateN">不捐贈發票</label>
                            </div>
                        </div>
                        <div class="col-auto my-3">
                            <div class="custom-control custom-radio"> 
                                <input type="radio" class="custom-control-input" :id="uuid.donateY" value="Y" v-model="model.invoice_donate">
                                <label class="custom-control-label" :for="uuid.donateY">捐贈發票</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div v-if="model.invoice_donate==='Y'" class="invoice-block bg-light p-3 mx-auto my-3" style="max-width: 768px">
                                <div class="row align-items-center">
                                    <div class="col-sm-4 py-2">請輸入自訂捐款單位之捐贈碼</div>
                                    <div class="col-sm-8 py-2">
                                        <input type="text" :class="['form-control',{'is-invalid':model.errors['invoice_donate_code']}]" v-model="model.invoice_donate_code">
                                    </div>
                                    <small class="col-12 text-center"><a target="_blank" title="財政部電子發票整合服務平台(另開視窗)" href="https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/">查詢更多捐贈機關或團體的捐贈碼</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-4">
                    <div class="text-danger text-center mb-3">陪心寵糧依財政部規定，發票已託管，無需開立紙本發票。</div>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="px-3">
                            <icon-component class="text-primary" pattern="ChechRound" size="40"></icon-component>
                        </div>
                        <div style="max-width: 404px;">申請人需理解線上電子交易的退貨流程需人工辦理折讓單退貨，並同意授權陪心寵糧代為處理折讓單事宜，即無需提供折讓單。</div>
                    </div>
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
                        <h4 class="text-primary">按下"下一步"之前請注意 !</h4>
                        <div class="py-lg-2"></div>
                        <div>請確認所購買之商品品項，若按下一步產生訂單編號後，即不能修改訂單。若您在產生訂單編號後欲修改商品品項則需重新下單。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <a class="btn btn-primary text-white rounded-pill mx-3" @click="prevStep">上一步</a>
            <a class="btn btn-primary text-white rounded-pill mx-3" @click="nextStep">下一步</a>
        </div>
    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
import { addRecordData,getRecordAddress,checkMobileVehicle,checkNaturalVehicle } from '@/api'
import { RecordModel,UserModel } from '@/models'
import getUserPromise from '../get-user'
import getCityPromise from '../get-city'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
            city: undefined,
            recordAddress: new Array,
            uuid: {
                triple: uuidv4(),
                double: uuidv4(),
                vehicle: uuidv4(),
                natural: uuidv4(),
                donateY: uuidv4(),
                donateN: uuidv4(),
                address: uuidv4()
            },
            validError: {}
        }
    },
    created(){
        const record = this.$store.state.record
        if (record && (record.status==='step1' || record.status==='step2')) {
            getUserPromise(user=>{
                this.model = new RecordModel(record)
                this.user = new UserModel(user)
                this.model.set({
                    user_id: record.user_id || user.id,
                    name: record.name || user.name,
                    sex: record.sex || user.sex,
                    email: record.email || user.email,
                    phone: record.phone || user.phone,
                    address_code: record.address_code || user.address_code,
                    address_city: record.address_city || user.address_city,
                    address_area: record.address_area || user.address_area,
                    address: record.address || user.address,
                })
                getRecordAddress(user.account).then(res=>{
                    this.recordAddress = res.data
                })
                getCityPromise.call(this,()=>{
                    this.inputAddressCode()
                    this.changeAddressCityOrArea()
                })
            })
        }else{
            this.$router.replace('1')
        }
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    computed: {
        ...mapState(['step','record']),
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
        // TODO: 填入最近使用收件地址 click 事件
        changeLastAddressDate(){

        },
        checkInvoiceError(){
            this.validError.invoice_code = this.model.errors.invoice_code
            this.validError.invoice_code_check = this.model.errors.invoice_code_check
        },
        checkMobileVehicle(){
            if (this.model.invoice_code && this.model.invoice_code_check){
                if (this.model.invoice_code===this.model.invoice_code_check) {
                    checkMobileVehicle(this.model.invoice_code).then(()=>{
                        this.model.errors.invoice_code = null
                        this.model.errors.invoice_code_check = null
                        this.validError.invoice_code = null
                        this.validError.invoice_code_check = null
                    }).catch(()=>{
                        this.model.errors = {
                            invoice_code: ['手機條碼載具不正確'],invoice_code_check: ['']
                        }
                        this.checkInvoiceError()
                    })
                }else{
                    this.model.errors = {
                        invoice_code: ['手機條碼載具與確認碼不相符'],invoice_code_check: ['']
                    }
                    this.checkInvoiceError()
                }
            }
        },
        checkNaturalVehicle(){
            if (this.model.invoice_code && this.model.invoice_code_check) {
                if (this.model.invoice_code===this.model.invoice_code_check) {
                    checkNaturalVehicle(this.model.invoice_code).then(()=>{
                        this.model.errors.invoice_code = null
                        this.model.errors.invoice_code_check = null
                        this.validError.invoice_code = null
                        this.validError.invoice_code_check = null
                    }).catch(()=>{
                        this.model.errors = {
                            invoice_code: ['自然人憑證條碼不正確'],invoice_code_check: ['']
                        }
                        this.checkInvoiceError()
                    })
                }else{
                    this.model.errors = {
                        invoice_code: ['自然人憑證條碼與確認碼不相符'],invoice_code_check: ['']
                    }
                    this.checkInvoiceError()
                }
            }
        },
        prevStep(){
            this.model.status = 'step1'
            this.$store.commit('setRecord',this.model)
            this.$store.commit('setStep',1)
            this.$router.push('1')
        },
        nextStep(){
            const errors = Object.assign(this.validError,this.model.validate() || {})
            console.log(errors)
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
            addRecordData(this.model).then(res=>{
                const toRouter = res.data.toRouter || 3
                this.$store.commit('setRecord',this.model)
                localStorage.removeItem('shopCar')
                this.$store.commit('setShopCar',undefined)
                this.$store.commit('setStep',Number(toRouter))
                this.$router.push(String(toRouter))
            })
            $('html,body').animate({scrollTop: 216}, 400);
        }
    }
}
</script>
<style scoped>
    .invoice-block{
        border-radius: 1rem;
    }
    .invoice-block input{
        background-color: #ffffff;
    }
    #precautions{
        fill: #ffffff;
        font: bold 72px sans-serif;
    }
</style>