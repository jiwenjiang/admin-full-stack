import React, { FC } from 'react'
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import Avator from '~/assets/header/avator.jpeg'
import Logo from '~/assets/logo/fushu-logo.svg'

const { Header } = Layout

interface Props {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<Props> = ({ collapsed, toggle }) => {
  const navigate = useNavigate()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        navigate('/login')
        return
    }
  }

  const toLogin = () => {
    navigate('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => navigate('/dashboard')}>用户</span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick('logout')}>登出</span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      {collapsed ? (
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      ) : (
        <div className="logo-text">复数科技</div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger" style={{ cursor: 'pointer' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="user-action">
              <img src={Avator} className="user-avator" />
            </span>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default HeaderComponent
