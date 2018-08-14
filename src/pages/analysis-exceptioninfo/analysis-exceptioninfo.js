const service = require('../../service/test');

Page({
  data: {
    id: null,
    app: null,
    description: null,
    solution: null,
    status: 'loading'
  },
  onLoad (option) {
    this.setData({
      id: option.id
    });
    wx.setNavigationBarTitle({ title: option.title });
    this.getException();
  },
  getException() {
    this.setData({
      status: 'loading'
    });
    service.getException(this.data.id)
      .then(res => {
        this.setData({
          app: res.data.app,
          description: res.data.description,
          solution: res.data.solution ? res.data.solution : null,
          status: 'normal'
        });
      })
      .catch(res => {
        console.warn('错误：' + res);
        this.setData({
          status: 'error'
        });
      });
  }
});