import api from '@/config/api'

export const submitVote = (subjectId, choices) => api.put('api/votes/' + subjectId, { choices })

export const getSubject = (subjectId) => api.get('api/subjects/' + subjectId)

export const getSubjects = () => api.get('api/subjects')

