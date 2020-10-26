import { Action } from 'redux'
import { MenuChild } from '~/interface/layout/menu.interface'
import { LoginParams, Role } from '~/interface/user/login'
import { ThunkAction } from 'redux-thunk'
import { apiLogin, apiLogout } from '~/api/user.api'
import { AppState } from '~/stores'

export interface UserState {
  username: string

  /** menu list for init tagsView */
  menuList: MenuChild[]

  /** login status */
  logged: boolean

  role: Role
}

const SETUSERITEM = 'SETUSERITEM'

type SETGLOBALITEM = typeof SETUSERITEM

interface SetUserItem extends Action<SETGLOBALITEM> {
  [x: string]: any
  payload: Partial<UserState>
}

export const setUserItem = (payload: Partial<UserState>): SetUserItem => ({
  type: 'SETUSERITEM',
  payload
})

export type UserActions = SetUserItem

export const loginAsync = (payload: LoginParams): ThunkAction<Promise<boolean>, AppState, null, SetUserItem> => {
  return async dispatch => {
    const { data, status } = await apiLogin(payload)
    console.log('payload', payload, status)
    debugger

    if (status) {
      dispatch(
        setUserItem({
          logged: true,
          username: data.username
        })
      )
      return true
    }
    return false
  }
}

export const logoutAsync = (): ThunkAction<Promise<boolean>, AppState, null, SetUserItem> => {
  return async dispatch => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! })
    if (status) {
      localStorage.clear()
      dispatch(
        setUserItem({
          logged: false
        })
      )
      return true
    }
    return false
  }
}
