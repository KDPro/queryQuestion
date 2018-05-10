// pages/createSub/createSub.js
const app = getApp();
const $v = app.globalData.createInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:{},
    confirm:true
  },
  // 去单选页面
  toRadio(e){
    var types = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/radio/radio?type=' + types,
    })
  },
  //去编辑页面
  edit(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/radio/radio?index='+index,
    })
  },
  // 提交信息
  submit(){
    if ($v.psqList.length == 0) {
      wx.showToast({
        title: '你还没有创建题目',
        icon:"none",
        duration:800
      });
      return ;
    }
    this.setData({
      confirm:false
    })
  },
  // 发布信息
  publish(){
    app.res({
      url: "psq/save",
      method: "POST",
      data: $v,
      callback: res => {
        $v.paper = {};
        $v.psqList = [];
        wx.showModal({
          title: '提示',
          content: '发布成功,跳转新建问卷',
          showCancel:false,
          success:res=>{
            if(res.confirm) {
              wx.switchTab({
                url: '/pages/creat/creat',
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            }
          }
        })
      }
    })
  },
  returnEdit(){
    this.setData({
      confirm: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _m = "question";
    this.setData({
      [_m]:$v
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