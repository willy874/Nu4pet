import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: undefined,
        step: 1,
        shopCar: undefined,
        record: undefined,
    },
    mutations: {
        setUser (state,data) {
            state.user = {
                ...state.user,
                ...data
            }
        },
        nextStep (state) {
            state.step++
        },
        setShopCar (state,data) {
            state.shopCar = {
                ...state.shopCar,
                ...data
            }
        },
        seRecord (state,data) {
            state.record = {
                ...state.record,
                ...data
            }
        },
    },
    getters: {},
    actions: {},
    modules: {}
})