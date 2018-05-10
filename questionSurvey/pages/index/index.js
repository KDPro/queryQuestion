//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    list: []
  },
  // 获取列表
  getList() {
    app.res({
      url: "psq/s_list",
      method: "GET",
      data: {
        pageSize:0
      },
      callback: res => {
        this.setData({
          list:res.data.list
        })
      }
    })
  },
  /**
   * 跳转详情
   */
  toDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

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
})
