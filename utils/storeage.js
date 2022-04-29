import { config } from "../config/config"

/* 获取本地存储的方法 */
const get = (key) => {
  return  wx.getStorageSync(key)  || []
}

// 存入本地数据
const set = (key, value) => {
  wx.setStorageSync(key, value)
}

// 删除本地存储数据
const remove = (key) => {
  wx.removeStorageSync(key)
}

// 清除本地数据
const clear = (key) => {
  wx.clearStorageSync(key)
}

export default { get, set, remove, clear }