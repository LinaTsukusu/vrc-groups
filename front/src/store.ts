import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state: Store = {
  user: null,
  userData: null,
}


export default new Vuex.Store({
  state,

  mutations: {
    setUser(self, user: typeof state.user) {
      self.user = user
    },

    setUserData(self, userData: typeof state.userData) {
      self.userData = userData
    },
  },
  actions: {

  },

  getters: {
    userId(self) {
      return self.user && self.user.uid || ''
    },
  },
})
