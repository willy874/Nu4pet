import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    routes:[{
        path: '/',
        name: 'List',
        component: () => import('./List.vue')
      },{
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('./Detail.vue'),
        children: [{
            path: 'base',
            name: 'Base',
            component: () => import('./Base.vue')
          },{
            path: 'nutrition',
            name: 'Nutrition',
            component: () => import('./Nutrition.vue')
          },{
            path: 'record',
            name: 'Record',
            component: () => import('./Record.vue')
          }]
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
