import React, { FC, useEffect, Suspense, useCallback, useState } from 'react'
import { Layout, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { AppState } from '~/stores'
import { setGlobalItem } from '~/actions/global.action'
import MenuComponent from './menu'
import HeaderComponent from './header'
import { getGlobalState } from '~/utils/getGloabal'
import TagsView from './tagView'
import SuspendFallbackLoading from './suspendFallbackLoading'
import { menuList } from '~/mock/user/menu.mock'
import { Outlet, useLocation, useNavigate } from 'react-router'

const { Sider, Content } = Layout
const WIDTH = 992

const LayoutPage: FC = () => {
  const { device, collapsed, newUser } = useSelector((state: AppState) => state.globalReducer)
  const isMobile = device === 'MOBILE'
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [navigate, location])

  const toggle = () => {
    dispatch(
      setGlobalItem({
        collapsed: !collapsed
      })
    )
  }

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState()
      const rect = document.body.getBoundingClientRect()
      const needCollapse = rect.width < WIDTH
      dispatch(
        setGlobalItem({
          device,
          collapsed: needCollapse
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    newUser
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser])

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider className="layout-page-sider" trigger={null} collapsible collapsed={collapsed} breakpoint="md">
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={<SuspendFallbackLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
