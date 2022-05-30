import Layout from '@/layout/index.vue'

export default {
  path: '/approvals',
  component: Layout,
  children: [{
    path: '',
    name: 'approvals',
    component: () => import('@/views/approvals/approvals.vue'),
    meta: { title: 'approvals', icon: 'approvals' }
  }]
}
