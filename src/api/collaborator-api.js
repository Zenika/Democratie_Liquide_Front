import api from '@/config/api'

export const getCollaborator = () => api.get('api/collaborators/me')

export const getCollaborators = () => api.get('api/collaborators')
