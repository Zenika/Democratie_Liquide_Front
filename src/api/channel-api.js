import api from '@/config/api'
import store from '@/store/index'

export const getChannels = () => api.get('api/channels')

export const createChannel = channel => api.post('api/channels', channel).then(
  (response) => {
    store.dispatch('refreshChannels')
    return response
  }
)

