import Layout from '@/layout/index.vue'

export default {
  path: '/salarys',
  component: Layout,
  children: [{
    path: '',
    name: 'salarys',
    component: () => import('@/views/salarys/salarys.vue'),
    meta: { title: 'salarys', icon: 'salarys' }
  }]
}
