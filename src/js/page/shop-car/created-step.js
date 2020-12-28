// import { getShopCarDataByAccount } from '@/api'
import { ShopCarModel,RecordModel } from '@/models'
import getShopCarPromise from '../get-shop-car'
import store from '../store'
// import axios from 'axios'
// record shopCar
export default function (callback){
    getShopCarPromise(({user,shopCar})=>{
        const record = store.state.record
        if (record) {
            this.model = new RecordModel(record)
            callback({user,shopCar,record})
        }else{
            this.model = new RecordModel({
                ShopCarList: shopCar.map(p=>new ShopCarModel(p))
            })
            callback({user,shopCar})
        }
    })
}