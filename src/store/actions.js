import { signin, api } from '../axios'
import * as types from './types'
import router from '../router'

export function refreshSubjects ({commit}) {
  return api.get('/subjects').then(({data}) => {
    commit(types.REFRESH_SUBJECTS, data)
  })
}

export function refreshCollaborator ({commit}) {
  return api.get('/collaborator/me').then(({data}) => {
    commit(types.REFRESH_COLLABORATOR, data)
  })
}

export function login ({dispatch}, form) {
  let formData = new FormData()
  formData.append('email', form.email)
  formData.append('password', form.password)
  signin.post('/form', formData).then(() => {
    return dispatch('refreshCollaborator')
  }).then(() => {
    router.push('/')
  })
}
