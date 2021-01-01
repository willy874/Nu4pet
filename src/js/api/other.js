import { request } from './config.js'

export const getRecommend = (id) => request.get(`recommend/user/${id}`)
export const getDiscountRules = (id)=>request.get(`discount/user/${id}`)
export const getSaleCodeDiscount = (code)=>request.get(`discount/salecode/${code}`)
export const getCity = ()=>request.get(`city`)