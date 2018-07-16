import Vue from 'vue'

export default {
  state: {
    // the currently displayed notifications
    notifications: []
  },
  getters: {
    notifications: state => state.notifications
  },
  actions: {
    showNotification: ({ commit }, notification) => {
      return commit('SHOW_NOTIFICATION', notification)
    },

    hideNotification: ({ commit }, notification) => {
      return commit('HIDE_NOTIFICATION', notification)
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
  },
  mutations: {
    SHOW_NOTIFICATION: (state, notification) => {
      notification.visible = true
      state.notifications = [...state.notifications, notification]
    },

    HIDE_NOTIFICATION: (state, notification) => {
      let index = state.notifications.indexOf(notification)
      if (index !== -1) {
        Vue.set(state.notifications, index, {
          ...state.notifications[index],
          visible: false
        })
      }
    }
  }
}
