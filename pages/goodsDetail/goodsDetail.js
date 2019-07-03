// pages/goodsDetail/goodsDetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    isLike: false,
    likeId: '',
    showDialog: false,
    goods: null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.goodsId) {
      return false
    }
    this.setData({
      goodsId: Number(options.goodsId) || options.goodsId
    })
    db.collection('goods').where({_id: this.data.goodsId}).get().then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        let theGoods = response.data[0]
        theGoods.count = 1
        this.recalculateMoney(theGoods)
      }
    }).catch(error => {
      console.error(error)
    })
    db.collection('goodsLike').where({ goodsId: this.data.goodsId}).get().then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        this.setData({
          isLike: true,
          likeId: response.data[0]._id
        })
      }
    }).catch(error => {
      console.error(error)
    })
  },
  // 计算总价
  recalculateMoney: function (theGoods) {
    theGoods.totalMoney = theGoods.count * theGoods.price
    this.setData({
      goods: theGoods
    })
    return theGoods
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.goods.bannerImages // 需要预览的图片http链接列表  
    })
  },
  addLike: function (e) {
    if (!this.data.isLike) {
      wx.showLoading({ title: '处理中' })
      db.collection('goodsLike').add({
        data: {
          goodsId: this.data.goodsId
        }
      }).then(response => {
        this.setData({
          isLike: true,
          likeId: response._id
        })
        wx.hideLoading()
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.error(error)
        wx.hideLoading()
        wx.showToast({
          title: '收藏失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      wx.showLoading({ title: '处理中' })
      db.collection('goodsLike').doc(this.data.likeId).remove().then(response => {
        this.setData({
          isLike: false,
          likeId: ''
        })
        wx.hideLoading()
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.error(error)
        wx.hideLoading()
        wx.showToast({
          title: '取消收藏失败',
          icon: 'none',
          duration: 2000
        })
      })
    }
  },
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  delCount: function (e) {
    let theGoods = this.data.goods
    if (theGoods.count > 1) {
      theGoods.count--
    }
    this.recalculateMoney(theGoods)
  },
  addCount: function (e) {
    let theGoods = this.data.goods
    if (theGoods.count < 10) {
      theGoods.count++;
    }
    this.recalculateMoney(theGoods)
  },
  addCar: function (e) {
    wx.showLoading({ title: '处理中' })
    db.collection('cart').where({goodsId: this.data.goodsId, isDeleted: false}).get().then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        let oldGoods = response.data[0]
        let newGoods = {
          goodsId: this.data.goodsId,
          goodsImage: this.data.goods.bannerImages[0],
          goodsName: this.data.goods.name,
          goodsNumber: this.data.goods.number,
          price: this.data.goods.price,
          count: this.data.goods.count + oldGoods.count
        }
        newGoods.goodsMoney = newGoods.price * newGoods.count
        db.collection('cart').doc(oldGoods._id).update({
          data: newGoods
        }).then(response => {
          wx.hideLoading()
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 2000
          })
          this.toggleDialog()
        }).catch(error => {
          console.error(error)
          wx.hideLoading()
          wx.showToast({
            title: '加入购物车失败',
            icon: 'none',
            duration: 2000
          })
        })
      } else {
        db.collection('cart').add({
          data: {
            goodsId: this.data.goodsId,
            goodsImage: this.data.goods.bannerImages[0],
            goodsName: this.data.goods.name,
            goodsNumber: this.data.goods.number,
            price: this.data.goods.price,
            count: this.data.goods.count,
            goodsMoney: this.data.goods.totalMoney,
            isDeleted: false
          }
        }).then(response => {
          wx.hideLoading()
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 2000
          })
          this.toggleDialog()
        }).catch(error => {
          console.error(error)
          wx.hideLoading()
          wx.showToast({
            title: '加入购物车失败',
            icon: 'none',
            duration: 2000
          })
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
  },
  toCar() {
    wx.switchTab({ url: '../cart/cart' })
  },
  immeBuy: function () {
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