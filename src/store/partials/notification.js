import Vue from 'vue'

export const initialState = {
  // the currently displayed notifications
  notifications: []
}

export const getters = {
  notifications: state => state.notifications
}

export const types = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION'
}

export const actions = {
  showNotification: ({ commit }, notification) => {
    return commit(types.SHOW_NOTIFICATION, notification)
  },

  hideNotification: ({ commit }, notification) => {
    return commit(types.HIDE_NOTIFICATION, notification)
  },

  keepNotification: ({ commit }, notification) => {
    clearTimeout(notification.timeout)
  },

  hideNotificationAfterDelay: ({ dispatch }, notification) => {
    return new Promise((resolve, reject) => {
      notification.timeout = setTimeout(resolve, 3000)
    }).then(() => dispatch('hideNotification', notification))
  },

  notify: ({ dispatch }, notification) => {
    return dispatch('showNotification', notification).then(() =>
      dispatch('hideNotificationAfterDelay', notification)
    )
  }
}

export const mutations = {
  [types.SHOW_NOTIFICATION](state, notification) {
    notification.visible = true
    state.notifications = [...state.notifications, notification]
  },

  [types.HIDE_NOTIFICATION](state, notification) {
    let index = state.notifications.indexOf(notification)
    if (index !== -1) {
      Vue.set(state.notifications, index, {
        ...state.notifications[index],
        visible: false
      })
    }
  }
}
