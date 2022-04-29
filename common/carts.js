import IndexModel from "../modul/index"
const indexModel = new IndexModel()
import storeage from "../utils/storeage"

// 点击扫码
async function getQrcode(event) {
  let result = event.detail.qrcode
  if (!result) return
  const response = await indexModel.getProduction(result)
  // console.log(response);
  let flag = addCard(response.result[0])
  // let flag = this.addCard(response.result[0])
}
// findIndex方法
function addCard(data) {
  // console.log(data);
  let carts = storeage.get('carts')
  let index = carts.findIndex(item => {
    return item._id == data._id
  })
  if (index == -1) {
    data.num = 1
    carts.push(data)
    storeage.set('carts', carts)
  } else {
    carts[index].num++
    storeage.set('carts', carts)
  }
}

// some方法
/*    addCard(data) {
     let carts = storeage.get('carts')
     console.log(carts);
     // 第一次添加
     if (carts.length == 0) {
       data.num = 1
       carts.push(data)
       storeage.set('carts', carts)
     } else { //不是第一次添加
       let cartStatus = this.hasData(data, carts)
       // 已存在
       if (cartStatus) {
         carts.forEach(item => {
           if (item._id == data._id) {
             item.num++
           }
         })
         storeage.set('carts', carts)
       } else { //不存在
         data.num = 1
         carts.push(data)
         storeage.set('carts', carts)
       }
     }
   }
   // 是否本地数据已经存在
   hasData(data, carts) {
     console.log(carts);
     return carts.some(item => item._id == data._id)
   } */
// 计算价格
function allPrice(cart) {
  let num = 0
  let sum = 0
  cart.forEach(item => {
    num += Number((item.price * 10) * item.num) / 10
    sum += item.num
  })
  this.setData({
    num: num.toFixed(1),
    sum: sum,
    subNum: num
  })
}
export default { getQrcode, addCard, allPrice }