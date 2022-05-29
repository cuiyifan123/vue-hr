import { getToken, removeToken, setToken } from '@/utils/auth.js'
import { loginApi, getInfoApi, getUserDetailById } from '@/api/user.js'

const state = {
  token: getToken() || '',
  userInfo: {}
}
const actions = {
  async userLogin({ commit }, loginForm) {
    const res = await loginApi(loginForm.payload)
    commit('setToken', res.data)
    return res
  },
  async getUserInfo({ commit }) {
    const res1 = await getInfoApi()
    const res2 = await getUserDetailById(res1.data.userId)
    commit('setUserInfo', Object.assign(res1.data, res2.data))
  },
  userLogout({ commit }) {
    // 清空token
    commit('removeToken')
    // 清空用户信息
    commit('removeUserInfo')
  }
}
const mutations = {
  setToken(state, token) {
    // 存到state里面
    state.token = token
    // 数据持久化，存放到cookie里面
    setToken(token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeToken(state) {
    // 清空vuex中的token
    state.token = ''
    // 清空Cookies中的token
    removeToken()
  },
  removeUserInfo(state) {
    // 清空用户信息
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
