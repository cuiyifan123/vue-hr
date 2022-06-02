import Layout from '@/layout'

export default {
  // 用户访问的路径
  path: '/departments',
  // 先加载 Layout 组件
  component: Layout,
  children: [{
    // 可以简单理解为默认路由: 当访问 /departments 时加载 Layout 组件, 然后 Layout 有一个默认的二级路由, 加载 departments 组件
    // 默认匹配该路由规则
    path: '',
    name: 'departments',
    component: () => import('@/views/departments/departments.vue'),
    // 元信息: 路由自带的信息
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
