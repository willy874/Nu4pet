import Vue from 'vue'
import App from './pet/App.vue'
import store from './store'
import router from './pet/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const el = 'pet-page'
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