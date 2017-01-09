import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Count from '../views/Count.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

import AV from 'leancloud-storage'

Vue.use(Router)

const routes = [
  { path: '/home', component: Home, name: 'home' },
  { path: '/add', component: Add, name: 'add' },
  { path: '/count', component: Count, name: 'count' },
  { path: '/about', component: About, name: 'about' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/', redirect: '/home' }
]

const Route = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Route.beforeEach((to, from, next) => {
  let currentUser = AV.User.current()
  if (to.path !== '/login' && !currentUser) {
    next('/login')
  } else if (to.path === '/login' && currentUser) {
    next('/home')
  } else {
    next()
  }
})

export default Route
