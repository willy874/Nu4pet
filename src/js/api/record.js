import { request } from './config.js'

export const getRecordAddress = (account) => request.get(`record/address/${account}`)
export const getRecordDataById = (id) => request.get(`/record/${id}`)
export const addRecordData = (data) => request.post(`record`,data)
export const updateRecordData = (data) => request.put(`record`,data)
