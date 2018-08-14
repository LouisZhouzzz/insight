const service = require('../../service/test');

Page({
  data: {
    records: [],
    status: 'loading'
  },
  onLoad() {
    this.getAnnouncements();
  },
  getAnnouncements () {
    this.setData({
      status: 'loading'
    });
    service.getAnnouncements()
      .then((res) => {
        this.setData({
          records: res.data.data,
          status: 'normal'
        });
      })
      .catch((res) => {
        console.warn(res);
        this.setData({
          status: 'error'
        });
      })
  }
});