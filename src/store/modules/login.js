import { login } from '../../api'
import * as types from '../types'

// initial state
const state = {
  username: '',
  session: ''
}

// getters
const getters = {
  login_session: state => state.session
}

// actions
const actions = {
  loginHandler ({ commit, router }, payload) {
    return new Promise((resolve, reject) => {
      login(payload.username, payload.password).then((loginedUser) => {
        commit(types.LOGIN_SUCCESS, { loginedUser })
        resolve()
      }, (errMsg) => {
        commit(types.LOGIN_FAILURE)
        reject(errMsg)
      })
    })
  }
}

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state, { loginedUser }) {
    state.session = loginedUser._sessionToken
    state.username = loginedUser.attributes.username
  },

  [types.LOGIN_FAILURE] (state) {
    state.session = ''
    state.username = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
