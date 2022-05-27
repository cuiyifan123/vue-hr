import { getToken, setToken } from '@/utils/auth.js'
import { loginApi } from '@/api/user.js'

const state = {
  token: getToken() | ''
}
const actions = {
  async userLogin({ commit }, loginForm) {
    const res = await loginApi(loginForm.payload)
    commit('setToken', res.data)
    return res
  }
}
const mutations = {
  setToken(state, action) {
    // 存到state里面
    state.token = action.payload
    // 数据持久化，存放到cookie里面
    setToken(action.payload)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
