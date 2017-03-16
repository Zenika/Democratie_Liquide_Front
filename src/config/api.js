import axios from 'axios'
import router from './router'

const api = axios.create()

api.defaults.headers.credentials = 'include'

api.interceptors.response.use(
  response => {
    // console.log('RESPONSE', response)
    return response
  },

  error => {
    // console.log('ERROR', error)
    if (error.response.status === 403) {
      router.push('/login')
    }
    return error
  }
)

export default api
