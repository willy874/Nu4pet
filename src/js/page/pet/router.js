import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    routes:[{
        path: '/404',
        name: '404',
        components: () => import('../Error.vue')
      },{
        name: 'Any',
        path: '*', 
        redirect: '/404',
      },{
        path: '/',
        name: 'Home',
        components: () => import('./Base.vue')
      }]
})