Page({
  data: {
    tabIndex: 0,
    outline: { //概览面板数据
      appNum: '', //异常应用数
      exceptionNum: '', //异常总数
      point: '' //系统总体评分
    },
  },
  onReady () {
    this.tabPage = {};
    this.tabPage.analysis = this.selectComponent('#analysis');
    this.tabPage.monitor = this.selectComponent('#monitor');
    this.tabPage.dashboard = this.selectComponent('#dashboard');
  },
  switchTab (e) {
    this.setData({
      tabIndex: parseInt(e.currentTarget.dataset.index)
    });
  }
});