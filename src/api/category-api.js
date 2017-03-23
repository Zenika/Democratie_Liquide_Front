import api from '@/config/api'
import store from '@/store/index'

export const getCategories = () => api.get('api/categories')

export const getCategory = (categoryId) => api.get('api/categories/' + categoryId)

export const delegateCategory = (categoryId, delegation) => api.put('api/powers/categories/' + categoryId, { collaboratorIdTo: delegation }).then(
  (response) => {
    return response
  }
)

export const removeCategoryDelegation = categoryId => api.delete('api/powers/categories/' + categoryId).then(
  (response) => {
    return response
  }
)

export const createCategory = category => api.post('api/categories', category).then(
  (response) => {
    store.dispatch('refreshCategories')
    return response
  }
)
