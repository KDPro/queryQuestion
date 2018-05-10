// pages/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 获取列表
  getList() {
    app.res({
      url: "psq/s_list",
      method: "GET",
      data: {
        pageSize: 0,
        cUser:app.globalData.userId,
        flag:1
      },
      callback: res => {
        console.log(res);
        this.setData({
          list: res.data.list
        })
      }
    })
  },
  // 删除问卷
  remove(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '将清理问卷所有资料，包括问卷列表',
      success:res=>{
        if(res.confirm) {
          app.res({
            url: "psq/del/"+id,
            method: "DELETE",
            data: {},
            callback: res => {
              wx.showToast({
                title: '删除成功',
                icon:"none",
                duration:800
              });
              setTimeout(()=>{
                this.getList();
              },400);
            }
          })
        }
      }
    })

  },
  //跳转统计详情
  toStatis(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/statis/statis?id='+id,
    });
  },
  // //点击分享给好友
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: res.target.dataset.title,
        path: '/pages/detail/detail?id=' + res.target.dataset.id,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var interval = setInterval(() => {
      if (app.globalData.token) {
        clearInterval(interval);
        this.getList();
      }
    }, 1)
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
})