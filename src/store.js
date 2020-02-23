import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const login = {
  namespaced: true,
  state: {
    list: [],
    detail:{}
  },
  mutations: {
    increment(state,payload) {
      state.list.push(payload)
    }
  },
  actions: {
    addIncrement({commit},payload) {
      commit('increment',payload)
    }
  },
  getters: {

  }
}

const workbench = {
  namespaced: true,
  state: {
    data:{},
    list: [],
    detail:{}
  },
  mutations: {
    increment(state,payload) {
      state.list.push(payload)
    }
  },
  actions: {
    addIncrement({commit},payload) {
      commit('increment',payload)
    }
  },
  getters: {

  }
}

const approval_center = {
  namespaced: true,
  state: {
    tabs: {}
  },
  mutations: {
    increment(state, payload) {
      state.list = payload;
    }
  },
  actions: {
    addIncrement({ commit }, payload) {
      commit('increment',payload)
    }
  },
  getters: {

  },
  modules: {
    detail: {
      namespaced: true,
      state: {
        detail: []
      },
      mutations: {
        increment(state, payload) {
          state.detail = payload;
        }
      },
      actions: {
        addIncrement({ commit }, payload) {
          commit('increment',payload)
        }
      }
    }
  }
}

const INVOICE_VERIFY = {
  namespaced: true,
  state: {
    list: [],
    detail:{}
  },
  mutations: {
    increment(state,payload) {
      state.list.push(payload)
    }
  },
  actions: {
    addIncrement({commit},payload) {
      commit('increment',payload)
    }
  },
  getters: {

  }
}

export default new Vuex.Store({
  modules: {
    workbench,
    approval_center,
    INVOICE_VERIFY,
    login,
  }
})
