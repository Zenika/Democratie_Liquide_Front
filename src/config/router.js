import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import SubjectView from '@/containers/SubjectView'
import DelegationView from '@/containers/DelegationView'
import SubjectCreation from '@/containers/SubjectCreation'
import SubjectDeletion from '@/containers/SubjectDeletion'
import CategoryCreation from '@/containers/CategoryCreation'
import ChannelCreation from '@/containers/ChannelCreation'
import ChannelsView from '@/containers/ChannelsView'
import Login from '@/containers/Login'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/',
      name: 'Home',
      component: Home,
      props: {
        modal: {}
      }
    },

    {
      path: '/subject/view/:subjectId',
      component: Home,
      props: route => ({
        modal: {
          title: 'Vote',
          component: SubjectView
        }
      })
    },

    {
      path: '/subject/delegate/:subjectId',
      component: Home,
      props: route => ({
        modal: {
          title: 'Délégation d\'un sujet',
          component: DelegationView
        }
      })
    },

    {
      path: '/category/delegate/:categoryId',
      component: Home,
      props: route => ({
        modal: {
          title: 'Délégation d\'une catégorie',
          component: DelegationView,
          props: {
            isCategory: true
          }
        }
      })
    },

    {
      path: '/subject/create',
      component: Home,
      props: route => ({
        modal: {
          title: 'Création d\'un sujet',
          component: SubjectCreation
        }
      })
    },

    {
      path: '/subject/delete/:subjectId',
      component: Home,
      props: route => ({
        modal: {
          title: 'Suppression d\'un sujet',
          component: SubjectDeletion
        }
      })
    },

    {
      path: '/category/create',
      component: Home,
      props: route => ({
        modal: {
          title: 'Création d\'une catégorie',
          component: CategoryCreation
        }
      })
    },

    {
      path: '/channel/create',
      component: Home,
      props: route => ({
        modal: {
          title: 'Création d\'un channel',
          component: ChannelCreation
        }
      })
    },

    {
      path: '/channel/list',
      component: Home,
      props: route => ({
        modal: {
          title: 'Rejoindre ou quitter un channel',
          component: ChannelsView
        }
      })
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

// refresh current subject before each route containing 'subjectId' param
router.beforeEach((to, from, next) => to.params.subjectId ? store.dispatch('refreshCurrentSubject', to.params.subjectId).then(next) : next())

// refresh current category before each route containing 'categoryId' param
router.beforeEach((to, from, next) => to.params.categoryId ? store.dispatch('refreshCurrentCategory', to.params.categoryId).then(next) : next())

export default router

export const goHome = () => router.push('/')
export const goToLogin = () => router.push('/login')
export const goToSubject = subjectId => router.push('/subject/view/' + subjectId)
