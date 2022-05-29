import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const whiteList = ['/login', '/404']
// drawio文件下：权限流程1图
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const { token, name } = store.getters
  // 判断是否有token
  if (token) {
    if (!name) {
      await store.dispatch({ type: 'user/getUserInfo', payload: null })
    }
    if (to.path === '/login') {
      NProgress.done()
      next(from.path)
    } else {
      next()
    }
  } else {
    // 没有token查看去的页面是否在白名单上面，如果在则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      NProgress.done()
      // 不在白名单，并且没有token滚去登录页
      next('/login')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
//
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
//
// const whiteList = ['/login'] // no redirect whitelist
//
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//
//   // set page title
//   document.title = getPageTitle(to.meta.title)
//
//   // determine whether the user has logged in
//   const hasToken = getToken()
//
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')
//
//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/
//
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })
//
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
