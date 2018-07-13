import { subjectTypes } from '@/config/constants'

export const initialState = {
  // current selected filter
  filter: {}
}

export const getters = {
  filter: (state, getters) => {
    return {
      channel:
        getters.joinedChannels.find(channel => channel === state.filter.channel) ||
        getters.defaultChannel,
      category: state.filter.category || getters.defaultCategory,
      subjectType: state.filter.subjectType || subjectTypes[0]
    }
  }
}

export const types = {
  FILTER_CATEGORY: 'FILTER_CATEGORY',
  FILTER_CHANNEL: 'FILTER_CHANNEL',
  FILTER_SUBJECT_TYPE: 'FILTER_SUBJECT_TYPE',
  REMOVE_FILTER: 'REMOVE_FILTER'
}

export const actions = {
  filterCategory: ({ commit }, category) => {
    return category ? commit(types.FILTER_CATEGORY, category) : null
  },

  filterChannel: ({ commit }, channel) => {
    return channel ? commit(types.FILTER_CHANNEL, channel) : null
  },

  filterSubjectType: ({ commit }, subjectType) => {
    return subjectType ? commit(types.FILTER_SUBJECT_TYPE, subjectType) : null
  },

  removeFilter: ({ commit }) => {
    return commit(types.REMOVE_FILTER)
  }
}

export const mutations = {
  [types.FILTER_CATEGORY](state, category) {
    state.filter = {
      ...state.filter,
      category
    }
  },

  [types.FILTER_CHANNEL](state, channel) {
    state.filter = {
      ...state.filter,
      channel
    }
  },

  [types.FILTER_SUBJECT_TYPE](state, subjectType) {
    state.filter = {
      ...state.filter,
      subjectType
    }
  },

  [types.REMOVE_FILTER](state) {
    state.filter = {}
  }
}
