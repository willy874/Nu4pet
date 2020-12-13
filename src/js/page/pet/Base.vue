<template>
    <div class="prt-base">
        <div class="border border-primary">
            <div class="border-bottom border-primary px-3 px-sm-5">
                <div class="row py-4">
                    <div class="col-lg-4 d-flex flex-column align-items-center">
                        <h2 class="mb-4">基本資料</h2>
                        <div class="px-5 px-lg-0"><img class="rounded-circle img-thumbnail" :src="model.image_url" alt="" width="100%"></div>
                    </div>
                    <div class="base-data col-lg-8">
                        <div class="row">
                            <div class="col-6 d-flex flex-wrap flex-between h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>毛</span>
                                    <span>孩</span>
                                    <span>名</span>
                                    <span>稱</span>
                                </div>
                                <div class="col-6 col-md-7">
                                    <span v-if="!editMode">{{model.name}}</span>
                                    <span v-if="editMode">
                                        <input class="form-control" type="text" v-model="editModel.name">
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap flex-between h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>寵</span>
                                    <span>物</span>
                                    <span>類</span>
                                    <span>別</span>
                                </div>
                                <div class="col-6 col-md-7 text-dark">
                                    <div class="d-flex" v-if="!editMode">
                                        <icon-component class="svg-type text-primary" v-if="model.type==='dog'" pattern="DogType" size="70,50"></icon-component>
                                        <icon-component class="svg-type text-primary" v-else-if="model.type==='cat'" pattern="CatType" size="70,50"></icon-component>
                                    </div>
                                    <div class="d-flex" v-if="editMode">
                                        <icon-component :class="{'svg-type':1,'text-primary':editModel.type==='dog'}" pattern="DogType" size="70,50"></icon-component>
                                        <icon-component :class="{'svg-type':1,'text-primary':editModel.type==='cat'}" pattern="CatType" size="70,50"></icon-component>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>品</span>
                                    <span>種</span>
                                </div>
                                <div class="col-6 col-md-7">
                                    <span v-if="!editMode">{{model.variety}}</span>
                                    <span v-if="editMode">
                                        <input class="form-control" type="text" v-model="editModel.variety">
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>性</span>
                                    <span>別</span>
                                </div>
                                <div class="col-6 col-md-7">
                                    <div class="d-flex" v-if="!editMode">
                                        <icon-component class="svg-sex" pattern="Boy" size="80,50" v-if="model.sex==='M'"></icon-component>
                                        <icon-component class="svg-sex" pattern="Girl" size="80,50" v-else-if="model.sex==='G'"></icon-component>
                                    </div>
                                    <div class="d-flex" v-if="editMode">
                                        <icon-component class="svg-sex" pattern="Boy" size="80,50"></icon-component>
                                        <icon-component class="svg-sex" pattern="Girl" size="80,50"></icon-component>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>體</span>
                                    <span>重</span>
                                </div>
                                <div class="col-6 col-md-7 d-flex">
                                    <span v-if="!editMode">{{model.body_weight}}</span>
                                    <span v-if="editMode">
                                        <input class="form-control" type="text" v-model="editModel.body_weight">
                                    </span>
                                    <span>公斤(kg)</span>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>年</span>
                                    <span>齡</span>
                                </div>
                                <div class="col-6 col-md-7 d-flex">
                                    <span v-if="!editMode">{{model.age}}</span>
                                    <span v-if="editMode">
                                        <input class="form-control" type="text" v-model="editModel.age">
                                    </span>
                                    <span>歲</span>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-6 col-md-5 d-flex flex-between">
                                    <span>是</span>
                                    <span>否</span>
                                    <span>結</span>
                                    <span>紮</span>
                                </div>
                                <div class="col-6 col-md-7">
                                    <div v-if="!editMode">
                                        <button type="text" class="btn btn-primary rounded-pill text-white">
                                            <span v-if="model.ligation">是</span>
                                            <span v-else>否</span>
                                        </button>
                                    </div>
                                    <div v-if="editMode">
                                        <button type="button" :class="{btn:1,'rounded-pill':1,'text-white':1,
                                            'btn-primary':model.ligation,'btn-dark':!editModel.ligation}">是</button>
                                        <button type="button" :class="{btn:1,'rounded-pill':1,'text-white':1,
                                            'btn-primary':!model.ligation,'btn-dark':editModel.ligation}">否</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pet-data border-bottom border-primary row no-gutters" v-if="model.type">
                <div class="col border-right border-primary d-flex flex-column flex-center py-3">
                    <h4 class="py-4">毛孩活動量</h4>
                    <img class="img-fluid" :src="assets[model.type][model.active]" alt="">
                </div>
                <!-- v-if="model.type==='dog'" -->
                <div class="col border-right border-primary d-flex flex-column flex-center py-4">
                    <h4 class="py-4">毛孩體態評估</h4>
                    <img class="img-fluid" :src="assets[model.type].Large" alt="Large" v-if="model.body_type==='L'">
                    <img class="img-fluid" :src="assets[model.type].Medium" alt="Medium" v-else-if="model.body_type==='M'">
                    <img class="img-fluid" :src="assets[model.type].Small" alt="Small" v-else-if="model.body_type==='S'">
                </div>
                <div class="col d-flex flex-column flex-center py-4">
                    <h4 class="py-4">毛孩零食習慣</h4>
                    <img class="img-fluid" :src="assets[model.type].Snacks" alt="" v-if="model.snacks">
                    <img class="img-fluid" :src="assets[model.type].UnSnacks" alt="" v-else>
                </div>
            </div>
            <div class="pet-data border-bottom border-primary d-flex flex-column flex-center py-4" v-if="model.type">
                <h4 class="py-4">毛孩狀態評估</h4>
                <div class="row no-gutters">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2" v-for="item in model.status" :key="item">
                        <img class="img-fluid" :src="assets[model.type][item]" alt="">
                        <h4></h4>
                    </div>
                </div>
            </div>
            <div class="pet-data d-flex flex-column flex-center py-4">
                <h4 class="py-4">毛孩貼心備註</h4>
                <div class="pb-4">{{model.memo}}</div>
            </div>
        </div>
        <div class="py-4 row">
            <div class="col text-center">
                <router-link class="btn btn-primary text-white rounded-pill px-sm-5" to="/">回上一頁</router-link>
            </div>
            <div class="col text-center" v-if="!editMode">
                <button class="btn btn-primary text-white rounded-pill px-sm-5" @click="edit">修改資料</button>
            </div>
            <div class="col text-center" v-if="editMode">
                <button class="btn btn-dark text-white rounded-pill px-sm-5" @click="cancel">取消修改</button>
            </div>
            <div class="col text-center" v-if="editMode">
                <button class="btn btn-primary text-white rounded-pill px-sm-5" @click="submit">確認修改</button>
            </div>
        </div>
    </div>
