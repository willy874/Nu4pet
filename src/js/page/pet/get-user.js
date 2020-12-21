import { getUserLogin } from '@/api'
import store from './store'
import axios from 'axios'

const userData = {
    account: 'admin',
    password: 'password'
}

export default function (callback){
    const user = store.state.user
    if (user) {
        if (callback) callback(user)
    }else{
        return getUserLogin(userData.account,userData.password).then(res =>{
            localStorage.setItem('user',JSON.stringify(res.data))
            store.commit('setUser',res.data)
            if (callback) callback(res.data)
        }).catch(err=>{
            console.log({err})
            axios.get('./api/user.json').then(res=>{
                localStorage.setItem('user',JSON.stringify(res.data[0]))
                store.commit('setUser',res.data[0])
                if (callback) callback(res.data)
            })
        })
    }
}
    