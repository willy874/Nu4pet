import { request } from './config.js'

export const getRecommend = ({user_id,account,count}) => request.get(`recommend?user_id=${user_id}&account=${account}&count=${count}`)

