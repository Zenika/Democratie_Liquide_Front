import api from '@/config/api'

export const authenticate = (form) => {
  let formData = new FormData()
  formData.append('email', form.email)
  formData.append('password', form.password)
  return api.post('signin/form', formData)
}

export const authenticateWithGoogle = () => {
  return api.post('signin/google')
}
