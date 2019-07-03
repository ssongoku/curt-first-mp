// pages/orderDetail/orderDetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    orderDetail: {
      status: 2,
      statusText: '待发货',
      count: 1,
      payGoods:[{
        _id: '94b1e1fc5d0ded5605f72d6c24cfe93e',
        _openid: 'owaEn404EiQ5dianmtHlm4hrqc_g',
        count: 6,
        goodsId: 111,
        goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
        goodsMoney: 600,
        goodsName: '黑桃化妆笔250ml黑桃化妆笔',
        goodsNumber: 110001,
        isDeleted: false,
        isSeleted: true,
        price: 100,
        title: '黑桃化妆笔250ml黑桃化妆笔...'
      }],
      orderNumber: '239845792385',
      orderTime: '2019-06-18 23:54:23',
      payWay: '在线支付',
      goodsPrice: 600.00,
      reward: 0.00,
      payAmount: 600.00,
      transportPrice: 0.00
    },
    address: {
      name: 'liukewen',
      phone: '18383838383',
      address: '湖北武汉市洪山区城区曙光星城A区7栋一单元2917'
    }
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