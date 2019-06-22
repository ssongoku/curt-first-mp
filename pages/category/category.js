// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyItems: [{
        "id": 1,
        "name": "个人护理",
        "ishaveChild": true,
        "shopClassifyDtoList": [{
            "id": 2,
            "name": "洗护套装",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 3,
            "name": "卸妆",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 4,
            "name": "护肤套装",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          }
        ]
      },
      {
        "id": 5,
        "name": "护肤彩妆",
        "ishaveChild": true,
        "shopClassifyDtoList": [{
            "id": 6,
            "name": "面膜",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 7,
            "name": "面霜",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 8,
            "name": "晚霜",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 9,
            "name": "香水",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          }
        ]
      },
      {
        "id": 10,
        "name": "母婴",
        "ishaveChild": false,
        "shopClassifyDtoList": []
      },
      {
        "id": 11,
        "name": "护肤",
        "ishaveChild": true,
        "shopClassifyDtoList": [{
            "id": 12,
            "name": "气垫bb",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 13,
            "name": "隔离霜",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 14,
            "name": "修容/高光",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 15,
            "name": "遮瑕",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 16,
            "name": "腮红",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 17,
            "name": "粉底",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 18,
            "name": "粉饼",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          },
          {
            "id": 19,
            "name": "蜜粉/散粉",
            "imgUrl": "cloud://dev-curtfirstmp.6465-dev-curtfirstmp/category.jpg"
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})