import Vue from 'vue'
import App from '@/plugins/svg/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const el = 'svg-too-page'
if (document.getElementById(el)) {
    new Vue({
        render: h => {
            window.VueCreateElement = h
            window.VNode = h('div').__proto__.constructor
            return h(App)
        }
    }).$mount(`#${el}`)
}

