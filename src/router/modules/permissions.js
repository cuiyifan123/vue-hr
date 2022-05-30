import Layout from '@/layout/index.vue'

export default {
  path: '/permissions',
  component: Layout,
  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permissions/permissions.vue'),
    meta: { title: 'permissions', icon: 'permissions' }
  }]
}
