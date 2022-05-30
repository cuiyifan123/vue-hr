import Layout from '@/layout/index.vue'

export default {
  path: '/social_securitys',
  component: Layout,
  children: [{
    path: '',
    name: 'social_scuritys',
    component: () => import('@/views/social_securitys/social_securitys.vue'),
    meta: { title: 'social_securitys', icon: 'social_securitys' }
  }]
}
