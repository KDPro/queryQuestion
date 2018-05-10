// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",       //上个页面传递的参数
    question:{},  //ajax 返回数据
    isMust:[],    //获取必须填写的题目id
    rList:{}      //每个题的答案
  },
  radioChange: function (e) {
    var anId = e.detail.value;
    var quId = e.currentTarget.dataset.quid;
    var rList = "rList."+quId;
    var json = {
      quId: quId,
      anId: anId
    }
    this.setData({
      [rList]: json
    });
    
  },
  textareaV:function(e) {
    var anserText = e.detail.value;
    var quId = e.currentTarget.dataset.quid;
    var rList = "rList." + quId;;
    var json = {
      quId:quId,
      anId:anserText
    }
    this.setData({
      [rList]: json
    });

    //如果填空题的答案为空了，删除在对象中的值
    if (anserText == "") {
      var _m = this.data.rList;
      delete _m[quId]
      this.setData({
        rList:_m
      })
    }
  },
  // 获取题目
  getQuestion(){
    app.res({
      url:"psq/s_id_one",
      method:"GET",
      data:{
        id:this.data.id
      },
      callback:res=>{
        var arr = res.data.psqlist;
        var arrMust = [];
        arr.forEach((e,index)=>{
          if (e.isMust == 1) {
            arrMust.push(e.id);
          }
        });
        this.setData({
          question: res.data,
          isMust:arrMust
        })
      }
    })
  },
  //判断必填项是否填写
  isMustF(){
    var arrMust = this.data.isMust;  //获取的必填项
    var arrList = [];  
    for (let j in this.data.rList) {
      arrList.push(j);    //得到已选项的数组
    }
    for(let k in arrMust) {
      if (arrList.indexOf(arrMust[k])<0) {
        return false;
      }
    }
    return true;
  },
  //提交答案
  postAns(e){
    if (!this.isMustF()) {
      wx.showToast({
        title:'必填项请填写答案',
        icon:"none",
        duration:800
      })
      return ;
    }
    wx.showModal({
      title: '提示',
      content: '提交后无法更改，您确认提交吗',
      success:res=>{
        if(res.confirm) {
          var paperId = e.currentTarget.dataset.paperid;
          var arr = [];
          for (let i in this.data.rList) {
            arr.push(this.data.rList[i]);
          }
          app.res({
            url: "psq/save_record",
            method: "POST",
            data: {
              paperId: paperId,
              rList: arr
            },
            callback: res => {
              wx.showModal({
                title: '提示',
                content: '提交成功,是否返回主页',
                success: res => {
                  if (res.confirm) {
                    wx.navigateBack({});
                  } else {

                  }
                }
              })
            }
          })
        }
      }
    })
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getQuestion();
  },
})