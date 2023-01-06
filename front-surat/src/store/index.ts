import Vue from 'vue'
import Vuex from 'vuex'
import route from '../router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null,
    role: null,
    witel: null,
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
    setWitel(state, witel) {
      state.witel = witel
    },
    setSaturdayCheck(state, status) {
      state.saturdayCheck = status
    },
    setCadanganUpdated(state, status) {
      state.cadanganUpdated = status
    },
    setNoSuratCadanganPrev(state, array) {
      state.noSuratCadanganPrev = array
    },
    logout(state) {
      state.id = null
      state.role = null
      state.witel = null
      // state.saturdayCheck = false
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
    setWitelAction({ commit }, payload) {
      commit('setWitel', payload)
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
