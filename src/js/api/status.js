import { request } from './config.js'

export const getPetStatusAllData = () => request.get(`/pet/status/all`)
export const getPetStatusDataByType = (type) => request.get(`/pet/status/${type}`)