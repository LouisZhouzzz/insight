Page({
  onLoad: function () {
    getApp().setAuthKey(() => {
      wx.switchTab({ url:'../analysis/analysis' });
    });
  }
});
