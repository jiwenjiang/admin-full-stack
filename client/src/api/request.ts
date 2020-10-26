import axios, { AxiosRequestConfig } from 'axios'
import { message as $message } from 'antd'

axios.defaults.timeout = 6000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  ({ data, config }) => {
    if (data?.message && config.method !== 'get') {
      data.status === 200 ? $message.success(data.message) : $message.error(data.message)
    }
    return config?.data
  },
  error => {
    let errorMessage = error.message || '系统异常'
    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络'
    }
    $message.error(errorMessage)
    return {
      status: false,
      message: errorMessage,
      result: null
    }
  }
)

export type Response<T = any> = {
  status: boolean
  message: string
  data: T
}

type Method = 'get' | 'post'

export type MyResponse<T = any> = Promise<Response<T>>

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  // const prefix = '/api'
  const prefix = 'http://localhost:5000/api/'
  url = prefix + url
  if (method === 'post') {
    console.log('url', url)
    return axios.post(url, data, config)
  } else {
    return axios.get(url, {
      params: data,
      ...config
    })
  }
}
