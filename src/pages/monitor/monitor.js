const service = require('../../service/test');

Page({
  onLoad(options) {
    wx.setNavigationBarTitle({title: 'insight'});
    service.getApps(
      (res) => {
        this.setData({
          apps: res.records
        });
      },
      (res) => {
      }
    );
  },

  onFormSubmit: function (e) {
    service.patchUserFormId(
      (res) => {
        console.log(res.msg);
      },
      (res) => {
      },
      'user id',
      e.detail.formId
    );
  },
});