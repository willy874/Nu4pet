<template>
    <div>
        <div class="d-flex justify-content-end pb-3">
            <button type="button" @click="dialogCancel" class="btn btn-icon">
                <icon-component pattern="Close" size="20"></icon-component>
            </button>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex flex-column align-items-center">
                    <div class="pb-2" style="width: 120px;">
                        <div class="rounded-circle p-1 bg-primary">
                            <div class="bg-white rounded-circle p-1">
                                <img class="w-100 rounded-circle" :src="model.pet.image_url" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="rwd-h4 mb-2 font-weight-bold">{{ model.pet.name }}</div>
                    <div class="rwd-h4 mb-2">體重：{{ model.pet.body_weight }}kg</div>
                </div>
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <img class="w-100" :src="model.image[0].url" :alt="model.subject">
                        </div>
                        <div class="col rwd-h4">
                            <div>客製化寵糧訂單編號：</div>
                            <div class="pb-xs-3">{{ model.order_code }}</div>
                            <div v-html="model.subject"></div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex flex-center py-3">
                    <div>
                        <div class="px-3 py-2">
                            <div>指定出貨日期：</div>
                            <input class="form-control rounded-pill bg-light" :class="{'is-invalid':model.errors['taste_date']}" type="date" v-model="model.taste_date">
                        </div>
                        <div class="py-2" v-if="model.case==='year'">
                            <div>指定單月特調口味：</div>
                            <div class="row">
                                <div class="col-auto py-1" v-for="item in attrs.taste_odd" :key="item.id">
                                    <div class="form-check">
                                        <input class="form-check-input" :class="{'is-invalid':model.errors['taste_odd']}" type="radio" :id="item.uuid" :value="item.name" v-model="model.taste_odd">
                                        <label class="form-check-label py-1 px-2 rounded-pill" :for="item.uuid">
                                            {{ item.name }} | {{ item.subject }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-2" v-if="model.case==='year'">
                            <div>指定雙月特調口味：</div>
                            <div class="row">
                                <div class="col-auto py-1" v-for="item in attrs.taste_even" :key="item.id">
                                    <div class="form-check">
                                        <input class="form-check-input" :class="{'is-invalid':model.errors['taste_even']}" type="radio" :id="item.uuid" :value="item.name" v-model="model.taste_even">
                                        <label class="form-check-label py-1 px-2 rounded-pill" :for="item.uuid">
                                            {{ item.name }} | {{ item.subject }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex flex-center">
                    <div class="text-center">
                        <button type="button" class="btn btn-primary text-white rounded-pill my-2" @click="dialogCheck">確認</button>
                        <div class="my-2">
                            確認後就不能修改了喔，<br/>
                            如果需要修改請聯絡客服人員!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: "Popup",
    props: {
        attrs: Object,
        index: Number
    },
    data(){
        return {
            model: this.attrs.model
        }
    },
    methods: {
        dialogCancel(e) {
            e.stopPropagation();
            this.$dialog.cancel()
        },
        dialogCheck() {
            const check = () => {
                const errors = this.model.validate()
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
                this.$dialog.close()
            };
            check();
        }
    },
};
</script>
<style scoped>
    .container{
        max-height: 80vh;
        overflow: auto;
    }
    .form-check{
        padding: 0;
    }
    .form-check .form-check-input{
        opacity: 0;
        pointer-events: none;
    }
    .form-check .form-check-input:checked ~ .form-check-label{
        background-color: #45C2B1;
        color: #fff;
    }
    .form-check .form-check-label{
        background-color: #f3f3f3;
        cursor: pointer;
    }
    .form-check .form-check-label:hover{
        background-color: #45C2B1;
        color: #fff;
    }
</style>