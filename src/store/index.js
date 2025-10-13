import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 临时的用户角色，用于测试
    // roles: ['admin']
  },
  getters: {
    // 定义 roles getter
    // roles: state => state.roles
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
