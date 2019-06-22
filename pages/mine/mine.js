// pages/mine.js
const utils = require('../../utils/util.js')
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {
      avatarUrl: '../../images/user-unlogin.png',
      nickName: '未登录'
    },
    quickGoods: []
  },
  handleGoodsDetail: function (e) {
    utils.handleGoodsDetail(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取推荐商品
    db.collection('quickGoods').get().then(response => {
      this.setData({
        quickGoods: response.data
      })
    })
  },

  onGetUserInfo: function(e) {
    if (!this.hasUserInfo && e.detail.userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      })
    }
  },
  navigateOrderList: function () {
    wx.navigateTo({
      url: '../orderList/orderList?status=' + e.currentTarget.dataset.status
    })
  },
  navigateAfterSales: function () {
    wx.navigateTo({
      url: '../afterSales/afterSales',
    })
  },
  myAddress: function () {
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  myFavorite: function () {
    wx.navigateTo({
      url: '../favorite/favorite',
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
    wx.getSetting({
      success: response => {
        if (response.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: response => {
              this.setData({
                userInfo: response.userInfo,
                hasUserInfo: true
              })
            },
            fail: response => {
              console.log(response)
            }
          })
        } else {
          wx.navigateTo({
            url: '../authLogin/authLogin'
          })
        }
      },
      fail: response => {
        console.error(response)
      }
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