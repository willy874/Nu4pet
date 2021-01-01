import { request } from './config.js'

export const addRecordData = (data) => request.post(`record`,data)