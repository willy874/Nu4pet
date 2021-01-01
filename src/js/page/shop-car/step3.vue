<template>
    <div class="shop-car-3 py-3">
        <div class="border-bottom py-3">
            親愛的 {{ user.name }} 您好，感謝您的訂購。
        </div>
        <div class="border-bottom py-3">
            <div>繳費詳情</div>
            <div class="pl-5">
                <div>您選擇的付款方式為信用卡，繳費資訊如下：</div>
                <div>銀行代碼：013</div>
                <div>繳費信用卡：0000-0000-0000-0000</div>
            </div>
        </div>
        <div class="border-bottom py-3">
            <div>發票詳情</div>
            <div class="pl-5">
                <div>發票類型  {{ model.invoice_type }}</div>
                <div>捐贈單位</div>
            </div>
        </div>
        <div class="border-bottom py-3">
            <div>收件人詳情</div>
            <div class="pl-5">
                <div>{{ model.name }}</div>
                <div>{{ model.phone }}</div>
                <div>{{ model.address_code }} {{ model.address_city }}{{ model.address_area }}{{ model.address }}</div>
            </div>
        </div>
        <div class="py-3">
            <div class="border my-3">
                <h4 class="d-flex justify-content-center mb-0 p-3">
                    <div class="mr-2">總計</div>
                    <div class="mr-1">NT$</div>
                    <div>{{ model.total_price }}</div>
                </h4>
            </div>
        </div>
        <div class="py-3">
            <div class="bg-light text-center p-3">
                <div class="bg-primary px-2 py-1 text-white d-inline-block">注意事項</div>
                <h5 class="text-primary my-3">提醒您陪心商城之商品將會隨『正式客製寵糧』一同出貨</h5>
                <div>＃本訂單已進入包裝作業，恕無法取消或修改訂單內容＃</div>
                <div>＃您可以隨時到本網站『訂單查詢』查看目前訂單進度＃</div>
                <div>＃如訂購商品無法順利出貨或缺貨，我們將主動通知您並取消該訂單品項＃</div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { RecordModel,UserModel } from '@/models'
import getUserPromise from '../get-user'

export default {
    data(){
        return {
            model: new RecordModel,
            user: new UserModel,
        }
    },
    created(){
        const record = this.$store.state.record
        if (record) {
            getUserPromise(user=>{
                this.model = new RecordModel(record)
                this.user = new UserModel(user)
            })
        }else{
            this.$router.replace('1')
        }
    },
    nextStep(){
        this.$store.commit('setRecord',this.model)
        this.$store.commit('nextStep')
        this.$router.push('4')
        $('html,body').animate({scrollTop: 216}, 400);
    }
    
}
</script>