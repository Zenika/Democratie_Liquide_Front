import api from '../config/api'
import * as types from './types'
import router from '../config/router'

export function refreshCollaborator ({commit}) {
  return api.get('api/collaborator/me').then(({data}) => {
    commit(types.REFRESH_COLLABORATOR, data)
  })
}

export function refreshSubjects ({commit}) {
  return api.get('api/subjects').then(({data}) => {
    commit(types.REFRESH_SUBJECTS, data)
  })
}

export function refreshCategories ({commit}) {
  return api.get('api/categories').then(({data}) => {
    commit(types.REFRESH_CATEGORIES, data)
  })
}

export function refreshChannels ({commit}) {
  return api.get('api/channels').then(({data}) => {
    commit(types.REFRESH_CHANNELS, data)
  })
}

export function filterCategory ({commit}, category) {
  commit(types.FILTER_CATEGORY, category)
}

export function filterChannel ({commit}, channel) {
  commit(types.FILTER_CHANNEL, channel)
}

export function login ({dispatch}, form) {
  let formData = new FormData()
  formData.append('email', form.email)
  formData.append('password', form.password)
  return api.post('signin/form', formData).then(() => {
    return dispatch('refreshCollaborator')
  }).then(() => {
    router.push('/')
  })
}

export function loginWithGoogle ({dispatch}) {
  return api.post('signin/google').then(() => {
    return dispatch('refreshCollaborator')
  }).then(() => {
    router.push('/')
  })
}
