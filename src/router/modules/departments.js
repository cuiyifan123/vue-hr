import Layout from '@/layout/index.vue'

export default {
  path: '/departments',
  component: Layout,
  children: [{
    path: '',
    name: 'departments',
    component: () => import('@/views/departments/departments.vue'),
    meta: { title: 'departments', icon: 'departments' }
  }]
}
