<template>
    <div class="pet-list">
        <div class="row">
            <div class="col-lg-6" v-for="item in model" :key="item.id">
                <div class="border border-primary rounded px-3">
                    <div class="d-flex pb-3 flex-wrap">
                        <div class="photo">
                            <img class="rounded-circle position-absolute" :src="item.image_url" :alt="item.name">
                        </div>
                        <div class="flex-grow-1 px-3 pt-3">
                            <h3>{{item.name}}</h3>
                            <div>品種：{{item.variety}}</div>
                        </div>
                        <div class="pt-4 px-3">
                            <router-link tag="button" type="button" class="btn btn-primary text-white rounded-pill py-0" :to="`/detail/${item.id}/base`">更多資料</router-link>
                        </div>
                    </div>
                    <div class="py-3">
                        <div class="row no-gutters border border-primary rounded">
                            <div class="col-3 border-right border-primary d-flex flex-center p-2 p-sm-3">
                                <icon-component class="text-dark" pattern="DogType" size="100%" v-if="item.type==='dog'"></icon-component>
                                <icon-component class="text-dark" pattern="CatType" size="100%" v-else-if="item.type==='cat'"></icon-component>
                            </div>
                            <div class="col-3 border-right border-primary d-flex flex-center p-2 p-sm-3">
                                <icon-component pattern="Boy" size="100%" v-if="item.sex==='M'"></icon-component>
                                <icon-component pattern="Girl" size="100%" v-else-if="item.sex==='G'"></icon-component>
                            </div>
                            <div class="text-age col-3 border-right border-primary d-flex flex-center py-3">
                                <div class="text-nowrap">
                                    <span class="h1">{{item.age}}</span>
                                    <sub>歲</sub>
                                </div>
                            </div>
                            <div class="text-body-weight col-3 d-flex flex-center py-3">
                                <div class="text-nowrap">
                                    <span class="h1">{{item.body_weight}}</span>
                                    <sub>kg</sub>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPetDataById } from '@/api'
import { ListModel,PetModel } from '@/models'
import axios from 'axios'

export default {
    data(){
        return {
            model: new ListModel({
                model: PetModel,
                data: new Array
            })
        }
    },
    created(){
        const user = this.$store.state.user
        if(Array.isArray(user.pet)){
            this.model = this.$store.state.user.pet
        }else if (typeof user.pet === 'string') {
            const arrUserPet = this.$store.state.user.pet.split(',')
            Promise.all(arrUserPet.map(id=>getPetDataById(id) )).then(res =>{
                res.forEach(item=>{
                    this.model.push( new PetModel(item.data) )
                    this.$store.commit('setUser',{ pet: this.model})
                })
            }).catch(err =>{
                console.log({err});
                axios.get('./api/pet.json').then(res=>{
                    res.data.forEach(item=>{
                        this.model.push( new PetModel(item) )
                        this.$store.commit('setUser',{ pet: this.model})
                    })
                })
            })
        }else{
            console.error('User pet data is not PetModel.')
        }
        window.scrollTo({top: 0})
        // this.$watch('model',(newVal,oldVal)=>{
        //     console.log(newVal, oldVal);
        // },{
        //     deep: true
        // })
    }
};
</script>
<style scoped>
    .pet-list > .row > [class*=col]{
        padding-top: 5rem;
        padding-bottom: 1rem;
    }
    .pet-list .photo{
        width: 160px;
        height: 80px;
    }
    .pet-list .photo img{
        top: 0;
        width: 160px;
        height: 160px;
    }
    @media (max-width: 576px){
        .text-age span{
            font-size: 1.5rem;
        }
        .text-body-weight span{
            font-size: 1.5rem;
        }
    }
</style>