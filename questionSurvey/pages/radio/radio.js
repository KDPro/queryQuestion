// pages/radio/radio.js
const app = getApp();
const $v = app.globalData.createInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerslist:[""],  //添加选项,
    title:"",
    isMust:1,
    "type":1,
    index:""
  },
  // 标题
  title(e){
    var val = e.detail.value;
    this.setData({
      title:val
    })
  },
  // 选项值
  addTitle(e){
    var index = e.currentTarget.dataset.index;
    var val = e.detail.value;
    var arr = this.data.answerslist;
    if(val == "") {
      arr[index]= "";
    }else {
      arr[index] = { answer: val };
    }
    this.setData({
      answerslist: arr
    })
    
  },
  // 添加选项
  addOptions(){
    var arr = this.data.answerslist;
    arr.push("");
    this.setData({
      answerslist:arr
    })
  },
  // 删除选项
  remove(e) {
    var index = e.currentTarget.dataset.index;
    var arr = this.data.answerslist;
    wx.showModal({
      title: '提示',
      content: '删除本选项？',
      success:res=>{
        if(res.confirm) {
          if (arr.length == 1) {
            wx.showToast({
              title: '只剩一个啦，不要删除啦',
              icon: "none",
              duration: 800
            })
            return false;
          }
          arr.splice(index, 1);
          this.setData({
            answerslist:arr
          })
        }
      }
    });
    
  },
  // 切换填空题
  changeType(e){
    var checked = e.detail.value?1:0;
    this.setData({
      "type":checked
    })
    if(checked) {
      wx.setNavigationBarTitle({
        title: "单选题"//页面标题为路由参数
      })
    }else{
      wx.setNavigationBarTitle({
        title: "填空题"//页面标题为路由参数
      })
    }
    
  },
  // 是否必填
  changeIsmust(e){
    var checked = e.detail.value;
    this.setData({
      isMust:checked?1:0
    });
  },
  //提交
  submit(){
    var arr = this.data.answerslist;
    if(this.data.title == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: "none",
        duration: 800
      });
      return;
    }
    if(this.data.type) {
      for (let i in arr) {
        if (arr[i] == "") {
          wx.showToast({
            title: '选项不能为空',
            icon: "none",
            duration: 800
          });
          return;
        }
      }
    // 将值存进全局中
      var json = {
        "isMust": this.data.isMust,
        "type": this.data.type,
        "question": this.data.title,
        "answerslist":this.data.answerslist
      }
    }else {
      var json = {
        "isMust": this.data.isMust,
        "type": this.data.type,
        "question": this.data.title,
      }
    }
    
    
    var psqList = $v.psqList ? $v.psqList:[];
    console.log(psqList);
    if(this.data.index!="") {
      psqList[this.data.index] = json;
    }else {
      psqList.push(json);
    }
    
    $v.psqList = psqList;
    console.log($v);
    console.log(JSON.stringify($v));
    wx.navigateBack({});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index) {
      var index = options.index;
      this.setData({
        index:index
      })
      if(parseInt($v.psqList[index].type)){
        wx.setNavigationBarTitle({
          title: "单选题"//页面标题为路由参数
        })
      } else {
        wx.setNavigationBarTitle({
          title: "填空题"//页面标题为路由参数
        })
      }
      if ($v.psqList[index].type){
        this.setData({
          "type": $v.psqList[index].type,
          title: $v.psqList[index].question,
          isMust: $v.psqList[index].isMust,
          answerslist: $v.psqList[index].answerslist
        })
      }else {
        this.setData({
          "type": $v.psqList[index].type,
          title: $v.psqList[index].question,
          isMust: $v.psqList[index].isMust
        })
      }
      
    }else {
      this.setData({
        "type": parseInt(options.type)
      });
      if (parseInt(options.type)) {
        wx.setNavigationBarTitle({
          title: "单选题"//页面标题为路由参数
        })
      } else {
        wx.setNavigationBarTitle({
          title: "填空题"//页面标题为路由参数
        })
      }
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