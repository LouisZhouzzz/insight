const service = require('../../service/test');

Page({
  data: {
    app: null,
    description: null,
    solution: null
  },
  onLoad (option) {
    wx.setNavigationBarTitle({ title: option.title });
    service.getException(
      (res) => {
        this.setData({
          app: res.app,
          description: res.description,
          solution: res.solution ? res.solution : null
        });
      },
      () => {},
      option.id
    );
  }
});