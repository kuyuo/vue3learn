import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  mutations: {

    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login ({ commit }, userinfo) {
      return new Promise((resolve, reject) => {
        loginApi(userinfo).then(res => {
          commit('setToken', res.token)
          setTokenTime() // 设置token获取时间
          router.replace('/') // 跳转首页
          resolve()
        }).catch(err => reject(err))
      })
    },
    // 退出
    logout ({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
