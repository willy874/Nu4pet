import { request } from './config.js'

export const getRecordAddress = (account) => request.get(`record/address/${account}`)
export const getRecordDataById = (id) => request.get(`/record/${id}`)
export const addRecordData = (data) => request.post(`record`,data)
export const updateRecordData = (data) => request.put(`record`,data)
export const updateRecordShopCarListData = (data) => request.put(`record/shopcar`,data)
export const getPayMethodData = (data)=>request.get(`/record/pay?order=${data}`)
export const getRecordCountByAccount = (account)=>request.get(`/record/count/${account}`)
export const getRecordDataByPetId = (id)=>request.get(`/record/pet/${id}`)
