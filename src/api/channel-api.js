import api from '@/config/api'
import store from '@/store/index'

export const getChannels = () => api.get('api/channels')

export const joinChannel = channelId => api.get(`api/channels/${channelId}/join`).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => store.dispatch('filterChannel', store.getters.channels.find(c => c.uuid === channelId)))
    .then(() => {
      store.dispatch('notify', {
        title: 'Welcome in!',
        message: 'Bienvenue dans votre nouveau channel !',
        type: 'info'
      })
      return response
    })
)

export const quitChannel = channelId => api.get(`api/channels/${channelId}/quit`).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => {
      store.dispatch('notify', {
        title: 'Bye bye!',
        message: 'Vos amis vous regrettent déjà !',
        type: 'info'
      })
      return response
    })
)

export const createChannel = channel => api.post('api/channels', channel).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => {
      store.dispatch('notify', {
        title: 'Bien joué !',
        message: 'Votre channel est en ligne !',
        type: 'success'
      })
      return response
    })
)
