const service = require('../../service/test');
const computed = require('../../utils/vuelike').computed;
let globalData = getApp().globalData;

Page({
  data: {
    status: 'loading',
    records: [],
    page: 0,
    size: 10
  },
  onLoad() {
    wx.setNavigationBarTitle({title: '历史异常记录'});
    this.getHandledExceptions();
  },

  getHandledExceptions () {
    this.setData({
      status: 'loading'
    });

    service.getHandledExceptions(this.data.page)
      .then(res => {
        this.setData({
          records: res.data.records,
          status: 'normal',
          page: 1
        });
      })
      .catch(res => {
        console.warn('错误：' + res);
        this.setData({
          status: 'error'
        });
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
    if (this.data.status === 'loading-more' || this.data.status === 'loading') return;

    this.setData({
      status: 'loading-more'
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
          status: 'normal'
        });
      })
      .catch(res => {
        console.log('错误：' + res);
        this.setData({
          status: 'error'
        });
      });
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

  // TODO
  // onReady: function () { // 监听页面初次渲染完成
  //   computed(this, {
  //     ifMore: function () { // 判断是否存在更多数据
  //       return this.data.page * this.data.size === this.data.records.length
  //     }
  //   })
  // },
});