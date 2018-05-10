// pages/suggest/suggest.js
var app = getApp();
var $v = app.globalData.createInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con:""
  },
  surveyCon(e) {
    var con = e.detail.value;
    this.setData({
      con: con
    });
  },
  //提交
  tostep() {
    if (this.data.con == "") {
      wx.showToast({
        title: '请填写信息',
        icon: "none",
        duration: 800
      })
      return;
    }
    app.res({
      url:"idea/save",
      method:"POST",
      data:{
        des:this.data.con
      },
      callback:res=>{
        wx.showModal({
          title: '提示',
          content: '提交成功',
          success:res=>{
            this.setData({
              con:""
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      con:""
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
    this.onLoad();
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