import api from '@/config/api'
import store from '@/store/index'
import Vue from 'vue'

export const submitVote = (subjectId, choices) => api.put('api/votes/' + subjectId, { choices }).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Bien joué !',
      message: 'Votre vote est pris en compte !',
      type: 'success'
    })
    return response
  })
)

export const getSubject = (subjectId) => api.get('api/subjects/' + subjectId)

export const getSubjects = () => api.get('api/subjects')

export const delegateSubject = (subjectId, delegation) => api.put('api/powers/subjects/' + subjectId, { collaboratorIdTo: delegation }).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Nouvelle délégation !',
      message: Vue.filter('mailToName')(delegation) + ' votera à votre place.',
      type: 'info'
    })
    return response
  })
)

export const removeSubjectDelegation = subjectId => api.delete('api/powers/subjects/' + subjectId).then(
  response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Délégation supprimée !',
      message: 'À vous de voter maintenant !',
      type: 'info'
    })
    return response
  })
)

export const replaceSubjectDelegation = (subjectId, delegation) => api.delete('api/powers/subjects/' + subjectId).then(response =>
    api.put('api/powers/subjects/' + subjectId, { collaboratorIdTo: delegation })
  ).then(response => Promise.all([
    store.dispatch('refreshSubjects'),
    store.dispatch('refreshCurrentSubject', subjectId)
  ]).then(() => {
    store.dispatch('notify', {
      title: 'Nouvelle délégation !',
      message: Vue.filter('mailToName')(delegation) + ' votera à votre place.',
      type: 'info'
    })
    return response
  })
)

export const createSubject = subject => api.post('api/subjects', subject).then(
  response => {
    response.subjectId = response.headers.location.split('/').pop()
    store.dispatch('notify', {
      title: 'Bien joué !',
      message: 'Votre sujet est en ligne !',
      type: 'success'
    })
    return store.dispatch('refreshSubjects')
      .then(() => response)
  }
)

export const deleteSubject = subjectId => api.delete('api/subjects/' + subjectId).then(
  response => {
    store.dispatch('notify', {
      title: 'Bye bye !',
      message: 'Votre sujet a bien été supprimé !',
      type: 'success'
    })
    return store.dispatch('refreshSubjects').then(() => response)
  }
)
