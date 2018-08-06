Page({
  onLoad: function () {
    getApp().getAuthKey(() => {
      wx.switchTab({ url:'../analysis/analysis' });
    });
  }
});
