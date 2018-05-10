// pages/statis/statis.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    psqlist:[],
  },
  getList(){
    app.res({
      url: "psq/s_id_one",
      method: "GET",
      data: {
        id: this.data.id
      },
      callback: res => {
        var arr = res.data.psqlist;
        arr.forEach((e,index)=>{
          arr[index].open = false; 
        });
        this.setData({
          psqlist: res.data.psqlist,
        })
      }
    })
  },
  //展开详情
  open(e){
    var index = e.currentTarget.dataset.index;
    var types = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    var _m = "psqlist["+index+"].open"
    this.setData({
      [_m]:!this.data.psqlist[index].open
    });
    if(types == 1) {
      this.getRadioDetail(index,id);
    }else if(types == 0) {
      this.getFBDetail(index,id);
    }
    
  },
  //获取选择题详情
  getRadioDetail(index,id){
    if(this.data.psqlist[index].ans) {
      return ;
    }
    app.res({
      url:"psq/s_id_three",
      method:"GET",
      loading:false,
      data:{
        paperId:this.data.id,
        quId: id
      },
      callback:res=>{
        var _m = "psqlist["+index+"].ans"
        this.setData({
          [_m]:res
        })
      }
    })
  },
  //获取填空题详情
  getFBDetail(index,id){
    app.res({
      url: "psq/s_id_two",
      method: "GET",
      loading: false,
      data: {
        paperId: this.data.id,
        quId: id,
        pageSize:3,
        current: this.data.psqlist[index].current ? this.data.psqlist[index].current:1
      },
      callback: res => {
        var _m = "psqlist[" + index + "].ans";
        var _n = "psqlist[" + index + "].current";
        var _t = "psqlist[" + index +"].pages";
        var _to = "psqlist[" + index + "].total";
        this.setData({
          [_m]: res.data.list,
          [_n]: this.data.psqlist[index].current ? this.data.psqlist[index].current:1,
          [_t]: res.data.pages,
          [_to]: res.data.total
        });
      }
    })
  },
  //向下翻页
  pageDown(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var pages = e.currentTarget.dataset.pages;
    var current = e.currentTarget.dataset.current;
    if (current >= pages) {
      wx.showToast({
        title: '没有下一页啦！',
        icon:"none",
        duration:800
      });
      return ;
    }
    var _p = "psqlist[" + index +"].current";
    
    this.setData({
      [_p]: this.data.psqlist[index].current + 1
    })
    this.getFBDetail(index,id);
  },
  //向上翻页
  pageUp(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var pages = e.currentTarget.dataset.pages;
    var current = e.currentTarget.dataset.current;
    if (current <= 1) {
      wx.showToast({
        title: '没有上一页啦！',
        icon: "none",
        duration: 800
      });
      return;
    }
    var _p = "psqlist[" + index + "].current";

    this.setData({
      [_p]: this.data.psqlist[index].current - 1
    })
    this.getFBDetail(index, id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
    this.getList();
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