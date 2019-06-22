// pages/addressEdit/addressEdit.js
const context = getApp().globalData
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: true,
    addressId: '',
    name: '',
    phone: '',
    region: ['北京市', '北京市', '东城区'],
    detail: '',
    address: '',
    isDefault: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.addressId) {
      this.setData({
        isAdd: false,
        addressId: options.addressId
      })
    }
    if (!this.data.isAdd) {
      wx.showLoading({title: '加载中'})
      db.collection('address').where({_id: this.data.addressId}).get().then(response => {
        wx.hideLoading()
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.setData({
            name: response.data[0].name,
            phone: response.data[0].phone,
            region: [
              response.data[0].province,
              response.data[0].city,
              response.data[0].area
            ],
            detail: response.data[0].detail,
            isDefault: response.data[0].isDefault || false
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
    }
  },
  handleNameChange: function (e) {
    this.setData({
      name: e.detail.value.trim()
    })
  },
  handlePhoneChange: function (e) {
    let thePhone = e.detail.value.trim()
    if (!/^1[0-9]{10}$/.test(thePhone)) {
      wx.showToast({
        title: '不合法的手机号',
        icon: 'none'
      })
      thePhone = ''
    }
    this.setData({
      phone: thePhone
    })
  },
  handleRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  handleDetailChange: function (e) {
    this.setData({
      detail: e.detail.value.trim()
    })
  },
  handleDefaultCheck: function () {
    this.setData({
      isDefault: !this.data.isDefault
    })
  },
  saveAddress: function () {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    if (!this.data.detail) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false
    }
    let theData = {
      name: this.data.name,
      phone: this.data.phone,
      province: this.data.region[0],
      city: this.data.region[1],
      area: this.data.region[2],
      detail: this.data.detail,
      isDeleted: false,
      isDefault: this.data.isDefault
    }
    theData.address = theData.province + theData.city + theData.area + theData.detail
    if (theData.isDefault) {
      wx.showLoading({ title: '处理中' })
      db.collection('address').where({
        isDeleted: false,
        isDefault: true
      }).get().then(response => {
        if (Array.isArray(response.data) && response.data.length > 0 &&
          response.data[0]._id !== this.data.addressId) {
          db.collection('address').doc(response.data[0]._id).update({
            data: {
              isDefault: false
            }
          }).then(() => {
            wx.hideLoading()
            this.postAddress(theData)
          }).catch(error => {
            console.log(error)
            wx.hideLoading()
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          })
        } else {
          wx.hideLoading()
          this.postAddress(theData)
        }
      }).catch(error => {
        console.log(error)
        wx.hideLoading()
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
    } else {
      this.postAddress(theData)
    }
  },
  postAddress: function (theData) {
    wx.showLoading({ title: '处理中' })
    if (this.data.isAdd) {
      db.collection('address').add({
        data: theData
      }).then(response => {
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
        this.setContext(response)
      }).catch(error => {
        console.error(error)
        wx.hideLoading()
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
    } else {
      db.collection('address').doc(this.data.addressId).update({
        data: theData
      }).then(response => {
        if (context.defaultAddress && context.defaultAddress._id === this.data.addressId) {
          context.defaultAddress.name = theData.name
          context.defaultAddress.phone = theData.phone
          context.defaultAddress.province = theData.province
          context.defaultAddress.city = theData.city
          context.defaultAddress.area = theData.area
          context.defaultAddress.detail = theData.detail
          context.defaultAddress.address = theData.address
          context.defaultAddress.isDefault = theData.isDefault
        }
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
        this.setContext(this.data.addressId)
      }).catch(error => {
        console.error(error)
        wx.hideLoading()
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
    }
  },
  setContext: function (addressId) {
    if (this.data.isDefault && !context.defaultAddress && addressId) {
      wx.showLoading({
        title: '',
      })
      db.collection('address').doc(addressId).get().then(response => {
        if (response.data) {
          context.defaultAddress = response.data
        }
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      }).catch(error => {
        console.error(error)
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
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