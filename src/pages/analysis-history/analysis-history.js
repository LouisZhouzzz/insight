const service = require('../../service/test');
const computed = require('../../utils/vuelike').computed;

Page({
  data: {
    records: [],
    page: 0,
    size: 5,
    ifLoading: true
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '历史异常记录' });
    this.setData({
      ifLoading: true
    });
    service.getHandledExceptions(
      (res) => {
        this.setData({
          records: res.records,
          ifLoading: false
        });
        wx.stopPullDownRefresh();
      },
      (res) => {
        this.setData({
          ifLoading: false
        });
        wx.stopPullDownRefresh();
      }, 0, this.data.size * (this.data.page + 1));
  },

  // TODO
  // onReady: function () { // 监听页面初次渲染完成
  //   computed(this, {
  //     ifMore: function () { // 判断是否存在更多数据
  //       return this.data.page * this.data.size === this.data.records.length
  //     }
  //   })
  // },

  onPullDownRefresh: function () {
    wx.startPullDownRefresh();
    this.onLoad();
  },

  onReachBottom: function () {
    this.loadMoreRecords();
  },

  loadMoreRecords: function () {
    let ifMore = (this.data.page + 1) * this.data.size === this.data.records.length;
    if (this.data.ifLoading || !ifMore) return;
    this.setData({
      ifLoading: true
    });
    service.getHandledExceptions(
      (res) => {
        for (let i in res.records) {
          if (!res.records.hasOwnProperty(i)) continue;
          this.data.records.push(res.records[i]);
        }
        this.setData({
          records: this.data.records,
          page: this.data.page + 1,
          ifLoading: false
        });
      },
      (res) => {
        this.setData({
          ifLoading: false
        })
      },
      this.data.page,
      this.data.size);
  }
});