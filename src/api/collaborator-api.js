import api from '@/config/api'

export const getCollaborator = () => api.get('api/collaborator/me')
