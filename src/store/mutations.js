import * as types from './types'
import Vue from 'vue'

export const initialState = {
  // list of all available subjects
  subjects: [],

  // list of all available categories
  categories: [],

  // list of all available channels
  channels: [],

  // current user data
  collaborator: {},

  // current selected filter
  filter: {},

  // last fetched subject
  currentSubject: {},

  // last fetched category
  currentCategory: {},

  // the currently displayed notifications
  notifications: []
}

export default {
  [types.REFRESH_COLLABORATOR] (state, collaborator) {
    state.collaborator = collaborator
  },

  [types.REFRESH_COLLABORATORS] (state, collaborators) {
    state.collaborators = collaborators
  },

  [types.REFRESH_SUBJECTS] (state, subjects) {
    state.subjects = subjects
  },

  [types.REFRESH_CURRENT_SUBJECT] (state, subject) {
    state.currentSubject = subject
  },

  [types.REFRESH_CURRENT_CATEGORY] (state, category) {
    state.currentCategory = category
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
  },

  [types.FILTER_SUBJECT_TYPE] (state, subjectType) {
    state.filter = {
      ...state.filter,
      subjectType
    }
  },

  [types.REMOVE_FILTER] (state) {
    state.filter = {}
  },

  [types.SHOW_NOTIFICATION] (state, notification) {
    notification.visible = true
    state.notifications = [
      ...state.notifications,
      notification
    ]
  },

  [types.HIDE_NOTIFICATION] (state, notification) {
    let index = state.notifications.indexOf(notification)
    if (index !== -1) {
      Vue.set(state.notifications, index, {
        ...state.notifications[index],
        visible: false
      })
    }
  }

}
