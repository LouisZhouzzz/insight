const service = require('../../service/test');
const globalData = getApp().globalData;

Page({
  onLoad(options) {
    wx.setNavigationBarTitle({title: '慧眼'});
    service.getApps()
      .then(
        (res) => {
          this.setData({
            apps: res.data.records
          });
        })
      .catch(
        (res) => {
          console.log('加载应用列表失败！' + res);
        }
      );
  },

  onFormSubmit(e) {
    service.patchUserFormId(globalData.openid, e.detail.formId)
      .then(res => {
        console.log('formid发送成功！');
      })
      .catch(res => {
        console.log('formid发送失败');
      });
  }
});