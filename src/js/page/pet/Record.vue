<template>
    <div class="prt-record border border-primary">
        <div>
            
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
