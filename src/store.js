import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainFolder: null
  },
  mutations: {
    setMainFolder(state, mainFolder) {
      state.mainFolder = mainFolder;
    }
  },
  actions: {

  }
})
