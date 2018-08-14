const service = require('service/test');
let showToast = require('utils/util').showToast;
let hotapp = require('utils/hotapp.js');

App({
  onLaunch () {
    hotapp.init('hotapp491327934');
    hotapp.setDebug(true);
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    try {
      let res = wx.getSystemInfoSync();
      this.globalData.windowHeight = res.windowHeight;
    } catch (e) {
      console.log('获取设备信息失败！')
    }
    // 登录获取登录态
    this.setAuthKey();

    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };
  },

  setAuthKey(callback) {
    service.getLoginState()
      .then(res => {
        this.globalData.token = res.data.token;
        this.globalData.openid = res.data.openid;
        callback && callback();
      })
      .catch(res =>
        console.log('登录失败! ' + res)
      )
  },

  onError(err) {
    showToast({
      title: err,
      icon: 'none'
    }, 1000);
  },

  globalData: {
    windowHeight: null,
    token: null,
    openid: null,
    ifCollectionsChange: { // 监测收藏列表的变化
      monitor: true,
      dashboard: true
    },
    hotapp: hotapp
  }
});