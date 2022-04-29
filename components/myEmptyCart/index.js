// components/myEmptyCart/myEmptyCart.js
import carts from "../../common/carts"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    async getQrcode(event) {
      await carts.getQrcode(event)
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    },
    addCard: carts.addCard
  }
})
