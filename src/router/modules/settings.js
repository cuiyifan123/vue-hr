import Layout from '@/layout/index.vue'

export default {
  path: '/settings',
  component: Layout,
  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/settings/settings.vue'),
    meta: { title: 'settings', icon: 'settings' }
  }]
}
