import { queryAll, getTotalPage, deleteItem, updateItem } from '../../api'
import * as types from '../types'
import { formateDate } from '../../tools'

// initial state
const state = {
  tableData: {},
  currentTable: [],
  total: 0,
  page: 1,
  UI: {
    showUpdate: false,
    showDetail: false
  }
}

// getters
const getters = {

}

// actions
const actions = {

  getTotal ({ commit, state }, payload) {
    if (!(payload && !payload.resize && state.tableData['page' + payload.page])) {
      getTotalPage(payload).then((count) => {
        commit(types.TOTALPAGE_SUCCESS, { count })
      }, (errMsg) => {
        commit(types.TOTALPAGE_FAILURE)
      })
    }
  },

  getList ({ dispatch, commit, state }, payload) {
    dispatch('getTotal', payload)
    if (payload && !payload.resize && state.tableData['page' + payload.page]) {
      commit(types.LIST_CACHE, { payload })
    } else {
      queryAll(payload).then((result) => {
        result.map((item) => {
          item.date = formateDate(item.get('date'))
          item.items = item.get('items')
          item.total = item.get('total')
        })
        if (payload.resize) {
          commit(types.LIST_RESIZE, { result, payload })
        } else {
          commit(types.LIST_SUCCESS, { result, payload })
        }
      }, (errMsg) => {
        commit(types.LIST_FAILURE, { payload })
      })
    }
  },

  deleteAction ({ dispath, commit, state }, index) {
    let objId = state.currentTable[index].id
    console.log(objId)
    return new Promise((resolve, reject) => {
      deleteItem(objId).then(() => {
        resolve()
      }, () => {
        reject()
      })
    })
  },
  updateAction ({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      updateItem(payload.id, payload.form).then(() => {
        resolve()
      }, () => {
        reject()
      })
    })
  },
  updateUIAction ({ commit }) {
    commit(types.UPDATEUI_TOGGLE)
  }
}

// mutations
const mutations = {
  [types.TOTALPAGE_SUCCESS] (state, { count }) {
    state.total = count
  },

  [types.TOTALPAGE_FAILURE] (state) {
    state.total = 0
  },

  [types.LIST_SUCCESS] (state, { result, payload }) {
    state.page = payload.page
    state.tableData['page' + payload.page] = result
    state.currentTable = result
  },

  // 分页查询cache
  [types.LIST_CACHE] (state, { payload }) {
    state.currentTable = state.tableData['page' + payload.page]
    state.page = payload.page
  },

  // 搜索，增删改后重置列表，回到第一页
  [types.LIST_RESIZE] (state, { result, payload }) {
    state.page = 0
    state.tableData = {'page1': result}
    state.currentTable = result
  },

  [types.LIST_FAILURE] (state, { payload }) {
    if (payload && payload.page) {
      state.tableData['page' + payload.page] = []
      state.currentTable = state.tableData['page1']
    } else {
      state.tableData = {'page1': []}
      state.currentTable = []
      state.page = payload.page
    }
  },
  // UI 相关
  [types.UPDATEUI_TOGGLE] (state) {
    state.UI.showUpdate = !state.UI.showUpdate
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
