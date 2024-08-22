import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'

const routes = [
  { 
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据' }
      },
      {
        path: 'auth',
        meta: { id: '2', name: '权限管理', icon: 'Grid' },
        children: [
          {
            path: 'admin',
            alias: ['/auth', '/auth/admin'], // alias 应该是一个数组
            component: () => import('@/views/auth/admin/index.vue'),
            meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' }
          },
          {
            path: 'group',
            component: () => import('@/views/auth/group/index.vue'),
            meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' }
          }
        ]
      },
      {
        path: 'vppz',
        meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
        children: [
          {
            path: 'staff',
            alias: ['/vppz', '/vppz/staff'], // alias 应该是一个数组
            component: () => import('@/views/vppz/staff/index.vue'),
            meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择' }
          },
          {
            path: 'order',
            component: () => import('@/views/vppz/order/index.vue'),
            meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改' }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
