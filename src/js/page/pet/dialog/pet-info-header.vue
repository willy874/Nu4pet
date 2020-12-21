<template>
    <div class="d-flex flex-between">
        <h3>{{attrs.model.text}}</h3>
        <button
            type="button"
            @click="dialogClose"
            class="btn rounded-circle bg-white text-dark p-2"
        >
            <icon-component pattern="Close" size="20" />
        </button>
    </div>
</template>

<script>
export default {
    name: "Popup",
    props: {
        attrs: Object,
        index: Number
    },
    methods: {
        dialogClose(e) {
            e.stopPropagation();
            this.$dialog.close(this.index)
        }
    },
};
</script>
