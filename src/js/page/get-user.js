import { getUserLogin } from '@/api'
import store from './store'

const userData = {
    account: 'admin',
    password: 'password'
}

export default function (callback){
    const user = store.state.user
    if (user) {
        if (callback) callback(user)
    }else{
        getUserLogin(userData.account,userData.password).then(res =>{
            localStorage.setItem('user',JSON.stringify(res.data))
            store.commit('setUser',res.data)
            if (callback) callback(res.data)
        }).catch(err=>{
            console.dir(err)
        })
    }
}
    