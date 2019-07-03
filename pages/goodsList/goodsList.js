// pages/goodsList/goodsList.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryIndex: '',
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.index) {
      return false
    }
    this.setData({
      categoryIndex: Number(options.index) || options.index
    })
    db.collection('goodsCategory').where({
      categoryIndex: this.data.categoryIndex,
      isDeleted: false
    }).get().then(response => {
      let goodsIds = response.data.map(x => x.goodsId)
      if (goodsIds.length === 0) {
        return
      }
      db.collection('goods').where({
        _id: db.command.in(goodsIds),
        isDeleted: false
      }).get().then(response => {
        response.data.forEach(x => {
          x.title = x.name.substr(0, 5) + '...'
        })
        this.setData({
          goodsList: response.data
        })
      }).catch(error => {
        console.log(error)
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        })
      })
    }).catch(error => {
      console.log(error)
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none'
      })
    })
  },
  handleGoodsDetail: function (event) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + event.currentTarget.dataset.goodsId
    });
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