const files = require.context('./modules', false, /.js$/)
// 动态路由表
const asyncRoutes = []
files.keys().forEach((key) => {
  asyncRoutes.push(files(key).default)
})

export default asyncRoutes
