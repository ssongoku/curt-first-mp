// pages/addressSelect/addressSelect.js
const context = getApp().globalData
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  editAddress: function (e) {
    wx.navigateTo({
      url: '../addressEdit/addressEdit?addressId=' + e.currentTarget.dataset.id,
    })
  },
  switchSelect: function (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let address = this.data.addressList[index]
    if (!address.isSelected) {
      let origin = this.data.addressList.find(a => a.isSelected)
      if (origin) {
        origin.isSelected = false
      }
      address.isSelected = true
      this.setData({
        addressList: this.data.addressList
      })
      context.defaultAddress = address
    }
    wx.navigateBack({
      delta: 1
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
    wx.showLoading({ title: '加载中' })
    db.collection('address').where({ isDeleted: false }).get().then(response => {
      wx.hideLoading()
      if (Array.isArray(response.data) && response.data.length > 0) {
        if (context.defaultAddress) {
          response.data.find(a => a._id === context.defaultAddress._id).isSelected = true
        }
        this.setData({
          addressList: response.data
        })
      }
    }).catch(error => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
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