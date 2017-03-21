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

