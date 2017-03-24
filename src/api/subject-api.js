import api from '@/config/api'
import store from '@/store/index'

export const submitVote = (subjectId, choices) => api.put('api/votes/' + subjectId, { choices }).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => response)
)

export const getSubject = (subjectId) => api.get('api/subjects/' + subjectId)

export const getSubjects = () => api.get('api/subjects')

export const delegateSubject = (subjectId, delegation) => api.put('api/powers/subjects/' + subjectId, { collaboratorIdTo: delegation }).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => response)
)

export const removeSubjectDelegation = subjectId => api.delete('api/powers/subjects/' + subjectId).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => response)
)

export const replaceSubjectDelegation = (subjectId, delegation) => api.delete('api/powers/subjects/' + subjectId).then(response =>
    api.put('api/powers/subjects/' + subjectId, { collaboratorIdTo: delegation })
  ).then(response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => response)
)

export const createSubject = subject => api.post('api/subjects', subject).then(
  response => {
    response.subjectId = response.headers.location.split('/').pop()
    return store.dispatch('refreshSubjects')
      .then(() => response)
  }
)

export const deleteSubject = subjectId => api.delete('api/subjects/' + subjectId).then(
  response => store.dispatch('refreshSubjects').then(() => response)
)
