<template>
    <div class="pet-detail">
        <div class="row pb-3">
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <div class="d-flex flex-column justify-content-center align-items-center text-dark">
                        <div class="d-flex">
                            <icon-component pattern="CatType" size="50"></icon-component>
                            <icon-component pattern="DogType" size="50"></icon-component>
                        </div>
                        <router-link class="stretched-link text-dark pt-2 text-nowrap" to="base">毛孩資料</router-link>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <div class="d-flex flex-column justify-content-center align-items-center text-dark">
                        <icon-component pattern="Record" size="50"></icon-component>
                        <router-link class="stretched-link text-dark pt-2 text-nowrap" to="nutrition">營養評估</router-link>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <div class="d-flex flex-column justify-content-center align-items-center text-dark">
                        <icon-component pattern="Evaluation" size="50"></icon-component>
                        <router-link class="stretched-link text-dark pt-2 text-nowrap" to="record">客製化寵糧紀錄</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>


export default {
    
}
</script>
<style scoped>
    .hover-block:hover .text-dark{
        color: #49c5b1 !important;
    }
    @media (max-width:576px) {
        .row{
            margin-left: -5px;
            margin-right: -5px;
        }
        .row > [class*=col] {
            padding-left: 5px;
            padding-right: 5px;
        }
        .hover-block > div{
            transform: scale(0.75);
        }
    }
</style>