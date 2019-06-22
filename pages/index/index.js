//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerImages: [
      { goodsId: 1, src: '../../images/banner/banner1.jpg'},
      { goodsId: 2, src: '../../images/banner/banner2.jpg' },
      { goodsId: 3, src: '../../images/banner/banner3.jpg'},
      { goodsId: 4, src: '../../images/banner/banner4.jpg'},
      { goodsId: 5, src: '../../images/banner/banner5.jpg'}
    ],
    quickGoods: [
      {
        id: 11,
        avatar: '../../images/quick/quick1.jpg',
        title: '黑桃化妆笔',
        price: 100,
        salesCount: '4396'
      },
      {
        id: 12,
        avatar: '../../images/quick/quick2.jpg',
        title: '小狸猫零食',
        price: 200,
        salesCount: '2800'
      },
      {
        id: 13,
        avatar: '../../images/quick/quick3.jpg',
        title: '全套榨汁机',
        price: 300,
        salesCount: '777'
      },
      {
        id: 14,
        avatar: '../../images/quick/quick4.jpg',
        title: '万能遥控器',
        price: 400,
        salesCount: '10w+'
      },
      {
        id: 15,
        avatar: '../../images/quick/quick5.jpg',
        title: '大箱包小箱包',
        price: 500,
        salesCount: '2w+'
      }
    ],
    motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleGoodsDetail: function(event) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + event.currentTarget.dataset.goodsId
    });
  },
  navigateGoodsList: function(event) {
    wx.navigateTo({
      url: '../goodsList/goodsList?index=' + event.currentTarget.dataset.index
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../testbutton/testbtn'
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