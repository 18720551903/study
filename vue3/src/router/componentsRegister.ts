export default {
  menus: {
    '/': {
      component: () => import('views/home/Home.vue')
    },
    '/index': {
      component: () => import('views/index/Index.vue')
    },
    '/system': {
      component: () => import('@/Template.vue')
    },
    '/system/user': {
      component: () => import('views/system/User.vue')
    },
    '/system/role': {
      component: () => import('views/system/Role.vue')
    },
    '/system/menu': {
      component: () => import('views/system/Menu.vue')
    },
    '/system/log': {
      component: () => import('views/system/Log.vue')
    }
  },
  buttons: {}
};
