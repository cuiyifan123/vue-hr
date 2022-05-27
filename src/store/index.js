import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
import modules from './autoModules'
const store = new Vuex.Store({
  modules,
  getters
})

export default store
