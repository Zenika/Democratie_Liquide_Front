import { getCollaborator, getCollaborators } from '@/api/collaborator-api'
import { authenticate, authenticateWithGoogle } from '@/api/auth-api'
import { goHome, goToLogin } from '@/config/router'

export default {
  state: {
    // current user data
    collaborator: {}
  },
  getters: {
    collaborator: state => state.collaborator,

    collaborators: state => state.collaborators
  },
  actions: {
    refreshCollaborator: ({ commit }) => {
      return getCollaborator().then(({ data }) =>
        commit('REFRESH_COLLABORATOR', data)
      )
    },

    refreshCollaborators: ({ commit }) => {
      return getCollaborators().then(({ data }) =>
        commit('REFRESH_COLLABORATORS', data)
      )
    },

    login: ({ dispatch }, form) => {
      return authenticate(form)
        .then(() => dispatch('refreshCollaborator'))
        .then(() => goHome())
    },

    loginWithGoogle: ({ dispatch }) => {
      return authenticateWithGoogle()
        .then(() => dispatch('refreshCollaborator'))
        .then(() => goHome())
    },

    logout: ({ dispatch }) => {
      return dispatch('refreshCollaborator').then(() => goToLogin())
    }
  },
  mutations: {
    REFRESH_COLLABORATOR: (state, collaborator) => {
      state.collaborator = collaborator
    },

    REFRESH_COLLABORATORS: (state, collaborators) => {
      state.collaborators = collaborators
    }
  }
}
