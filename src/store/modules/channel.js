import wording from '@/config/wording'
import { getChannels } from '@/api/channel-api'

export default {
  state: {
    // list of all available channels
    channels: []
  },
  getters: {
    joinedChannels: (state, getters) =>
      getters.channels.filter(
        channel =>
          !channel.collaborators ||
          !!channel.collaborators.find(
            collaborator => collaborator.email === state.collaborator.email
          )
      ),

    unjoinedChannels: (state, getters) =>
      getters.channels.filter(
        channel =>
          !channel.collaborators.find(
            collaborator => collaborator.email === state.collaborator.email
          )
      ),

    defaultChannel: (state, getters) => {
      return {
        title: wording.defaultChannel
      }
    },

    channelCheck: (state, getters) => subject =>
      (!getters.filter.channel.uuid && !subject.channel) ||
      (subject.channel &&
        getters.filter.channel &&
        getters.filter.channel.uuid === subject.channel.uuid),

    channels: (state, getters) => [getters.defaultChannel, ...state.channels]
  },
  actions: {
    refreshChannels: ({ commit }) => {
      return getChannels().then(({ data }) => commit('REFRESH_CHANNELS', data))
    }
  },
  mutations: {
    REFRESH_CHANNELS: (state, channels) => {
      state.channels = channels
    }
  }
}
