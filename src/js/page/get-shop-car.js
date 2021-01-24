import { getShopCarDataByAccount } from '@/api'
import getUserPromise from './get-user'
import store from './store'

// record shopCar
export default function (callback){
    getUserPromise(user=>{
        const shopCar = store.state.shopCar
        if (shopCar) {
            if (callback) callback({user,shopCar})
        }else{
            getShopCarDataByAccount(user.account).then(res =>{
                localStorage.setItem('shopCar',JSON.stringify(res.data))
                store.commit('setShopCar',res.data)
                if (callback) callback({user,shopCar:res.data})
            }).catch(err=>{
                console.dir(err)
            })
        }
    })
}