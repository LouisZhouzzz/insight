const watch = require('../../utils/vuelike').watch;
const service = require('../../service/test');
let globalData = getApp().globalData;

Page({
  data: {
    tabIndex: -1,
    outline: { //概览面板数据
      appNum: '', //异常应用数
      exceptionNum: '', //异常总数
      point: '' //系统总体评分
    },
    firstLoaded: {
      analysis: false,
      monitor: false,
      dashboard: false
    }
  },
  onLoad () {
    watch(this, {
      tabIndex: (val) => {
        if (!this.tabPage[val].firstLoaded) {
          this.tabPage[val].firstLoaded = true;
          this.tabPage[val].el.onLoad && this.tabPage[val].el.onLoad();
        }
      }
    })
  },
  onReady () {
    this.tabPage = [];
    this.tabPage.push({
      firstLoaded: false,
      el: this.selectComponent('#analysis')
    });
    this.tabPage.push({
      firstLoaded: false,
      el: this.selectComponent('#monitor')
    });
    this.tabPage.push({
      firstLoaded: false,
      el: this.selectComponent('#dashboard')
    });

    this.setData({
      tabIndex: 0
    });
  },
  switchTab (e) {
    this.setData({
      tabIndex: parseInt(e.currentTarget.dataset.index)
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
});