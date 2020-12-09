import axios from 'axios'
import configSettings from '@/config'

const configRequest = () => {
    const apiConfig = axios.create({
        baseURL: `${configSettings.api.baseUrl}`,
        headers: configSettings.api.headers
    })
    
    apiConfig.interceptors.request.use((config) => {
        if (window.localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
        }
        return config
    }, function (err) {
        return Promise.reject(err)
    })
    
    apiConfig.interceptors.response.use((data) => {
        return data
    }, (err) => {
        window.localStorage.setItem('error-code', err.response.status)
        if (err.response.status === 418 && err.response.data.error_code) {
            window.localStorage.setItem('error-code', err.response.data.error_code)
        }
        return Promise.reject(err)
    })
    return apiConfig
}
export const request = configRequest()

/** 使用:
 * axiosRequest(options).method(url,data)
 */ 

export const axiosRequest = (ops) => {
    const apiConfig = axios.create({
        ...configSettings,
        ...ops
    })

    apiConfig.interceptors.request.use((config) => {
        if (window.localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
        }
        return config
    }, function (err) {
        return Promise.reject(err)
    })

    apiConfig.interceptors.response.use((data) => {
        return data
    }, (err) => {
        window.localStorage.setItem('error-code', err.response.status)
        if (err.response.status === 418 && err.response.data.error_code) {
            window.localStorage.setItem('error-code', err.response.data.error_code)
        }
        return Promise.reject(err)
    })

    return apiConfig
}