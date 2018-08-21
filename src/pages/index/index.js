const watch = require('../../utils/vuelike').watch;

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
  }
});