<template>
    <div class="shop-car-4 py-3">
        <div class="py-1">親愛的 {{ user.name }} 您好，訂單含有客製化寵糧，綁定完成即可完成訂單唷！</div>
        <div class="text-danger py-1" v-if="customizedOrderCount">***提醒：您的訂單含有客製化寵糧，尚有 {{ customizedOrderCount }} 筆客製化寵糧未綁定毛孩！！</div>
        <div class="border">
            <div class="text-center p-3 border-bottom">訂單編號 : {{ model.order_code }}</div>
            <div :class="['container-fluid',{'border-top': index!==0}]" v-for="(item,index) in model.ShopCarList" :key="item.shop_car_id">
                <div class="row align-items-center py-2">
                    <div class="h5 mb-0 col-auto d-none d-xs-block">{{ index + 1 }}</div>
                    <div class="col col-lg-2 py-3">
                        <img v-if="item.image&&item.image.length" class="w-100" :src="item.image[0].url" :alt="item.subject">
                        <div v-else class="bg-light p-100"></div>
                    </div>
                    <div class="col-12 col-xs py-3">
                        <div>客製寵糧訂單編號：</div>
                        <div>{{ item.order_code }}</div>
                        <div v-html="item.subject"></div>
                    </div>
                    <div class="col-12 col-lg d-flex align-items-center text-danger py-3"  v-if="!item.pet_id && item.order_code">
                        <icon-component pattern="Warning" size="20"></icon-component>
                        <div class="ml-3">此客製化寵糧尚未綁定毛孩！</div>
                    </div>
                    <div class="col-12 col-lg d-flex align-items-center py-3" v-if="item.pet_id && item.order_code">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <div class="rounded-circle p-1 bg-primary">
                                    <div class="bg-white rounded-circle p-1">
                                        <img class="w-100 rounded-circle" :src="bindPet[index].image_url" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="h6 mb-0 py-1">{{ bindPet[index].name }}</div>
                                <div class="h6 mb-0 py-1">{{ bindPet[index].body_weight }}kg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!item.pet_id && item.order_code" class="d-flex flex-column flex-center">
                    <div class="py-3">
                        <h6 class="text-primary font-weight-bold">綁定毛孩資料</h6>
                        <div>此尺寸方案適合<span class="text-primary">{{ item.pet_size }}kg以下</span>毛孩</div>
                        <div>若有無法綁定的狀況，歡迎透過<a href="javascript:;">Facebook</a>或<a href="javascript:;">Line</a>與客服聯繫</div>
                        <div>或撥打：<a href="tel:0800-029-920">0800-029-920</a>由專人為您服務</div>
                    </div>
                    <div class="position-relative mx-auto" style="height:200px;width:100%;max-width: 992px;">
                        <div class="position-fill overflow-auto">
                            <div class="d-flex justify-content-lg-center">
                                <div class="mx-2 flex-shrink-0" v-for="pet in user.pet" :key="pet.id" style="width: 120px;">
                                    <button class="btn btn-icon text-center" type="button" @click="selectPet(pet.id,index)" :disabled="pet.body_weight > item.pet_size || item.pet_size === 0">
                                        <div :class="['rounded-circle','p-1',{'bg-primary': Number(pet.id)===Number(bindPet[index]),'bg-gray-light': Number(pet.id)!==Number(bindPet[index])}]">
                                            <div class="bg-white rounded-circle p-1">
                                                <img class="w-100 rounded-circle" :src="pet.image_url" alt="">
                                            </div>
                                        </div>
                                        <div>{{ pet.name }}</div>
                                        <div>{{ pet.body_weight }}kg</div>
                                    </button>
                                </div>
                                <div class="mx-2 flex-shrink-0">
                                    <button class="btn btn-icon p-3" type="button" style="width: 120px;" @click="addPet">
                                        <icon-component class="text-gray-light" pattern="Plus" size="100%"></icon-component>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="py-3 d-flex flex-column flex-center">
                        <button type="button" class="btn btn-primary text-white rounded-pill" @click="inputBindPet(index)">確認綁定按鈕</button>
                        <div class="py-2">確認後就不能修改了喔，如果需要修改請聯絡客服人員!</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center py-4">
            <a class="btn btn-primary text-white rounded-pill mx-3" @click="nextStep">下一步</a>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import Swal from 'sweetalert2'
import { updateRecordShopCarListData } from '@/api'
import { RecordModel,UserModel,PetModel } from '@/models'
import getUserPromise from '../get-user'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
            bindPet: []
        }
    },
    created(){
        const record = this.$store.state.record
        if (record) {
            getUserPromise(user=>{
                this.user = new UserModel(user)
                this.model = new RecordModel(record)
                this.bindPet = new Array(this.model.ShopCarList.length).fill(0)
            })
        }else{
            this.$router.replace('1')
        }
    },
    updated(){
        this.$store.commit('setRecord',this.model)
    },
    computed: {
        customizedOrderCount(){
            return this.model.ShopCarList.filter(p=>p.order_code && !p.pet_id).length
        }
    },
    methods: {
        selectPet(id,index){
            this.bindPet[index] = Number(id)
            this.$forceUpdate()
        },
        addPet(){},
        inputBindPet(index){
            if (this.bindPet[index]) {
                Swal.fire({
                    title: '您確定綁定這隻毛孩嗎?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#49c5b1',
                    cancelButtonColor: '#dcdcdc',
                    confirmButtonText: '綁定',
                    cancelButtonText: '取消'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const bindPetIndex = this.bindPet[index]
                        this.bindPet[index] = this.user.pet.find(p=>Number(p.id)===Number(this.bindPet[index]))
                        if (!this.bindPet[index]) {
                            Swal.fire({
                                icon: 'error',
                                title: '找不到此毛孩！'
                            })
                            this.bindPet[index] = 0
                            return
                        }
                        this.model.ShopCarList[index].pet_id = bindPetIndex
                        updateRecordShopCarListData(this.model.ShopCarList[index]).then(() => {
                            this.model.ShopCarList[index].pet = this.bindPet[index]
                            console.log(this.bindPet[index])
                            console.log(this.model.ShopCarList[index].pet)
                            this.$forceUpdate()
                        }).catch(err=>{
                            this.model.ShopCarList[index].pet_id = 0
                            console.error(err)
                        })
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '請選擇要綁定的毛孩！'
                })
            }
            
        },
        nextStep(){
            if (!this.model.ShopCarList.every((shopCar,index)=>{
                    if (this.bindPet[index] instanceof PetModel) {
                        return true
                    }else if (shopCar.pet_id === 0 && shopCar.order_code === ''){
                        return true
                    }
                    return false
                })
            ) {
                return Swal.fire({
                    icon: 'error',
                    title: '客製化寵糧尚未綁定毛孩！'
                })
            }
             const toRouter = 5
            this.$store.commit('setRecord',this.model)
            this.$store.commit('setStep',Number(toRouter))
            this.$router.push(String(toRouter))
            $('html,body').animate({scrollTop: 216}, 400);
        }
    }
}
</script>