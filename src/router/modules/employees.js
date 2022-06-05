import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees/employees.vue'),
    meta: { title: '员工管理', icon: 'people' }
  }, {
    path: 'upload-excel',
    component: () => import('@/views/employees/components/upload-excel.vue'),
    hidden: true
  }]
}
