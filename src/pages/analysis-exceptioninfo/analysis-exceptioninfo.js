const service = require('../../service/test');

Page({
  data: {
    app: null,
    description: null,
    solution: null
  },
  onLoad (option) {
    wx.setNavigationBarTitle({ title: option.title });

    service.getException(option.id)
      .then(res => {
        this.setData({
          app: res.data.app,
          description: res.data.description,
          solution: res.data.solution ? res.data.solution : null
        });
      })
      .catch(res => {
        console.log('错误：' + res);
      });
  }
});