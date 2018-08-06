const service = require('service/test');
App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    // this.getLoginState().then(
    //   res => {
    //     this.globalData.token = res.data.token;
    //     this.globalData.openid = res.data.openid;
    //     return new Promise((resolve) => {
    //       resolve()
    //     })
    //   },
    //   res => console.log('登录失败！')
    // );
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取与openId, sessionKey相关联的自定义登录态
    //     service.login(
    //       (res) => {
    //         this.globalData.token = res.token;
    //         this.globalData.openid = res.openid;
    //       },
    //       (res) => {
    //         console.log('登录失败！');
    //       },
    //       res.code
    //     );
    //   }
    // });

    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.windowHeight = res.windowHeight;
      }
    })
  },
  login() {
    return new Promise((resolve, reject) => wx.login({
      success: resolve,
      fail: reject
    }))
  },
  getLoginState() {
    return this.login().then(res => new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.hi5399.xyz' + '/loginstate?code=' + res.code,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'GET',
        success: resolve,
        fail: reject
      });
    }))
  },
  getAuthKey(callback) {
    // return this.getLoginState().then(res => {
    //     this.globalData.token = res.data.token;
    //     this.globalData.openid = res.data.openid;
    //     return new Promise((resolve) => {
    //       resolve()
    //     })
    //   },
    //   res => console.log('登录失败！')
    // )
    this.getLoginState().then(res => {
        this.globalData.token = res.data.token;
        this.globalData.openid = res.data.openid;
        callback();
      },
      res => console.log('登录失败！')
    )
  },
  globalData: {
    windowHeight: null,
    token: null,
    openid: null
  }
});