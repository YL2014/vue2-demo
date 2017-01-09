import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'

import login from './modules/login'
import home from './modules/home'
import types from './modules/types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    login,
    home,
    types
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
})
