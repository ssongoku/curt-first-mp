// pages/pay/pay.js
const context = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  moniPay: function () {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'pay',
      data: {
        addressId: context.defaultAddress._id,
        payGoods: context.payGoods,
        transportPrice: context.transportPrice
      }
    }).then(response => {
      let orderId = response.result.data.orderId
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
      })
      wx.navigateTo({
        url: '../orderDetail/orderDetail?orderId=' + orderId,
      })
    }).catch(error => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      })
    })
  },
  toOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
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