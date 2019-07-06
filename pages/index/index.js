//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const db = wx.cloud.database()

Page({
  data: {
    bannerGoods: [],
    quickGoods: [],
    quickCategory: []
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleGoodsDetail: function(e) {
    utils.handleGoodsDetail(e)
  },
  navigateGoodsList: function(event) {
    wx.navigateTo({
      url: '../goodsList/goodsList?index=' + event.currentTarget.dataset.index
    });
  },
  onLoad: function(option) {
    // 获取banner商品
    db.collection('quickGoods').where({
      location: 'index-banner'
    }).get().then(response => {
      this.setData({
        bannerGoods: response.data
      })
    }).catch(error => {
      console.error(error)
    })
    // 获取推荐商品
    db.collection('quickGoods').where({
      location: 'index-hot'
    }).get().then(response => {
      this.setData({
        quickGoods: response.data
      })
    }).catch(error => {
      console.error(error)
    })
    // 获取快速分类
    db.collection('category').where({
      level: 0,
      isDeleted: false,
    }).get().then(response => {
      this.setData({
        quickCategory: response.data
      })
    }).catch(error => {
      console.error(error)
    })
  },
  SonLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})