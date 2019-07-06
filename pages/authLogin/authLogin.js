// pages/authLogin.js
const context = getApp().globalData
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      db.collection('address').where({
        isDeleted: false,
        isDefault: true
      }).get().then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          response.data[0].isSelected = true
          context.defaultAddress = response.data[0]
        }
      }).catch(error => {
        console.error(error)
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  navigateToIndex: function () {
    wx.switchTab({
      url: '../index/index'
    })
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