import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        user: undefined,
        step: 1,
        shopCar: undefined,
        record: undefined,
        city: undefined,
    },
    mutations: {
        setUser (state,data) {
            state.user = {
                ...state.user,
                ...data
            }
        },
        setStep (state,step) {
            if (step) {
                state.step = step
            }else{
                state.step++
            }
        },
        setShopCar (state,data) {
            state.shopCar = data
        },
        setRecord (state,data) {
            state.record = {
                ...state.record,
                ...data
            }
        },
        setCity (state,data) {
            state.city = data
        },
    },
    getters: {},
    actions: {},
    modules: {}
})
