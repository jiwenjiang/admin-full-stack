import React, { lazy, FC } from 'react'

import Dashboard from '~/pages/dashboard'
import LoginPage from '~/pages/login'
import RegistPage from '~/pages/login/regist'
import LayoutPage from '~/pages/layout'
import { PartialRouteObject } from 'react-router'
import WrapperRouteComponent from './config'
import { useRoutes } from 'react-router-dom'

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))
const DataManage = lazy(() => import(/* webpackChunkName: "dataManage'"*/ '~/pages/dataManage'))
const UserManage = lazy(() => import(/* webpackChunkName: "userManage'"*/ '~/pages/userManage'))
const DataDetail = lazy(() => import(/* webpackChunkName: "dataManageDetail'"*/ '~/pages/dataManage/detail'))

const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
  },
  {
    path: 'regist',
    element: <WrapperRouteComponent element={<RegistPage />} titleId="title.regist" />
  },
  {
    path: '',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="title.dashboard" />
      },
      {
        path: 'dataManage',
        element: <WrapperRouteComponent element={<DataManage />} titleId="title.dataManage" />
      },
      {
        path: 'dataDetail/:id',
        element: <WrapperRouteComponent element={<DataDetail />} titleId="title.dataDetail" />
      },
      {
        path: 'userManage',
        element: <WrapperRouteComponent element={<UserManage />} titleId="title.userManage" />
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />
      }
    ]
  }
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)
  return element
}

export default RenderRouter
