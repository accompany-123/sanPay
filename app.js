// app.js
import PayModel from "./modul/pay"
const payModel = new PayModel()
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: async res => {
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const { userinfo } = await payModel.login({ code: res.code })
        // console.log(result);
        if (userinfo) {
          wx.setStorageSync('userinfo', userinfo)
        } else {
          wx.showToast({
            title: '您没有权限',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
