import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { Route, useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { RouteProps, useLocation } from 'react-router'

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useSelector((state: AppState) => state.userReducer)
  const navigate = useNavigate()
  const location = useLocation()
  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      extra={
        <Button
          type="primary"
          onClick={() => navigate('/login', { replace: true, state: { from: location.pathname } })}
        >
          返回登录
        </Button>
      }
    />
  )
}

export default PrivateRoute
