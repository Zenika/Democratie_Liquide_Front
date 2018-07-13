import { getCollaborator, getCollaborators } from '@/api/collaborator-api'
import { authenticate, authenticateWithGoogle } from '@/api/auth-api'
import { goHome, goToLogin } from '@/config/router'

export const initialState = {
  // current user data
  collaborator: {}
}

export const getters = {
  collaborator: state => state.collaborator,

  collaborators: state => state.collaborators
}

export const types = {
  REFRESH_COLLABORATOR: 'REFRESH_COLLABORATOR',
  REFRESH_COLLABORATORS: 'REFRESH_COLLABORATORS'
}

export const actions = {
  refreshCollaborator: ({ commit }) => {
    return getCollaborator().then(({ data }) => commit(types.REFRESH_COLLABORATOR, data))
  },

  refreshCollaborators: ({ commit }) => {
    return getCollaborators().then(({ data }) => commit(types.REFRESH_COLLABORATORS, data))
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
}

export const mutations = {
  [types.REFRESH_COLLABORATOR](state, collaborator) {
    state.collaborator = collaborator
  },

  [types.REFRESH_COLLABORATORS](state, collaborators) {
    state.collaborators = collaborators
  }
}
