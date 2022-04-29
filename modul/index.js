import Http from "../utils/request"

class IndexModel extends Http {
  // 扫码获取商品接口信息
  getProduction(qcode) {
    return this.request({
      url:"/api/getProduct",
      method:'GET',
      data:{qcode}
    })
  }
}
export default IndexModel