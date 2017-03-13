import axios from 'axios'
import router from './router'

export const signin = axios.create({
  baseURL: 'http://localhost:8080/signin'
})

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true
})

api.interceptors.response.use(
  response => {
    return response
  },

  error => {
    if (error.response.status === 403) {
      router.push('/login')
    }
    return error
  }
)
