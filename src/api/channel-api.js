import api from '@/config/api'
import store from '@/store/index'

export const getChannels = () => api.get('api/channels')

export const joinChannel = channelId => api.get(`api/channels/${channelId}/join`).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => store.dispatch('filterChannel', store.getters.channels.find(c => c.uuid === channelId)))
    .then(() => response)
)

export const quitChannel = channelId => api.get(`api/channels/${channelId}/quit`).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => response)
)

export const createChannel = channel => api.post('api/channels', channel).then(
  (response) => store.dispatch('refreshChannels')
    .then(() => store.dispatch('filterChannel', store.getters.channels.find(c => c.title === channel.title)))
    .then(() => response)
)
