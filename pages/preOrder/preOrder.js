// pages/preOrder/preOrder.js
const context = getApp().globalData
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preOrderId: '',
    payGoods: [],
    address: null,
    goodsPrice: 0,
    transportPrice: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let preOrderId
    if (context.preOrderId) {
      preOrderId = context.preOrderId
    } else {
      preOrderId = Date.now()
      context.preOrderId = preOrderId
    }
    this.setData({
      preOrderId: preOrderId
    })

    let total = 0
    context.payGoods.forEach(goods => {
      goods.title = goods.goodsName.substr(0, 15) + '...'
      total += goods.goodsMoney
    })
    this.setData({
      payGoods: context.payGoods,
      goodsPrice: total,
      transportPrice: 0.00
    })
    context.transportPrice = this.data.transportPrice
  },
  selectAddress: function () {
    wx.navigateTo({
      url: '../addressSelect/addressSelect',
    })
  },
  wxPay: function () {
    if (!this.data.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../pay/pay',
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
    if (context.defaultAddress) {
      this.setData({
        address: context.defaultAddress
      })
    }
    db.collection('order').where({
      preOrderId: this.data.preOrderId,
      isDeleted: false
    }).get().then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        wx.showToast({
          title: '此订单已支付',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../orderDetail/orderDetail?orderId=' + response.data[0]._id
          })
        }, 2000)
      }
    }).catch(error => {
      console.error(error)
    })
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