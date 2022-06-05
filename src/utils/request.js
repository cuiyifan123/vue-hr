import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时处理
})

service.interceptors.request.use((config) => {
  const { url } = config
  if (url.startsWith('/api/sys/login')) return config
  const token = store.getters.token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

service.interceptors.response.use(
  (response) => {
    // 如果success是false表示响应成功了，
    // 但是success为false在业务逻辑上是错误的，不是我们想要的结果，比如：账号密码错误。
    // 所以直接return 一个错误的promise，让发请求那里直接报错(请求那里只处理成功的情况)
    if (!response.data.success) {
      Message.error({
        message: response.data.message,
        duration: 2000
      })
      return Promise.reject(new Error(response.data.message))
    }
    return response.data
  },
  async(reason) => {
    // 如果状态码为401，表示token过期了，重定向到登录页
    if (reason.response?.status === 401) {
      await store.dispatch({ type: 'user/userLogout', payload: null })
      // 但是页面刷新是在根页面的，导致传递过去的from是 /首页，所以需要获取历史记录传递给登录页
      const redirect = location.href.replace(/.+#/g, '')
      router.push({ path: '/login', query: { redirect }})
    }
    return Promise.reject(reason)
  }
)
export default service

