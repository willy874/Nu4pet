<template>
    <section class="container py-5">
        <h2 class="pb-5">毛孩專區</h2>
        <router-view></router-view>
        <dialog-component></dialog-component>
    </section>
</template>
<script>
export default {
    data(){
        return {
            dialog: this.$dialog
        }
    },
    created(){
        // const user = localStorage.getItem('user')
        // if (user) {
        //     this.$store.commit('setUser',JSON.parse(user))
        // }
    }
}
</script>