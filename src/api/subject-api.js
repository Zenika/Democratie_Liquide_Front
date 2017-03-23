import api from '@/config/api'
import store from '@/store/index'

export const submitVote = (subjectId, choices) => api.put('api/votes/' + subjectId, { choices }).then(
  (response) => {
    store.dispatch('refreshSubjects')
    return response
  }
)

export const getSubject = (subjectId) => api.get('api/subjects/' + subjectId)

export const getSubjects = () => api.get('api/subjects')

export const delegateSubject = (subjectId, delegation) => api.put('api/powers/subjects/' + subjectId, { collaboratorIdTo: delegation }).then(
  (response) => {
    return response
  }
)

export const removeSubjectDelegation = subjectId => api.delete('api/powers/subjects/' + subjectId).then(
  (response) => {
    return response
  }
)

export const createSubject = subject => api.post('api/subjects', subject).then(
  (response) => {
    store.dispatch('refreshSubjects')
    return response
  }
)
