// import shop from '../../api'
import * as types from '../types'

// initial state
// shape: [{ id, quantity }]
const state = {
  types: [
        { name: '分类1', val: '1' },
        { name: '分类2', val: '2' },
        { name: '分类3', val: '3' },
        { name: '分类4', val: '4' },
        { name: '分类5', val: '5' }]
}

// getters
const getters = {

}

// actions
const actions = {
  setTypes ({ commit, state }, payload) {
    commit(types.TYPES_SUCCESS)
  },
  changeType ({ commit, state }, payload) {
    commit(types.TYPES_CHANGE)
  }
}

// mutations
const mutations = {
  [types.TYPES_SUCCESS] (state) {
    state.types = [
        { name: '分类1', val: '1' },
        { name: '分类2', val: '2' },
        { name: '分类3', val: '3' },
        { name: '分类4', val: '4' },
        { name: '分类5', val: '5' }]
  },

  [types.TYPES_CHANGE] (state) {

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
