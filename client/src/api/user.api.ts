import { request } from './request'
import { LoginResult, LoginParams, LogoutParams, LogoutResult } from '../interface/user/login'

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', 'auth/login', data)

/** 登出接口 */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/user/logout', data)

/** 注册 */
export const apiRegist = (data: any) => request('post', 'auth/regist', data)

/** get */
export const apiGetUserList = (data?: any) => request('get', 'user', data)

/** get */
export const apiGetUserDetail = (id: string) => request('get', `user/${id}`)

/* update */
export const updateUser = (id: string, data: any) => request('put', `user/${id}`, data)

/* delete */
export const deleteUser = (id: string) => request('delete', `user/${id}`)
