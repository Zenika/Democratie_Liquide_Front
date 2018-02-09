import api from '@/config/api'
import store from '@/store/index'
import Vue from 'vue'

export const getCategories = () => api.get('api/categories')

export const getCategory = (categoryId) => api.get('api/categories/' + categoryId)

export const delegateCategory = (categoryId, delegation) => api.put('api/powers/categories/' + categoryId, { collaboratorIdTo: delegation }).then(
  response => Promise.all([
    store.dispatch('refreshCategories'),
    store.dispatch('refreshCurrentCategory', categoryId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Nouvelle délégation !',
      message: Vue.filter('mailToName')(delegation) + ' votera à votre place.',
      type: 'info'
    })
    return response
  })
)

export const removeCategoryDelegation = categoryId => api.delete('api/powers/categories/' + categoryId).then(
  response => Promise.all([
    store.dispatch('refreshCategories'),
    store.dispatch('refreshCurrentCategory', categoryId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Délégation supprimée !',
      message: 'Vous pouvez de nouveau voter !',
      type: 'info'
    })
    return response
  })
)

export const replaceCategoryDelegation = (categoryId, delegation) => api.delete('api/powers/categories/' + categoryId).then(response =>
    api.put('api/powers/categories/' + categoryId, { collaboratorIdTo: delegation })
  ).then(response => Promise.all([
    store.dispatch('refreshCategories'),
    store.dispatch('refreshCurrentCategory', categoryId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Nouvelle délégation !',
      message: Vue.filter('mailToName')(delegation) + ' votera à votre place.',
      type: 'info'
    })
    return response
  })
)

export const createCategory = category => api.post('api/categories', category).then(
  response => {
    store.dispatch('notify', {
      title: 'Bien joué !',
      message: 'Votre catégorie est en ligne !',
      type: 'success'
    })
    return store.dispatch('refreshCategories').then(() => response)
  }
)
