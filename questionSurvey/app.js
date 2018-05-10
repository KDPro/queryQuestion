//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.res({
          url: 'q_login',
          method: "GET",
          data: {
            code: res.code
          },
          callback: res => {
            this.globalData.token = res.token;
            this.globalData.openId = res.user.openId;
            this.globalData.userId = res.user.id;
            wx.getUserInfo({
              success: res => {
                this.res({
                  url: 'u_edit',
                  method: "POST",
                  data: {
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl,
                    gender: res.userInfo.gender
                  },
                  callback: res => {

                  }
                })
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  // 微信请求的封装
  res: function ({ url, method, data, loading, callback }) {
    if (loading || loading == undefined) {
      wx.showLoading({
        title: '加载中...',
      });
    }
    wx.request({
      url: this.globalData.appPath + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',// 默认值
        'token': this.globalData.token
      },
      success: (res) => {
        if (res.data.code == 0) {
          callback(res.data);
        } else {
          if (res.data.msg) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络可能出错了，请稍后重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
        if (loading || loading == undefined) {
          wx.hideLoading();
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    // appPath: 'http://192.168.20.136:8089/',
    appPath: 'http://www.kaidikeji.com:9989/',
    // appPath:'http://192.168.20.115:8089/',
    createInfo:{},  //createInfo里面的参数  见下面注释部分
    // createInfo: {"paper":{"title":"dsafds","des":"dsafsdf"},"psqList":[{"isMust":1,"type":1,"question":"dsafdsafd","answerslist":[{"answer":"dsafdsfadsf"},{"answer":"dsafdsafds"},{"answer":"dsafdsfasdf"}]},{"isMust":1,"type":0,"question":"dsafdsfasd"}]}
  }


  /**
   * "paper": {
      "title": "标题",
      "des": "描述",  
      },
      "psqList": [{
        "isMust": 0, -- 是否比做
        "question": "循环 -> 问题题目",
        "type": 0, -- 类型(选择、问答)
        "answerslist": [ -- 选择题 -> 选项
          {
            "answer": "循环 -> 问题的答案"
          }
        ]
      }]
   */
})