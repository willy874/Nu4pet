<template>
    <p>This is base-view dialog-popup-body</p>
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