</template>

<script>
import onCreatedDetail from './created-detail'
import { PetModel } from '@/models'
import statusData from './status'
import assets from '@assets'

console.log(assets)
export default {
    data(){
        return {
            model: new PetModel(),
            editModel: new PetModel(),
            editMode: false,
            statusData,
            assets
        }
    },
    created(){
        onCreatedDetail.call(this)
    },
    updated(){
        console.log('model:',this.model);
        console.log('editModel:',this.editModel);
        console.log('statusData:',this.statusData);
    },
    methods: {
        edit(){
            this.editMode = true
            this.editModel = new PetModel(this.model)
            window.scrollTo({top: 216})
        },
        cancel(){
            this.editMode = false
        },
        submit(){
            const errors = this.editModel.validate()
            const errorsMessage = Object.keys(errors).map(key=>errors[key][0])
            console.log(errorsMessage);
        }
    }
};
</script>
<style scoped>
    .base-data{
        padding-top: 62px;
    }
    .base-data > .row > [class*="col"]{
        min-height: 60px;
    }
    .btn[type="text"]{
        cursor: auto;
    }
    .btn[type="text"]:hover{
        background-color: #49c5b1;
    }
    .btn[type="text"]:focus{
        box-shadow: none;
    }
    .base-data .h4{
        white-space: nowrap;
    }
    input[type="text"].form-control{
        padding: 0.25rem 0.125rem;
    }
    @media (max-width: 768px){
        .base-data > .row > [class*="col"]{
            min-height: 40px;
        }
        .base-data .row{
            margin-left: -10px; 
            margin-right: -5px; 
        }
        .base-data .row [class*="col"]{
            padding-left: 10px; 
            padding-right: 10px; 
        }
        .base-data .svg-type {
            height: 40px;
        }
        .base-data .svg-sex {
            height: 40px;
        }
        .base-data .h4{
            font-size: 1rem;
        }
        .pet-data h4 {
            font-size: 1rem;
        }
    }
    @media (max-width: 576px){
        .base-data{
            padding-top: 1rem;
        }
        .base-data > .row > [class*="col"]{
            min-height: 30px;
        }
        .base-data .row{
            margin-left: -5px; 
            margin-right: -5px; 
        }
        .base-data .row [class*="col"]{
            padding-left: 5px; 
            padding-right: 5px; 
        }
        .base-data .svg-type {
            width: 35px;
            height: 25px;
        }
        .base-data .svg-sex {
            width: 40px;
            height: 25px;
        }
        .base-data .h4{
            font-size: 0.75rem;
        }
    }
    @media (max-width: 450px){
        .base-data .h4 > div{
            transform: scale(0.9);
        }
    }
    @media (max-width: 375px){
        .base-data .h4 > div{
            transform: scale(0.75);
        }
        .pet-data h4 {
            font-size: 0.75rem;
        }
    }
</style>
