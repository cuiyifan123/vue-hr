import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// 字体图标
import '@/icons'
// 权限控制
import '@/permission'

import PageTools from '@/components/PageTools'
import Excel from '@/components/UploadExcel/index.vue'
import UploadImg from '@/components/UploadImg/UploadImg.vue'
// 注册element ui
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.component('PageTools', PageTools)
Vue.component('Excel', Excel)
Vue.component('UploadImg', UploadImg)
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
