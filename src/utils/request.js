import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时处理
})

service.interceptors.request.use(config => {
  const { url } = config
  if (url.startsWith('/api/sys/login')) return config
  const token = store.getters.token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

service.interceptors.response.use((response) => {
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
}, (reason) => {
  console.log(reason)
})
export default service
