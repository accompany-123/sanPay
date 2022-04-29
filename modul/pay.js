import Http from "../utils/request"

class PayModel extends Http {
  login(data = {}) {
    return this.request({ url: "/weixinpay/login", method: 'GET', data })
  }
  order(data = {}) {
    return this.request({ url: "/weixinpay/doOrder", method: 'POST', data })
  }
}
export default PayModel