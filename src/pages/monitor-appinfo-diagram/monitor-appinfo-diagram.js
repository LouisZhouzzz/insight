Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: getApp().globalData.windowHeight,
    diagrams: [ // 当前指标支持的图表显示类型
      {
        type: '饼图',
        date: new Date().getTime()
      }, {
        type: '柱状图',
        date: new Date().getTime()
      }, {
        type: '点图',
        date: new Date().getTime()
      }
    ],
    currentDiagramIndex: 0
  },

  swiper: function (e) {
    this.setData({
      currentDiagramIndex: e.detail.current
    });
  }
});