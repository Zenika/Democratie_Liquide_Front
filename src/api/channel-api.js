import api from '@/config/api'
import store from '@/store/index'

export const getChannels = () => api.get('api/channels')

export const joinChannel = channelId => api.get(`api/channels/${channelId}/join`).then(
  (response) => {
    store.dispatch('refreshChannels')
    return response
  }
)

export const quitChannel = channelId => api.get(`api/channels/${channelId}/quit`).then(
  (response) => {
    store.dispatch('refreshChannels')
    return response
  }
)

export const createChannel = channel => api.post('api/channels', channel).then(
  (response) => {
    store.dispatch('refreshChannels')
    return response
  }
)

