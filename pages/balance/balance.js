// pages/balance/balance.js
Page({
  gorecord(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    price : [
      {
        "price" : 0.1,
        "title" : "充10元送1元"
      },
      {
        "price" : 20,
        "title" : "充20元送2元"
      },
      {
        "price" : 50,
        "title" : "充50元送5元"
      },
      {
        "price" : 100,
        "title" : "充100元送10元"
      }
    ],
    flag: 0
  },
  change(event) {
    let index = event.currentTarget.dataset.index
    this.setData({flag:index})
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