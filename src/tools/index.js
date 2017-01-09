export const formateDate = (dateObj) => {
  if (typeof dateObj === 'string') {
    dateObj = new Date(dateObj)
  }
  let year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1 < 10 ? '0' + (1 + dateObj.getMonth()) : (1 + dateObj.getMonth())
  let day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()

  return year + '-' + month + '-' + day
}

export const getCookie = (key) => {
  if (typeof key === 'string') {
    var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
    if (arr) {
      return decodeURIComponent(arr[2])
    }
  }
  return false
}

export const storage = {
  get (key, defaultVal) {
    var val = storage.deserialize(window.localStorage.getItem(key))
    return (val === undefined ? defaultVal : val)
  },
  set (key, val) {
    if (val === undefined) { return storage.remove(key) }
    window.localStorage.setItem(key, storage.serialize(val))
    return val
  },
  remove (key) {
    window.localStorage.removeItem(key)
  },
  clear () {
    window.localStorage.clear()
  },
  serialize (value) {
    return JSON.stringify(value)
  },
  deserialize (value) {
    if (typeof value !== 'string') { return undefined }
    try {
      return JSON.parse(value)
    } catch (e) {
      return value || undefined
    }
  }
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param {Function} func - 传入函数
 * @param {Number} wait - 表示时间窗口的间隔
 * @param {Object} options - 如果想忽略开始边界上的调用，传入{leading: false}
 *                           如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {Function} - 返回客户调用函数
 */
export const throttle = (func, wait, options) => {
  var context, args, result
  var timeout = null
  // 上次执行时间点
  var previous = 0
  if (!options) options = {}
  // 延迟执行函数
  var later = function () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    var now = new Date().getTime()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now
    // 延迟执行时间间隔
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param {Function} func - 传入函数
 * @param {Number} wait - 表示时间窗口的间隔
 * @param {Boolean} immediate - 设置为ture时，调用触发于开始边界而不是结束边界
 * @return {Function} - 返回客户调用函数
 */
export const debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result

  var later = function () {
    // 据上一次触发时间间隔
    var last = new Date().getTime() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function () {
    context = this
    args = arguments
    timestamp = new Date().getTime()
    var callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
