import { constantRoutes } from '@/router'

const state = {
  menus: [...constantRoutes]
}

const mutations = {
  setMenus(state, asyncRoutes) {
    state.menus = [...constantRoutes, ...asyncRoutes]
  },
  resetMenus() {
    state.menus = [...constantRoutes]
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
