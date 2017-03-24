import axios from 'axios'
import { goToLogin } from './router'

const api = axios.create()

api.defaults.headers.credentials = 'include'

api.interceptors.response.use(
  response => {
    // console.log('RESPONSE', response)
    return new Promise(resolve => setTimeout(() => resolve(response), 100))
    // return response
  },

  error => {
    // console.log('ERROR', error)
    if (error.response.status === 403) {
      goToLogin()
    }
    return Promise.reject(error)
  }
)

export default api
