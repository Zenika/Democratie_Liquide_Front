import axios from 'axios'
import { goToLogin } from './router'
import store from '@/store/index'

const api = axios.create()

api.defaults.headers.credentials = 'include'

api.interceptors.response.use(
  response => {
    // console.log('RESPONSE', response)
    // return new Promise(resolve => setTimeout(() => resolve(response), 100))
    return response
  },

  (error) => {
    // console.log('ERROR', error)
    if (error.response.status === 403) {
      goToLogin()
    }

    store.dispatch('notify', {
      title: error.response.statusText,
      message: error.response.data.message,
      type: 'error'
    })

    return Promise.reject(error)
  }
)

export default api
