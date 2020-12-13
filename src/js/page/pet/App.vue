<template>
    <section class="container py-5">
        <h2 class="pb-5">毛孩專區</h2>
        <router-view></router-view>
    </section>
</template>
<script>
import { getUserLogin } from '@/api'
import axios from 'axios'

export default {
    created(){
        const user = localStorage.getItem('user')
        if (user) {
            this.$store.commit('setUser',JSON.parse(user))
        }else{
            getUserLogin('admin','password').then(res =>{
                localStorage.setItem('user',JSON.stringify(res.data))
                this.$store.commit('setUser',res.data)
            }).catch(err=>{
                console.log({err})
                axios.get('./api/user.json').then(res=>{
                    localStorage.setItem('user',JSON.stringify(res.data[0]))
                    this.$store.commit('setUser',res.data[0])
                    console.log();
                })
            })
        }
    }
}
</script>