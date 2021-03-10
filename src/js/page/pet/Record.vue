<template>
    <div class="prt-nutrition border border-primary">
        <div class="prod-list py-3">
            <div v-for="(item, index) in record" :key="item.id">
                <div class="bg-primary w-100 mb-3" :style="{height: index ? '1px' : '0'}"></div>
                <div class="prod-item row no-gutters">
                    <div class="col-12"><div class="border-spacing"></div></div>
                    <!-- 圖片 -->
                    <div class="col col-md-2 px-3" v-if="item.image&&item.image.length">
                        <img class="w-100" :src="item.image[0].url" :alt="item.subject">
                    </div>
                    <div class="col col-md-2 px-3" v-else>
                        <div class="p-100 bg-gray"></div>
                    </div>
                    <!-- 標題 -->
                    <div class="col-auto col-md px-3 rwd-h5">
                        <div class="mb-2" v-if="item.order_code">
                            <div>客製寵糧訂單編號：</div>
                            <div>{{ item.order_code }}</div>
                        </div>
                        <div class="mb-2" v-html="item.subject"></div>
                        <div>
                            <div>購買日期</div>
                            <div>{{ item.created_at }}</div>
                        </div>
                    </div>
                    <!-- 價目 -->
                    <div class="col-12 d-md-none"></div>
                    <div class="col col-md-2 p-3 align-self-center">
                        <div class="rwd-h4 text-primary">NT${{ item.sale_price }}</div>
                        <del class="d-block">原價：{{ item.original_price }}</del>
                    </div>
                    <!-- 數量 -->
                    <div class="col col-md-2 p-3 align-self-center rwd-h5">
                        X{{ item.count }}
                    </div>
                    <!-- 小計 -->
                    <div class="col-auto col-md-2 p-3 align-self-center d-flex justify-content-center">
                        <div class="rwd-h5 mb-0">
                            NT${{ item.sale_price * item.count }}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary text-white rounded-pill mx-3" type="button" @click="addShopCar(item)">再次訂購</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import onCreatedDetail from './created-detail'
import { PetModel,PetRecordModel } from '@/models'
import { getRecordDataByPetId,addShopCarData } from '@/api'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
            model: new PetModel(),
            record: []
        }
    },
    created(){
        onCreatedDetail.call(this,()=>{
            getRecordDataByPetId(this.model.id).then(res=>{
                this.record = res.data.map(p=>new PetRecordModel(p))
            })
        })
    },
    methods: {
        addShopCar(item){
            addShopCarData({
                prod_id: item.prod_id,
                pet_id: this.model.id,
                count: 1
            }).then(()=>{
                Swal.fire({
                    icon: 'success',
                    timer: 1500,
                    title: '已成功加入購物袋',
                    showConfirmButton: false,
                })
            })
        }
    }
};
</script>
