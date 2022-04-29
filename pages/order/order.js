// pages/order/order.js
import carts from "../../common/carts"
import storeage from "../../utils/storeage"
import PayModel from "../../modul/pay"
import md5 from "../../utils/md5"
const payModel = new PayModel()
Page({
  // 确认支付
  handlePay() {
    this.handleOrder()
  },
  // 统一下单
  async handleOrder() {
    // 本地用户信息
    const userinfo = wx.getStorageSync('userinfo')
    const sign = this.sign({
      uid: userinfo._id,
      openid: userinfo.openid,
      salt: userinfo.salt
    })
    // console.log(userinfo);

    // uid openid salt
    // 获取签名
    const data = {
      openid: userinfo.openid, //用户唯一标识符
      uid: userinfo._id, //用户id
      sign: sign,//签名
      total_price: Number(this.data.num), //总价格
      total_num: this.data.sum, //总数量
      derate_price: this.data.subNum, //余额减扣
      real_price: Number(this.data.resultPrice), //真实价格
      order: JSON.stringify(this.data.allCarts) //订单数据
    }
    // console.log(data);
    const response = await payModel.order(data)
    // console.log(response);
    // 加入接口调用成功了后台会返回支付需要的参数，这时在发起支付
    this.hanlePayMement(response.result)
  },
  // 调用微信支付
  hanlePayMement(data) {
    data = JSON.parse(data)
    // console.log(data);
    wx.requestPayment({
      nonceStr: data.nonceStr,
      package: data.package,
      paySign: data.paySign,
      timeStamp: data.timeStamp,
      signType: 'MD5',
      success: response => {
        console.log('response', response);
        if (response.errMsg === "requestPayment:ok") {
          wx.removeStorageSync('carts')
          wx.navigateTo({
            url: '/pages/success/success',
          })
        }
      },
      fail: error => {
        console.log(error);
      }
    })
  },
  // 获取签名
  sign(json) {
    const arr = [] //uid openid salt
    for (let key in json) {
      arr.push(key)
    }
    // console.log(arr);
    arr.sort()
    // console.log(arr);

    let str = ""
    for (let i = 0; i < arr.length; i++) {
      str += arr[i] + json[arr[i]]
    }
    // console.log(md5(str));
    return md5(str)
  },
  // 是否减扣
  changeStatus(event) {
    // 减扣
    let flag = event ? event.detail.value : true
    if (flag) {
      this.setData({
        resultPrice: this.data.num - this.data.subNum,
        moneyStatus: flag
      })
    } else {
      this.setData({
        resultPrice: this.data.num,
        moneyStatus: flag
      })
    }

  },
  // 展开收起
  showList() {
    this.setData({
      flag: !this.data.flag
    })
    this.initCartList()

  },
  // 初始化cartList
  initCartList() {
    // console.log('storage',storeage.get('carts'));
    let carts = storeage.get('carts')
    if (!this.data.flag) {
      carts = carts.splice(0, 1)
    }
    this.setData({
      carts,
      allCarts: storeage.get('carts')
    })
    this.allPrice(this.data.allCarts)
  },
  // 计算价格
  allPrice: carts.allPrice,
  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    allCarts: [], //全部数据
    flag: false,
    moneyStatus: true, //是否减扣
    balance: 300,//余额
    num: 0, //总价
    sum: 0, // 总数量
    subNum: 4, //减扣金额
    resultPrice: 0, //真实价格
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
    this.initCartList()
    this.changeStatus()
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