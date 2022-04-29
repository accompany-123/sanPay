// components/myButton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击扫码
    async handleQrcode() {
      const { result } = await this.scanCodePromise()
      if (!result) return
      this.triggerEvent('getQrcode', { qrcode: result })
    },
    // 将扫码方法promise化
    scanCodePromise() {
      return new Promise((resolve, reject) => {
        wx.scanCode({
          // onlyFromCamera: true, //是否获取相册
          success: (res) => {
            resolve(res)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },
  }
})
