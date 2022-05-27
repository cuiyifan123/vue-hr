/**
 * 这个文件用来导入 ./modules文件下面的所有.js结尾的文件，拼接成 modules:{} 这样vuex模块空间的对象并导出
 */

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  // key是带路径的( 例如：./app.js )，但是注册的时候格式不需要路径（ ./ 和 .js这些东西 ）,替换成空字符串
  const name = key.replace(/\.\/|\.js/g, '')
  modules[name] = files(key).default
})

export default modules
