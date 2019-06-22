// pages/cart/cart.js
const utils = require('../../utils/util.js')
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    quickGoods: [],
    cartGoods: [],
    isAllSeleted: false,
    totalMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getHotGoods: function () {
    db.collection('quickGoods').get().then(response => {
      this.setData({
        quickGoods: response.data
      })
    })
  },
  handleGoodsDetail: function (e) {
    utils.handleGoodsDetail(e)
  },
  switchSelect: function (e) {
    let index = parseInt(e.target.dataset.index)
    let theGoods = this.data.cartGoods[index]
    theGoods.isSeleted = !theGoods.isSeleted
    this.recalculateGoods(this.data.cartGoods)
  },
  switchSelectAll: function () {
    if (this.data.isAllSeleted) {
      this.data.cartGoods.forEach(goods => goods.isSeleted = false)
    } else {
      this.data.cartGoods.forEach(goods => goods.isSeleted = true)
    }
    this.recalculateGoods(this.data.cartGoods)
  },
  delCount: function (e) {
    let index = parseInt(e.target.dataset.index)
    let theGoods = this.data.cartGoods[index]
    if (theGoods.count <= 1) {
      return
    }
    let theCount = theGoods.count - 1
    wx.showLoading({ title: '处理中' })
    db.collection('cart').doc(theGoods._id).update({
      data: {
        count: theCount,
        goodsMoney: theGoods.price * theCount
      }
    }).then(response => {
      theGoods.count = theCount
      this.recalculateGoods(this.data.cartGoods)
      wx.hideLoading()
    }).catch(error => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  addCount: function (e) {
    let index = parseInt(e.target.dataset.index)
    let theGoods = this.data.cartGoods[index]
    if (theGoods.count >= 10) {
      return
    }
    let theCount = theGoods.count + 1
    wx.showLoading({ title: '处理中' })
    db.collection('cart').doc(theGoods._id).update({
      data: {
        count: theCount,
        goodsMoney: theGoods.price * theCount
      }
    }).then(response => {
      theGoods.count = theCount
      this.recalculateGoods(this.data.cartGoods)
      wx.hideLoading()
    }).catch(error => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  delGoods: function (e) {
    let index = parseInt(e.target.dataset.index)
    let theGoods = this.data.cartGoods[index]
    wx.showLoading({ title: '处理中' })
    db.collection('cart').doc(theGoods._id).remove().then(response => {
      this.data.cartGoods.splice(index, 1)
      wx.hideLoading()
      if (this.data.cartGoods.length === 0) {
        this.getHotGoods()
        this.setData({
          isEmpty: true,
          isAllSeleted: false,
          totalMoney: 0
        })
      } else {
        this.recalculateGoods(this.data.cartGoods)
      }
    }).catch(error => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '删除失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  recalculateGoods: function (cartGoods) {
    let allSeleted = this.recalculateSeleted(cartGoods)
    let theTotalMoney = 0
    for (let i = 0; i < cartGoods.length; i++) {
      cartGoods[i].goodsMoney = cartGoods[i].price * cartGoods[i].count
      if (cartGoods[i].isSeleted) {
        theTotalMoney += cartGoods[i].goodsMoney
      }
    }
    this.setData({
      cartGoods: cartGoods,
      isAllSeleted: allSeleted,
      totalMoney: theTotalMoney
    })
  },
  recalculateSeleted: function (cartGoods) {
    for (let i = 0; i < cartGoods.length; i++) {
      if (!cartGoods[i].isSeleted) {
        return false
      }
    }
    return true
  },
  toBuy: function () {
    app.globalData.payGoods = this.data.cartGoods.filter(goods => goods.isSeleted)
    wx.navigateTo({
      url: '../preOrder/preOrder'
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
        if (!response.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../authLogin/authLogin'
          })
        } else {
          wx.showLoading({ title: '处理中' })
          db.collection('cart').where({ isDeleted: false }).get().then(response => {
            wx.hideLoading()
            if (Array.isArray(response.data) && response.data.length > 0) {
              this.setData({
                isEmpty: false
              })
              response.data.forEach(goods => {
                goods.isSeleted = true
                goods.title = goods.goodsName.substr(0, 10) + '...'
              })
              this.recalculateGoods(response.data)
            } else {
              this.getHotGoods()
              this.setData({
                isEmpty: true
              })
            }
          }).catch(error => {
            console.error(error)
            wx.hideLoading()
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none',
              duration: 2000
            })
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