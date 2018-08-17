const service = require('../../service/test');
const computed = require('../../utils/vuelike').computed;
let globalData = getApp().globalData;

Page({
  data: {
    status: 'loading',
    records: [],
    page: 0,
    size: 5,
    ifMore: true
  },
  onLoad() {
    this.getHandledExceptions();
  },

  getHandledExceptions() {
    this.setData({
      status: 'loading'
    });

    service.getHandledExceptions(this.data.page)
      .then(res => {
        this.setData({
          records: res.data.records,
          status: 'normal',
          page: 0
        });
      })
      .catch(res => {
        console.warn('错误：' + res);
        this.setData({
          status: 'error'
        });
      });
  },

  onReachBottom() {
    if (this.data.status === 'loading') return;
    this.loadMoreRecords();
  },

  loadMoreRecords() {
    if (this.data.status === 'loading-more' || this.data.status === 'loading' || !this.data.ifMore) return;
    this.setData({
      status: 'loading-more'
    });

    service.getHandledExceptions(this.data.page)
      .then(res => {
        let newRecords = res.data.records;

        // 新记录条目数少于size，判断无更多记录可加载
        if (newRecords.length < this.data.size)
          this.setData({
            ifMore: false
          });

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

  onFormSubmit (e) {
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