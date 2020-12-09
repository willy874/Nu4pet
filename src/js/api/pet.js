import { request } from './config.js'

export const getPetListData = (page = 1,per = 10) => request.get(`pet?page=${page}&per=${per}`)
export const getPetAllData = () => request.get('/pet/all')
export const getPetDataById = (id) => request.get(`pet/${id}`)
