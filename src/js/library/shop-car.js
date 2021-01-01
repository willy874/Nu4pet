import { getShopCarDataByUserId,addShopCarData,updateShopCarData,deleteShopCarData } from '@/api'
import Swal from 'sweetalert2'
/**
 * @name ShopCar
 * 
 * @example 
 * import { ShopCarMethod } from '@/library'
 * ShopCarMethod.call(thsi,data)
 */
export function addShopCarMethod(data){
    return new Promise((resolve,reject) => {
        const shopCar = this.$store.state.shopCar.find(p=>p.id===data.prod_id)
        // 判斷該商品是否已經在購物車，若有則改成數量+1。
        if (shopCar) {
            updateShopCarData({
                id: shopCar.shop_car_id,
                prod_id: shopCar.id,
                user_id: data.user_id,
                count: shopCar.count + 1
            }).then(()=>{
                getShopCarDataByUserId(data.user_id).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        timer: 1500,
                        title: '已成功加入購物袋',
                        showConfirmButton: false,
                    })
                    this.$store.commit('setShopCar',res.data)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            }).catch(err=>{
                reject(err)
            })
        }else{
            addShopCarData({
                prod_id: data.prod_id,
                user_id: data.user_id,
                pet_id: data.pet_id || 0,
                count: data.count || 1
            }).then(()=>{
                getShopCarDataByUserId(data.user_id).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        timer: 1500,
                        title: '已成功加入購物袋',
                        showConfirmButton: false,
                    })
                    this.$store.commit('setShopCar',res.data)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            }).catch(err=>{
                reject(err)
            })
        }
    })
}
export function updateShopCarMethod(data){
    return new Promise((resolve,reject)=>{
        updateShopCarData(data).then(()=>{
            getShopCarDataByUserId(data.user_id).then(res=>{
                this.$store.commit('setShopCar',res.data)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
export function deleteShopCarMethod(data){
    return new Promise((resolve,reject)=>{
        Swal.fire({
            title: '您確定刪除該筆訂單嗎?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#dcdcdc',
            confirmButtonText: '刪除',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteShopCarData(data.id).then(()=>{
                    getShopCarDataByUserId(data.user_id).then(res=>{
                        Swal.fire({
                            icon: 'success',
                            timer: 1500,
                            title: '已移除購物袋項目',
                            showConfirmButton: false,
                        })
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                }).catch(err=>{
                    reject(err)
                })
            }
        })
    })
}