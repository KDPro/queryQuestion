// pages/creat/creat.js
const app = getApp();
const $v = app.globalData.createInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paper:{
      title:"",
      des:""
    }
  },
  surveyName(e){
    var title = e.detail.value;
    var _m = "paper.title";
    this.setData({
      [_m]:title
    });
  },
  surveyCon(e){
    var des = e.detail.value;
    var _m = "paper.des";
    this.setData({
      [_m]: des
    });
  },
  //跳转下一步
  tostep(){
    if(this.data.paper.title==""||this.data.paper.des=="") {
      wx.showToast({
        title: '请填写信息',
        icon:"none",
        duration:800
      })
      return ;
    }
    $v.paper = this.data.paper;
    console.log($v);
    wx.navigateTo({
      url: '/pages/createSub/createSub',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _m = "paper.title";
    var _s = "paper.des";
    this.setData({
      [_m]: "",
      [_s]:""
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