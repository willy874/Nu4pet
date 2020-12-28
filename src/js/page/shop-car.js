import Vue from 'vue'
import App from './shop-car/App.vue'
import store from './store'
import router from './shop-car/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const el = 'shop-car-page'
if (document.getElementById(el)) {
    new Vue({
        router,
        store,
        render: h => {
            window.VueCreateElement = h
            window.VNode = h('div').__proto__.constructor
            return h(App)
        }
    }).$mount(`#${el}`)
}