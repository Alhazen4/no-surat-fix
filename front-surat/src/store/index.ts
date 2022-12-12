import Vue from 'vue'
import Vuex from 'vuex'
import route from '../router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null,
    role: null,
    saturdayCheck: false,
    cadanganUpdated: false,
    noSuratCadanganPrev: [],
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setRole(state, role) {
      state.role = role
    },
    setSaturdayCheck(state, status) {
      state.saturdayCheck = status
    },
    setCadanganUpdated(state, status) {
      state.cadanganUpdated = status
      console.log(state.cadanganUpdated);
    },
    setNoSuratCadanganPrev(state, array) {
      state.noSuratCadanganPrev = array
      console.log(state.noSuratCadanganPrev);
    },
    logout(state) {
      state.id = null
      state.role = null
      state.saturdayCheck = false
      state.cadanganUpdated = false
      route.push('/')
    }
  },
  actions: {
    setIdAction({ commit }, payload) {
      commit('setId', payload)
    },
    setRoleAction({ commit }, payload) {
      commit('setRole', payload)
    },
    setSaturdayCheckAction({ commit }, payload) {
      commit('setSaturdayCheck', payload)
    },
    setCadanganUpdatedAction({ commit }, payload) {
      commit('setCadanganUpdated', payload)
    },
    setNoCadanganPrev({ commit }, payload) {
      commit('setNoSuratCadanganPrev', payload)
    },
    logoutAction({ commit }) {
      commit('logout')
    }
  },
  plugins: [createPersistedState()],
})
