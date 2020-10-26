import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string
  /** authorization？ */
  auth?: boolean
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, ...props }) => {
  const WitchRoute = auth ? PrivateRoute : Route
  return <WitchRoute {...props} />
}

export default WrapperRouteComponent
