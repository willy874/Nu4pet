<template>
    <div class="prt-base">
        <div class="border border-primary">
            <div class="border-bottom border-primary px-3 px-sm-5">
                <div class="row py-4">
                    <div class="col-lg-4 d-flex flex-column align-items-center">
                        <h2 class="mb-4">基本資料</h2>
                        <div class="px-5 px-lg-0 w-100">
                            <img v-if="!editMode" class="rounded-circle img-thumbnail" :src="model.image_url" alt="" width="100%">
                            <photo-frame v-if="editMode" class="rounded-circle img-thumbnail overflow-hidden w-100" :delete="false" :model="modelEdit" handle="image_url" file-cache="image_file" :readonly="!editMode"></photo-frame>
                        </div>
                    </div>
                    <div class="base-data col-lg-8">
                        <div class="row">
                            <div class="col-sm-6 d-flex flex-wrap flex-between h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>毛</span>
                                    <span>孩</span>
                                    <span>名</span>
                                    <span>稱</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7">
                                    <span v-if="!editMode">{{model.name}}</span>
                                    <span v-if="editMode">
                                        <input :class="['form-control',{'is-invalid': modelEdit.errors&&modelEdit.errors['name']}]" type="text" placeholder="請輸入名稱" v-model="modelEdit.name">
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap flex-between h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>寵</span>
                                    <span>物</span>
                                    <span>類</span>
                                    <span>別</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7 text-dark">
                                    <div class="d-flex" v-if="!editMode">
                                        <icon-component class="svg-type text-primary" v-if="model.type==='dog'" pattern="DogType" size="70,50"></icon-component>
                                        <icon-component class="svg-type text-primary" v-else-if="model.type==='cat'" pattern="CatType" size="70,50"></icon-component>
                                    </div>
                                    <div class="d-flex text-dark" v-if="editMode">
                                        <button type="button" class="btn-icon" @click="setModel({type: 'dog'})">
                                            <icon-component :class="['svg-type',(modelEdit.type==='dog')?'text-primary':'text-dark']" pattern="DogType" size="70,50"></icon-component>
                                        </button>
                                        <button type="button" class="btn-icon" @click="setModel({type: 'cat'})">
                                            <icon-component :class="['svg-type',(modelEdit.type==='cat')?'text-primary':'text-dark']" pattern="CatType" size="70,50"></icon-component>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>品</span>
                                    <span>種</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7">
                                    <span v-if="!editMode">{{model.variety}}</span>
                                    <span v-if="editMode">
                                        <input :class="['form-control',{'is-invalid':modelEdit&&modelEdit.errors&&modelEdit.errors['variety']}]" placeholder="請輸入品種" type="text" v-model="modelEdit.variety">
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>性</span>
                                    <span>別</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7">
                                    <div class="d-flex" v-if="!editMode">
                                        <icon-component class="svg-sex flex-shrink-0" pattern="Boy" size="80,50" v-if="model.sex==='M'"></icon-component>
                                        <icon-component class="svg-sex flex-shrink-0" pattern="Girl" size="80,50" v-else-if="model.sex==='G'"></icon-component>
                                    </div>
                                    <div class="d-flex" v-if="editMode">
                                        <button type="button" class="btn-icon" @click="setModel({sex: 'M'})">
                                            <icon-component :class="['svg-sex','flex-shrink-0',{'filter-grayscale':modelEdit.sex!=='M'}]" pattern="Boy" size="80,50"></icon-component>
                                        </button>
                                        <button type="button" class="btn-icon" @click="setModel({sex: 'G'})">
                                            <icon-component :class="['svg-sex','flex-shrink-0',{'filter-grayscale':modelEdit.sex!=='G'}]" pattern="Girl" size="80,50"></icon-component>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>體</span>
                                    <span>重</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7 d-flex align-items-end">
                                    <span v-if="!editMode">{{model.body_weight}}</span>
                                    <span v-if="editMode">
                                        <input :class="['form-control',{'is-invalid':modelEdit.errors['body_weight']}]" placeholder="請輸入" type="text" v-model="modelEdit.body_weight">
                                    </span>
                                    <span class="sub-text">公斤(kg)</span>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>年</span>
                                    <span>齡</span>
                                </div>
                                <div class="col-7 col-sm-6 col-md-7 d-flex align-items-end">
                                    <span v-if="!editMode">{{model.age}}</span>
                                    <span v-if="editMode">
                                        <input :class="['form-control',{'is-invalid':modelEdit.errors['age']}]" placeholder="請輸入" type="text" v-model="modelEdit.age">
                                    </span>
                                    <span class="sub-text">歲</span>
                                </div>
                            </div>
                            <div class="col-sm-6 d-flex flex-wrap align-items-center h4">
                                <div class="col-5 col-sm-6 col-md-5 d-flex flex-between">
                                    <span>是</span>
                                    <span>否</span>
                                    <span>結</span>
                                    <span>紮</span>
                                </div>
                                <div class="col-5 col-sm-6 col-md-7">
                                    <div v-if="!editMode">
                                        <div type="text" class="btn btn-primary rounded-pill text-white">
                                            <span v-if="model.ligation">是</span>
                                            <span v-else>否</span>
                                        </div>
                                    </div>
                                    <div v-if="editMode">
                                        <button type="button" @click="setModel({ligation: true})" :class="['btn','rounded-pill','text-white',
                                            {'btn-primary':modelEdit.ligation,'btn-dark':!modelEdit.ligation}]">是</button>
                                        <button type="button" @click="setModel({ligation: false})" :class="['btn','rounded-pill','text-white',
                                            {'btn-primary':!modelEdit.ligation,'btn-dark':modelEdit.ligation}]">否</button>
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
                    <div v-if="!editMode">
                        <img class="img-fluid" :src="assets[model.type][model.active]" alt="">
                    </div>
                    <div v-if="editMode">
                        <div v-for="item in arrPetActiveOptions" :key="item.name">
                            <img class="img-fluid" :src="assets[modelEdit.type][item.name]" :alt="item.name" v-if="modelEdit.active===item.name">
                        </div>
                        <div class="d-flex justify-content-center px-3">
                            <select class="custom-select" v-model="modelEdit.active">
                                 <option v-for="item in arrPetActiveOptions" :selected="modelEdit.active===item.name" :key="item.name" :value="item.name" >{{item.text}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- v-if="model.type==='dog'" -->
                <div class="col border-right border-primary d-flex flex-column flex-center py-4">
                    <h4 class="py-4">毛孩體態評估</h4>
                    <div v-if="!editMode">
                        <img class="img-fluid" :src="assets[model.type].Large" alt="Large" v-if="model.body_type==='L'">
                        <img class="img-fluid" :src="assets[model.type].Medium" alt="Medium" v-else-if="model.body_type==='M'">
                        <img class="img-fluid" :src="assets[model.type].Small" alt="Small" v-else-if="model.body_type==='S'">
                    </div>
                    <div v-if="editMode">
                        <img class="img-fluid" :src="assets[modelEdit.type].Large" alt="Large" v-if="modelEdit.body_type==='L'">
                        <img class="img-fluid" :src="assets[modelEdit.type].Medium" alt="Medium" v-else-if="modelEdit.body_type==='M'">
                        <img class="img-fluid" :src="assets[modelEdit.type].Small" alt="Small" v-else-if="modelEdit.body_type==='S'">
                        <div class="d-flex justify-content-center px-3">
                            <select class="custom-select" v-model="modelEdit.body_type">
                                <option :selected="modelEdit.body_type" value="L">太胖了</option>
                                <option :selected="modelEdit.body_type" value="M">正常</option>
                                <option :selected="modelEdit.body_type" value="S">太瘦了</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col d-flex flex-column flex-center py-4">
                    <h4 class="py-4">毛孩零食習慣</h4>
                    <div v-if="!editMode">
                        <img class="img-fluid" :src="assets[model.type].Snacks" alt="" v-if="model.snacks">
                        <img class="img-fluid" :src="assets[model.type].UnSnacks" alt="" v-else>
                    </div>
                    <div v-if="editMode">
                        <img class="img-fluid" :src="assets[modelEdit.type].Snacks" alt="" v-if="modelEdit.snacks">
                        <img class="img-fluid" :src="assets[modelEdit.type].UnSnacks" alt="" v-else>
                        <div class="d-flex justify-content-center px-3">
                            <select class="custom-select" v-model="modelEdit.snacks">
                                <option :selected="modelEdit.snacks" :value="true">有餵零食</option>
                                <option :selected="modelEdit.snacks" :value="false">沒餵零食</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pet-data border-bottom border-primary d-flex flex-column flex-center py-4" v-if="model.type">
                <h4 class="py-4">毛孩狀態評估</h4>
                <div v-if="!editMode" class="row no-gutters">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2" v-for="item in arrStatusSelectGroup" :key="item.name">
                        <button type="button" class="btn-icon" @click="openInfo(item)">
                            <img class="w-100" :src="item.image_url" :alt="item.text">
                        </button>
                        <h4 class="text-center">{{item.text}}</h4>
                    </div>
                </div>
                <div v-if="editMode" class="row no-gutters">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2" v-for="item in arrStatusFilterGroup" :key="item.name">
                        <div class="d-flex justify-content-center ">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" :id="'status'+item.name" :value="item.name" v-model="modelEdit.status">
                                <label class="custom-control-label" :for="'status'+item.name">
                                    <img :class="['img-fluid',{'filter-grayscale':!modelEdit.status.includes(item.name)}]" 
                                        :src="item.image_url" :alt="item.text">
                                    <h4 :class="['text-center',{'text-primary':modelEdit.status.includes(item.name)}]">{{item.text}}</h4>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pet-data d-flex flex-column flex-center py-4">
                <h4 class="py-4">毛孩貼心備註</h4>
                <div v-if="!editMode" class="pb-4">{{model.memo}}</div>
                <div v-if="editMode" class="w-100 px-3">
                    <textarea class="form-control" placeholder="請輸入貼心備註" rows="6" v-model="modelEdit.memo"></textarea>
                </div>
            </div>
        </div>
        <div class="py-4 row">
            <div class="col-sm my-1 text-center">
                <router-link class="btn btn-primary text-white rounded-pill px-sm-5" to="/">回上一頁</router-link>
            </div>
            <div class="col-sm my-1 text-center" v-if="!editMode">
                <button class="btn btn-primary text-white rounded-pill px-sm-5" @click="edit">修改資料</button>
            </div>
            <div class="col-sm my-1 text-center" v-if="editMode">
                <button class="btn btn-dark text-white rounded-pill px-sm-5" @click="cancel">取消修改</button>
            </div>
            <div class="col-sm my-1 text-center" v-if="editMode">
                <button class="btn btn-primary text-white rounded-pill px-sm-5" @click="submit">確認修改</button>
            </div>
        </div>
    </div>
</template>

<script>
import assets from '@assets'
import { PetModel } from '@/models'
import { getPetDataById,updatePetDataById,getPetStatusAllData } from '@/api'
import $ from 'jquery'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import petData from './pet-data'
import onCreatedDetail from './created-detail'
import PetInfoHeaderDialog from './dialog/pet-info-header.vue'
import PetInfoBodyDialog from './dialog/pet-info-body.vue'

export default {
    data(){
        return {
            model: new PetModel(),
            modelEdit: new PetModel(),
            editMode: false,
            petStatus: [],
            petData,
            assets
        }
    },
    created(){
        onCreatedDetail.call(this,(model)=>{
            getPetStatusAllData(model.type).then(res=>{
                this.petStatus = res.data
                console.log('model',this.model);
                console.log('petStatus',this.petStatus);
                console.log('petData-dog',this.petData.dog);
                console.log('petData-cat',this.petData.cat);
                console.log('assets-dog',this.assets.dog);
                console.log('assets-cat',this.assets.cat);
            })
        })
        this.$watch('modelEdit',()=>{
            if (this.modelEdit.mode === 'edit') {
                this.modelEdit.edited = true
            }
            this.modelEdit.mode = 'edit'
        },{
            deep: true
        })
    },
    computed: {
        arrStatusSelectGroup(){
            return this.petStatus.filter(p=>p.type === this.model.type && this.model.status.includes(p.name))
        },
        arrStatusFilterGroup(){
            return this.petStatus.filter(p=>p.type === this.modelEdit.type)
        },
        arrPetActiveOptions(){
            return this.petData[this.modelEdit.type].active
        }
    },
    methods: {
        edit(){
            this.editMode = true
            this.modelEdit = new PetModel(this.model)
            // window.scrollTo({top: 216})
            $('html,body').animate({scrollTop: 216}, 400);
        },
        cancel(){
            this.editMode = false
            this.modelEdit.mode = 'static'
        },
        setModel(data){
            Object.keys(data).forEach(key=>{
                this.modelEdit[key] = data[key]
            })
        },
        submit(){
            this.modelEdit.mode = 'static'
            const errors = this.modelEdit.validate()
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
            const SwalLoding = Swal.fire({
                icon: 'info',
                title: '上傳中',
                showConfirmButton: false,
            })
            updatePetDataById(
                this.modelEdit.id,
                this.modelEdit.toDatabase({
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
                })
            ).then(()=>{
                getPetDataById(this.modelEdit.id).then(res=>{
                    SwalLoding.close()
                    Swal.fire({
                        icon: 'success',
                        timer: 1500,
                        title: '儲存成功',
                        showConfirmButton: false,
                    }).then(()=>{
                        this.model = new PetModel(res.data)
                        this.editMode = false
                        this.modelEdit.mode = 'static'
                    })
                })
            }).catch(err =>{
                SwalLoding.close()
                this.editMode = false
                this.modelEdit.mode = 'static'
                Swal.fire({
                    icon: 'error',
                    title: '系統錯誤'
                })
                console.log({err});
            })
        },
        openInfo(model){
            this.$dialog.popup({
                header: PetInfoHeaderDialog,
                body: PetInfoBodyDialog,
                size: '600px',
                attrs: {
                    model
                }
            })
        }
    }
};
</script>
<style scoped>
    
</style>
