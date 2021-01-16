import { request } from './config.js'

export const getUserLogin = (account,password) => request.get(`/login?account=${account}&password=${password}`)
export const updateUserData = (data) => request.put(`/user`,data)

