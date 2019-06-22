// pages/addressList/addressList.js
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
  delAddress: function (e) {
    let index = e.currentTarget.dataset.index
    let address = this.data.addressList[index]
    wx.showLoading({title: '处理中'})
    db.collection('address').doc(address._id).update({
      data: {
        isDeleted: true
      }
    }).then(response => {
      wx.hideLoading()
      this.data.addressList.splice(index, 1)
      this.setData({
        addressList: this.data.addressList
      })
    }).catch(response => {
      console.error(error)
      wx.hideLoading()
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none'
      })
    })
  },
  editAddress: function (e) {
    wx.navigateTo({
      url: '../addressEdit/addressEdit?addressId=' + e.currentTarget.dataset.id
    })
  },
  addAddress: function () {
    wx.navigateTo({
      url: '../addressEdit/addressEdit'
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