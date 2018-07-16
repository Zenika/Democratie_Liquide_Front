import { subjectTypes } from '@/config/constants'

export default {
  state: {
    // current selected filter
    filter: {}
  },
  getters: {
    filter: (state, getters) => {
      return {
        channel:
          getters.joinedChannels.find(
            channel => channel === state.filter.channel
          ) || getters.defaultChannel,
        category: state.filter.category || getters.defaultCategory,
        subjectType: state.filter.subjectType || subjectTypes[0]
      }
    }
  },
  actions: {
    filterCategory: ({ commit }, category) => {
      return category ? commit('FILTER_CATEGORY', category) : null
    },

    filterChannel: ({ commit }, channel) => {
      return channel ? commit('FILTER_CHANNEL', channel) : null
    },

    filterSubjectType: ({ commit }, subjectType) => {
      return subjectType ? commit('FILTER_SUBJECT_TYPE', subjectType) : null
    },

    removeFilter: ({ commit }) => {
      return commit('REMOVE_FILTER')
    }
  },
  mutations: {
    FILTER_CATEGORY: (state, category) => {
      state.filter = {
        ...state.filter,
        category
      }
    },

    FILTER_CHANNEL: (state, channel) => {
      state.filter = {
        ...state.filter,
        channel
      }
    },

    FILTER_SUBJECT_TYPE: (state, subjectType) => {
      state.filter = {
        ...state.filter,
        subjectType
      }
    },

    REMOVE_FILTER: state => {
      state.filter = {}
    }
  }
}
