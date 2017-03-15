import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import Login from '@/containers/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
