<template>
    <div class="d-flex justify-content-end">
        <button
            type="button"
            @click="dialogCancel"
            class="btn btn-secondary"
        >
            取消
        </button>
        <button
            type="button"
            @click="dialogCheck"
            class="btn btn-primary"
        >
            確定
        </button>
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
