import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import home from './home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: home }
]

const router = new VueRouter({
  routes // short for routes: routes
})

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})
