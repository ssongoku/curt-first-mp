// pages/orderList/orderList.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      _id: 123,
      status: 2,
      statusText: '待发货',
      count: 2,
      payAmount: 5.80,
      payGoods: [{
        goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
        title: '这是测试商品标题...'
      }, {
          goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
          title: '这是测试商品标题...'
      }]
    }, {
        _id: 1234,
        status: 2,
        statusText: '待发货',
        count: 3,
        payAmount: 5.80,
        payGoods: [{
          goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
          title: '这是测试商品标题...'
        }, {
          goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
          title: '这是测试商品标题...'
          }, {
            goodsImage: 'cloud://dev-curtfirstmp.6465-dev-curtfirstmp-1259404027/quick1.jpg',
            title: '这是测试商品标题...'
        }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let where = {
      isDeleted: false
    }
    if (Number(options.status)) {
      where.status = Number(options.status)
    }
    db.collection('order').where(where).get().then(response => {
      if (Array.isArray(response.data)) {
        response.data.forEach(x => {
        })
        this.setData({
          orderList: response.data
        })
      }
    }).catch(error => {
      console.error(error)
      wx.showToast({
        title: '获取订单列表失败',
        icon: 'none'
      })
    })

  },
  toOrderDetail: function (e) {
    let orderId = e.currentTarget.dataset.orderId
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + orderId,
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