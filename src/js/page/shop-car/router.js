import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    routes:[{
        path: '/',
        redirect: '/shop-car/1',
        component: () => import('./step1.vue')
      },{
        path: '/shop-car',
        redirect: '/shop-car/1',
        component: () => import('./step1.vue')
      },{
        path: '/shop-car/1',
        name: 'Step1',
        component: () => import('./step1.vue')
      },{
        path: '/shop-car/2',
        name: 'Step2',
        component: () => import('./step2.vue')
      },{
        path: '/shop-car/3',
        name: 'Step3',
        component: () => import('./step3.vue')
      },{
        path: '/shop-car/4',
        name: 'Step4',
        component: () => import('./step4.vue')
      },{
        path: '/shop-car/5',
        name: 'Step5',
        component: () => import('./step5.vue')
      },{
        path: '/404',
        name: '404',
        component: () => import('../Error.vue')
      },{
        name: 'Any',
        path: '*', 
        redirect: '/404',
      }]
})
