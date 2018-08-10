const service = require('service/test');

let hotapp = require('utils/hotapp.js');

App({
  onLaunch: function () {
    hotapp.init('hotapp491327934');
    hotapp.setDebug(true);
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.windowHeight = res.windowHeight;
      }
    });

    // 登录获取登录态
    this.getAuthKey();
  },

  onError (err) {
    // 上报错误
    console.log(err);
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
        url: service.domain + '/loginstate?code=' + res.code,
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
    this.getLoginState().then(res => {
        this.globalData.token = res.data.token;
        this.globalData.openid = res.data.openid;
        callback && callback();
      },
      res => console.log('登录失败！')
    )
  },
  globalData: {
    windowHeight: null,
    token: null,
    openid: null,
    hotapp: hotapp
  }
});