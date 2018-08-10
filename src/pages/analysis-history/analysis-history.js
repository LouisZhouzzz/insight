const service = require('../../service/test');
const computed = require('../../utils/vuelike').computed;

Page({
  data: {
    records: [],
    page: 0,
    ifLoading: true,
    size: 10
  },
  onLoad() {
    wx.setNavigationBarTitle({title: '历史异常记录'});
    this.setData({
      ifLoading: true
    });

    service.getHandledExceptions(this.data.page)
      .then(res => {
        this.setData({
          records: res.data.records,
          ifLoading: false,
          page: 1
        });
      })
      .catch(res => {
        console.log('错误：' + res);
      });
  },

  onPullDownRefresh () {
    wx.startPullDownRefresh();
    this.onLoad();
  },

  onReachBottom () {
    this.loadMoreRecords();
  },

  loadMoreRecords () {
    if (this.data.ifLoading) return;
    this.setData({
      ifLoading: true
    });

    service.getHandledExceptions(this.data.page)
      .then(res => {
        let newRecords = res.data.records;
        for (let i in newRecords) {
          if (!newRecords.hasOwnProperty(i)) continue;
          this.data.records.push(newRecords[i]);
        }
        this.setData({
          records: this.data.records,
          page: this.data.page + 1,
          ifLoading: false
        });
      })
      .catch(res => {
        console.log('错误：' + res);
      });
  }

  // TODO
  // onReady: function () { // 监听页面初次渲染完成
  //   computed(this, {
  //     ifMore: function () { // 判断是否存在更多数据
  //       return this.data.page * this.data.size === this.data.records.length
  //     }
  //   })
  // },
});