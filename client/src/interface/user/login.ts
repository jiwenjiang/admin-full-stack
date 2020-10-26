/** user's role */
export type Role = 'guest' | 'admin'

export interface LoginParams {
  /** 用户名 */
  email: string
  /** 用户密码 */
  password: string
}

export interface LoginResult {
  /** auth token */
  token: string
  username: string
  role: Role
}

export interface LogoutParams {
  token: string
}

export interface LogoutResult {}

export enum userEnum {
  PATIENT,
  DOCTOR,
  FAMILY,
  OTHER
}
