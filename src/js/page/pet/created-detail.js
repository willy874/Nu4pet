import { getPetDataById } from '@/api'
import { PetModel } from '@/models'
import axios from 'axios'

export default function (){
    const user = this.$store.state.user
    const params = this.$route.params
    if (Array.isArray(user.pet)) {
        const model = user.pet.find(p=>Number(p.id)===Number(params.id))
        if (model) {
            this.model = model
        }else{
            console.error('User pet is not data.')
        }
    }else if (typeof user.pet === 'string') {
        const arrUserPet = this.$store.state.user.pet.split(',')
        const modelId = arrUserPet.find(id=>Number(id)===Number(params.id))
        if (modelId) {
            getPetDataById(modelId).then(res=>{
                this.model = new PetModel(res.data)
            }).catch(err=>{
                console.log({err});
                axios.get('./api/pet.json').then(res=>{
                    this.model = new PetModel(res.data[0])
                })
            })
        }
    }else{
        console.error('User pet data is not PetModel.')
    }
}