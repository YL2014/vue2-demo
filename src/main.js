// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/style/_base.scss'

Vue.use(ElementUI)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
