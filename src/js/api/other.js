import { request } from './config.js'

export const getRecommend = (id) => request.get(`recommend/user/${id}`)
export const getDiscountRules = (id)=>request.get(`discount/user/${id}`)
export const getSaleCodeDiscount = (code,data)=>request.post(`discount/salecode/${code}`,data)
export const getCity = ()=>request.get(`city`)
export const getPayMethod = ()=>request.get(`pay/method`)
export const checkMobileVehicle = (code)=>request.get(`vehicle/mobile/${code}`)
export const checkNaturalVehicle = (code)=>request.get(`vehicle/natural/${code}`)
export const checkCardCode = (data)=>request.post(`pay/card`,data)
export const getProdTaste = (id)=>request.get(`prod/taste/${id}`)
