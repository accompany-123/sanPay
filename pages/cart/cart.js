// pages/cart/cart.js
import storeage from "../../utils/storeage"
import carts from "../../common/carts"
Page({
  // 扫码
  async getQrcode(event) {
    await carts.getQrcode(event)
    this.initCartList()
  },
  addCard: carts.addCard,
  // 去结算
  goorder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  // 减
  sub(event) {
    let { index, cartData } = this.hasCartData(event)
    // 判断商品的数量是否小于1
    if (cartData[index].num <= 1) {
      wx.showModal({
        title: '提示',
        content: "您确定要删除这个商品？",
        success: (res) => {
          // console.log(res);
          if (res.confirm) {
            cartData.splice(index, 1)
            // 更新到试图
            this.setData({
              shopList: cartData
            })
            // 本地更新
            storeage.set('carts', cartData)
            this.allPrice(this.data.shopList)

          } else {
            wx.showToast({
              title: '取消删除',
            })
          }
        }
      })
    } else {
      cartData[index].num -= 1
      this.setData({
        shopList: cartData
      })
      storeage.set('carts', cartData)
      this.allPrice(this.data.shopList)

    }
  },
  // 获取商品下表移机商品的数据
  hasCartData(event) {
    let index = event.currentTarget.dataset.index
    let cartData = this.data.shopList
    if (!cartData) return
    return { index, cartData }
  },
  // 添加
  add(event) {
    let { index, cartData } = this.hasCartData(event)
    cartData[index].num += 1
    this.setData({
      shopList: cartData
    })
    // 本地更新
    storeage.set('carts', cartData)
    this.allPrice(this.data.shopList)

  },
  // 计算价格
  allPrice: carts.allPrice,

  // 初始化cartList
  initCartList() {
    // console.log('storage',storeage.get('carts'));
    this.setData({
      shopList: storeage.get('carts')
    })
    this.allPrice(this.data.shopList)
  },
  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    num: 0,
    sum: 0,
    subNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCartList()
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
    this.initCartList()
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