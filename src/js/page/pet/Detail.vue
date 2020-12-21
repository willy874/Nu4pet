<template>
    <div id="pet-detail" class="pet-detail">
        <div class="row pb-3">
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <router-link tag="div" class="d-flex flex-column justify-content-center align-items-center" to="base">
                        <div class="d-flex">
                            <icon-component pattern="CatType" size="50"></icon-component>
                            <icon-component pattern="DogType" size="50"></icon-component>
                        </div>
                        <a class="stretched-link pt-2 text-nowrap">毛孩資料</a>
                    </router-link>
                </div>
            </div>
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <router-link tag="div" class="d-flex flex-column justify-content-center align-items-center" to="nutrition">
                        <icon-component pattern="Record" size="50"></icon-component>
                        <a class="stretched-link pt-2 text-nowrap">營養評估</a>
                    </router-link>
                </div>
            </div>
            <div class="col-4">
                <div class="hover-block border border-primary p-1 p-sm-3">
                    <router-link tag="div" class="d-flex flex-column justify-content-center align-items-center" to="record">
                        <icon-component pattern="Evaluation" size="50"></icon-component>
                        <a class="stretched-link pt-2 text-nowrap">客製化寵糧紀錄</a>
                    </router-link>
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