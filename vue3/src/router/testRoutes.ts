export default [
  {
    path: '/',
    redirect: '/index',
    name: 'Home',
    meta: {
      type: 0,
      title: '首页'
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          type: 1,
          title: '总览',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/system',
        redirect: '/system/user',
        name: 'System',
        meta: {
          type: 1,
          title: '系统管理',
          icon: 'SettingOutlined'
        },
        children: [
          {
            path: '/system/user',
            name: 'User',
            meta: {
              type: 1,
              title: '用户管理',
              icon: 'TeamOutlined'
            }
          },
          {
            path: '/system/role',
            name: 'Role',
            meta: {
              type: 1,
              title: '角色管理',
              icon: 'UserSwitchOutlined'
            }
          },
          {
            path: '/system/menu',
            name: 'Menu',
            meta: {
              type: 1,
              title: '权限菜单管理',
              icon: 'FormOutlined'
            }
          },
          {
            path: '/system/log',
            name: 'Log',
            meta: {
              type: 1,
              title: '操作日志',
              icon: 'MenuOutlined'
            }
          }
        ]
      }
    ]
  }
];
