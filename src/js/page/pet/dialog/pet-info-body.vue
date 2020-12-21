<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 border-right border-primary pt-3 pt-sm-0">
                <h5 class="d-inline-block bg-primary rounded-pill text-white px-3 py-1">我的生理反應</h5>
                <p>{{attrs.model.physiological}}</p>
            </div>
            <div class="col-sm-6 pt-3 pt-sm-0">
                <h5 class="d-inline-block bg-primary rounded-pill text-white px-3 py-1">我會生什麼病？</h5>
                <p>{{attrs.model.disease}}</p>
            </div>
            <div class="col-12 border-top border-primary pt-3">
                <h5 class="d-inline-block bg-primary rounded-pill text-white px-3 py-1">我該吃什麼？</h5>
                <p>{{attrs.model.eat}}</p>
            </div>
        </div>
    </div>
</template>

<script>
// 這是撰寫 PopupComponent的範例

export default {
    name: "Popup",
    props: {
        attrs: Object,
        index: Number
    },
    methods: {
        dialogCancel(e) {
            e.stopPropagation();
            console.log("cancel return", this.$dialog.cancel(this.index));
        },
        dialogCheck() {
            const check = () => {
                console.log(
                    "close return",
                    this.$dialog.close(this.index)
                );
            };
            check();
        },
    },
};
</script>
<style scoped>
    p{
        min-height: 5rem;
    }
    @media (max-width: 576px) {
        .border-right{
            border-right: solid 0 transparent !important;
            border-bottom: solid 1px #49c5b1 !important;
        }
    }
</style>