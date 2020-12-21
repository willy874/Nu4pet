import { PetModel } from '@/models'
import { getPetDataById } from '@/api'
import getUserPromise from './get-user'
import router from './router'
import axios from 'axios'

export default function (callback){
    getUserPromise((user)=>{
        const params = router.currentRoute.params
        if (Array.isArray(user.pet)) {
            const model = user.pet.find(p=>Number(p.id)===Number(params.id))
            if (model) {
                this.model = new PetModel(model)
                if(callback) callback(this.model)
            }else{
                console.error('User pet is not data.')
            }
        }else if (typeof user.pet === 'string') {
            const id = user.pet.find(id=>Number(id)===Number(params.id))
            if (id) {
                getPetDataById(id).then(res=>{
                    this.model = new PetModel(res.data)
                    if(callback) callback(this.model)
                }).catch(err=>{
                    console.log({err});
                    axios.get('./api/pet.json').then(res=>{
                        // Set Model
                        this.model = new PetModel(res.data[id])
                        axios.get('./api/pet_status.json').then(res2=>{
                            this.petStatus = res2.data
                        })
                    })
                })
            }
        }else{
            console.error('User pet data is not defind.')
        }
    })
    
}