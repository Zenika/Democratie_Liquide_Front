import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions, getters } from './partials'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  mutations,
  actions,
  getters,
  state
})
