<template>
    <div class="prt-nutrition border border-primary">
        <div class="py-4 px-4 px-sm-5">
            <h2 class="m-0">客製寵糧紀錄</h2>
        </div>
        <div class="border-top border-primary row no-gutters">
            <div class="col-6 py-3 pl-3">商品（共2件）</div>
            <div class="col-2 py-3">單價</div>
            <div class="col-2 py-3">數量</div>
            <div class="col-2 py-3">小計</div>
        </div>
        <div class="border-top border-primary row no-gutters">
            <div class="col-6 py-3 pl-3">
                
            </div>
            <div class="col-2 py-3">
                
            </div>
            <div class="col-2 py-3">
                
            </div>
            <div class="col-2 py-3">
                
            </div>
        </div>
    </div>
</template>

<script>
import onCreatedDetail from './created-detail'
import { PetModel } from '@/models'

export default {
    data(){
        return {
            model: new PetModel()
        }
    },
    created(){
        onCreatedDetail.call(this)
    },
};
</script>
