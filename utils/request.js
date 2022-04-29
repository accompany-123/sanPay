import { config } from "../config/config"

class Http {
  request({ url, method = 'GET', data = {} }) {

    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '拼命加载中...',
      })
      this._request({ url, method, data, resolve, reject })
    })
  }
  _request({ url, method, data, resolve, reject }) {

    wx.request({
      url: config.baseURL + url,
      method,
      data,
      success(response) {
        resolve(response.data)
      },
      fail(error) {
        reject(error)
      },
    })
    wx.hideLoading()
  }
}

export default Http