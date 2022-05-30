import Layout from '@/layout/index.vue'

export default {
  path: '/attendances',
  component: Layout,
  children: [{
    path: '',
    name: 'attendances',
    component: () => import('@/views/attendances/attendances.vue'),
    meta: { title: 'attendances', icon: 'attendances' }
  }]
}
