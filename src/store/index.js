import Vue from 'vue'
import Vuex from 'vuex'
import {
  filter,
  channel,
  subject,
  categorie,
  collaborator,
  notification
} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    filter,
    channel,
    subject,
    categorie,
    collaborator,
    notification
  }
})
