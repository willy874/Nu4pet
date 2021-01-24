import { getCity } from '@/api'

export default function (callback){
    const cityStorage = localStorage.getItem('city')
    if (cityStorage) {
        this.city = JSON.parse(cityStorage)
        callback(cityStorage)
    }else{
        const cityStore = this.$store.state.city
        if (cityStore) {
            localStorage.setItem('city',JSON.stringify(cityStore))
            this.city = cityStore
            callback(cityStore)
        }else{
            getCity().then(res=>{
                const cityAjax = res.data
                localStorage.setItem('city',JSON.stringify(cityAjax))
                this.$store.commit('setCity',cityAjax)
                this.city = cityAjax
                callback(cityAjax)
            }).catch(err=>{
                console.error(err)
            })
        }
    }
}