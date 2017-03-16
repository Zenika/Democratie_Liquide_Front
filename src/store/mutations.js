import * as types from './types'

export const initialState = {
  subjects: [],
  categories: [],
  channels: [],
  collaborator: {},
  filter: {}
}

export default {
  [types.REFRESH_COLLABORATOR] (state, collaborator) {
    state.collaborator = collaborator
  },

  [types.REFRESH_SUBJECTS] (state, subjects) {
    state.subjects = subjects
  },

  [types.REFRESH_CATEGORIES] (state, categories) {
    state.categories = categories
  },

  [types.REFRESH_CHANNELS] (state, channels) {
    state.channels = channels
  },

  [types.FILTER_CATEGORY] (state, category) {
    state.filter = {
      ...state.filter,
      category
    }
  },

  [types.FILTER_CHANNEL] (state, channel) {
    state.filter = {
      ...state.filter,
      channel
    }
  }

}
