import axios, { AxiosRequestConfig } from 'axios'
import { message as $message } from 'antd'

const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  timeout: 6000
})

instance.interceptors.request.use(
  config => {
    config.headers['authorization'] = sessionStorage.token
    return config
  },
  error => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    if (res?.data?.status === 401) {
      $message.error(res.data.message)
    }
    if (res?.data?.message && res?.config.method !== 'get') {
      res.data?.status === 200 ? $message.success(res.data.message) : $message.error(res.data.message)
    }
    return res?.data
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
  status: number
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
    return instance.post(url, data, config)
  } else {
    return instance.get(url, {
      params: data,
      ...config
    })
  }
}
