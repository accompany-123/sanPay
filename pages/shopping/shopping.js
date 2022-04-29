// pages/shopping/shopping.js
import carts from "../../common/carts"
Page({

  async getQrcode(event) {
    await carts.getQrcode(event)
    // 跳转购物车
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },
  addCard: carts.addCard,


  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      {
        id: 0,
        image: "../../assets/images/00.png"
      },
      {
        id: 1,
        image: "../../assets/images/02.png"
      },
      {
        id: 2,
        image: "../../assets/images/城市.webp"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})