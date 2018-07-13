import wording from '@/config/wording'
import { getChannels } from '@/api/channel-api'

export const initialState = {
  // list of all available channels
  channels: []
}

export const getters = {
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
        !channel.collaborators.find(collaborator => collaborator.email === state.collaborator.email)
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
}

export const types = {
  REFRESH_CHANNELS: 'REFRESH_CHANNELS'
}

export const actions = {
  refreshChannels: ({ commit }) => {
    return getChannels().then(({ data }) => commit(types.REFRESH_CHANNELS, data))
  }
}

export const mutations = {
  [types.REFRESH_CHANNELS](state, channels) {
    state.channels = channels
  }
}
