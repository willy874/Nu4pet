import { request } from './config.js'

export const getArticleDataList = (page = 0) => request.get('article?page=' + page)
export const getArticleDataById = (id) => request.get(`article/${id}`)
export const getArticlesByNodeIdList = (id) => request.get(`article/list/${id}`)
export const getArticlesByNodeIdFirst = (id) => request.get(`article/first/${id}`)
export const addArticleData = (data) => request.post('article',data)
export const updateArticleData = (data) => request.put('article',data)
export const deleteArticleData = (data) => request.put('article/delete',data)
export const softDeleteArticleDataById = (id) => request.delete(`article/${id}`)
export const forceDeleteArticleDataById = (id) => request.delete(`article/delete/${id}`)

export const updateArticleUploadImage = (data) => request.post('article/image',data,{
    headers:  {
        'content-type': 'application/x-www-form-urlencode',
        'X-Client-Version': '0.0.1'
    }
})
export const softDeleteArticleImageById = (id) => request.delete(`article/image/${id}`)
export const forceDeleteArticleImageById = (id) => request.delete(`article/image/delete/${id}`)