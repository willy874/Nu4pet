import { request } from './config.js'

export const getShopCarData = (key,search) => {
    if (key&&search) {
        return request.get(`shopcar?${key}=${search}&search=${key}`)
    }
    return request.get(`shopcar`)
}
export const getShopCarDataById = (id) => request.get(`shopcar?id=${id}`)
export const getShopCarDataByAccount = (account) => request.get(`shopcar?account=${account}`)
export const addShopCarData = (data) => request.post(`shopcar`,data)
export const updateShopCarData = (data) => request.put(`shopcar`,data)
export const deleteShopCarData = (id) => request.post(`shopcar/${id}`)