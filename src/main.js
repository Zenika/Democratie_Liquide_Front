// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/router'
import store from './store/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

Vue.filter('pluralize', (value, label) => value + ' ' + (value <= 1 ? label : label.split(' ').map(word => word + 's').join(' ')))

Vue.filter('mailToName', value => value.split('@zenika.com')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
