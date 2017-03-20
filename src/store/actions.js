import { getCollaborator } from '@/api/collaborator-api'
import { getSubjects } from '@/api/subject-api'
import { getChannels } from '@/api/channel-api'
import { getCategories } from '@/api/category-api'
import { authenticate, authenticateWithGoogle } from '@/api/auth-api'
import { goHome } from '@/config/router'
import * as types from './types'

export function refreshCollaborator ({commit}) {
  return getCollaborator().then(({data}) => {
    commit(types.REFRESH_COLLABORATOR, data)
  })
}

export function refreshSubjects ({commit}) {
  return getSubjects().then(({data}) => {
    commit(types.REFRESH_SUBJECTS, data)
  })
}

export function refreshCategories ({commit}) {
  return getCategories().then(({data}) => {
    commit(types.REFRESH_CATEGORIES, data)
  })
}

export function refreshChannels ({commit}) {
  return getChannels().then(({data}) => {
    commit(types.REFRESH_CHANNELS, data)
  })
}

export function filterCategory ({commit}, category) {
  commit(types.FILTER_CATEGORY, category)
}

export function filterChannel ({commit}, channel) {
  commit(types.FILTER_CHANNEL, channel)
}

export function filterSubjectType ({commit}, subjectType) {
  commit(types.FILTER_SUBJECT_TYPE, subjectType)
}

export function login ({dispatch}, form) {
  authenticate(form).then(() => {
    return dispatch('refreshCollaborator')
  }).then(() => {
    goHome()
  })
}

export function loginWithGoogle ({dispatch}) {
  authenticateWithGoogle().then(() => {
    return dispatch('refreshCollaborator')
  }).then(() => {
    goHome()
  })
}
