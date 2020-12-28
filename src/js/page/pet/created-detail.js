import { PetModel } from '@/models'
import getShopCarPromise from '../get-shop-car'
import router from './router'
import axios from 'axios'

export default function (callback){
    getShopCarPromise(({user})=>{
        const params = router.currentRoute.params
        if (Array.isArray(user.pet)) {
            const model = user.pet.find(p=>Number(p.id)===Number(params.id))
            if (model) {
                this.model = new PetModel(model)
                if(callback) callback(this.model)
            }else{
                axios.get('./api/pet.json').then(res=>{
                    this.model = new PetModel(res.data[model.id])
                    axios.get('./api/pet_status.json').then(res2=>{
                        this.petStatus = res2.data
                    })
                })
            }
        }
    })
    
}