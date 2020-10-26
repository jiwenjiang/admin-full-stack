import { MenuList } from '~/interface/layout/menu.interface'

export const menuList: MenuList = [
  {
    name: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: '首页'
    },
    icon: 'dashboard',
    key: '0',
    path: '/dashboard'
  },
  {
    name: 'dataManage',
    label: {
      zh_CN: '数据管理',
      en_US: '数据管理'
    },
    icon: 'documentation',
    key: '1',
    path: '/dataManage'
  },
  {
    name: 'userManage',
    label: {
      zh_CN: '用户管理',
      en_US: '用户管理'
    },
    icon: 'guide',
    key: '2',
    path: '/userManage'
  },
  {
    name: 'permissionManage',
    label: {
      zh_CN: '权限管理',
      en_US: '权限管理'
    },
    icon: 'permission',
    key: '3',
    path: '/permission'
  }
]
