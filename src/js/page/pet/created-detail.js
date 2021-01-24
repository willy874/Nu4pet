import { PetModel } from '@/models'
import getShopCarPromise from '../get-shop-car'
import router from './router'

export default function (callback){
    getShopCarPromise(({user})=>{
        const params = router.currentRoute.params
        if (Array.isArray(user.pet)) {
            const model = user.pet.find(p=>Number(p.id)===Number(params.id))
            if (model) {
                this.model = new PetModel(model)
                if(callback) callback(this.model)
            }
        }
    })
    
}