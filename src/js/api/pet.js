import { request } from './config.js'
const FromDataHeader = {
    headers:  {
        'content-type': 'application/x-www-form-urlencode',
        'X-Client-Version': '0.0.1'
    }
}

export const getPetListData = (page = 1,per = 10) => request.get(`pet?page=${page}&per=${per}`)
export const getPetAllData = () => request.get('/pet/all')
export const getPetListDataByAccount = (account) => request.get(`pet/user/${account}`)
export const getPetDataById = (id) => request.get(`pet/${id}`)
export const addPetData = (data) => request.post(`pet`,data,FromDataHeader)
export const updatePetDataById = (id,data) => request.post(`pet/${id}`,data,FromDataHeader)
