import Layout from '@/layout/index.vue'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees/employees.vue'),
    meta: { title: 'employees', icon: 'employees' }
  }]
}
