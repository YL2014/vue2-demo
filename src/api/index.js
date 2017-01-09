import AV from 'leancloud-storage'
import { APP_ID, APP_KEY } from './config.js'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

const Items = AV.Object.extend('Items')

export const login = (username, password) => {
  return AV.User.logIn(username, password)
}

// 添加
export const addOneItem = (form) => {
  let item = new Items()
  item.set('date', form.date)
  item.set('items', form.items)
  item.set('total', form.total)
  item.set('ower', AV.User.current())
  return item.save()
}

// 查询总页数
export const getTotalPage = (payload) => {
  let query = new AV.Query('Items')
  if (payload.date) {
    query.equalTo('date', payload.date) // 按日期查询
  }
  query.equalTo('ower', AV.User.current()) // 当前用户
  return query.count()
}

// 查询列表
export const queryAll = (payload) => {
  let query = new AV.Query('Items')
  // query.select('ower', 'items', 'total', 'date')
  if (payload && payload.date) {
    query.equalTo('date', payload.date) // 按日期查询
  }
  query.equalTo('ower', AV.User.current()) // 当前用户
  query.descending('date') // 降序
  query.limit(10) // 每页10条
  if (payload && payload.page) {
    query.skip((payload.page - 1) * 10) // 分页
  }
  return query.find()
}

// 根据ObjectId查找，暂时不用，数据已存在state里
export const findItem = (id) => {
  let currentItem = AV.Object.createWithoutData('Items', id)
  return currentItem.fetch()
}

// 根据ObjectId更新
export const updateItem = (id, form) => {
  let currentItem = AV.Object.createWithoutData('Items', id)
  // currentItem.set('date', form.date)
  currentItem.set('items', form.items)
  currentItem.set('total', form.total)
  return currentItem.save()
}

// 根据ObjectId删除
export const deleteItem = (id) => {
  let currentItem = AV.Object.createWithoutData('Items', id)
  return currentItem.destroy()
}

export const currentUser = AV.User.current()
