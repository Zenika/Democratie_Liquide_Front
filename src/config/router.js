import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import SubjectView from '@/containers/SubjectView'
import Login from '@/containers/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/subject/:subjectId',
      name: 'SubjectView',
      component: SubjectView,
      props: true
    }
  ]
})
