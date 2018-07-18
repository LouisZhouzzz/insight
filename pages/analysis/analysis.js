//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    outline: {
      appNum: 3,
      exceptionNum: 10,
      point: 50
    },
    windowHeight: getApp().globalData.windowHeight,
    list: [
      {
        flag: false,
        groupName: '生酮营养师应用',
        exceptions: [
          '性能异常',
          '支付异常'
        ]
      }, {
        flag: true,
        groupName: '数字园区导航应用',
        exceptions: [
          'GPS定位异常',
          '并发处理异常',
          '数据异常'
        ]
      }, {
        flag: true,
        groupName: '考勤打卡应用',
        exceptions: [
          'GPS定位异常',
          '数据异常',
          '访客人数异常',
          '流量统计异常',
          '运行异常',
          '兼容性异常',
          '系统性异常'
        ]
      }
    ]
  },

  onTapGroup: function (e) {
    var list = this.data.list;
    var row = list[e.currentTarget.dataset.index];
    row.flag = !row.flag;
    this.setData({
      list: list
    })
  },

  bindFocus: function(){
    wx.navigateTo({
      url: '../analysis-history/analysis-history'
    })
  },

  onReady: function () {
    const LINE_WIDTH = 10;
    const RADIUS = 50;
    const BACKGROUND_COLOR = '#d2d2d2';
    const ACTIVE_COLOR = '#F4D35E';

    var rate = this.data.outline.point / 100 * 2 - 0.5;

    // 页面渲染完成
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(LINE_WIDTH);
    cxt_arc.setStrokeStyle(BACKGROUND_COLOR);
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, 0, 2 * Math.PI, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(LINE_WIDTH);
    cxt_arc.setStrokeStyle(ACTIVE_COLOR);
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, -Math.PI * 1 / 2, Math.PI * rate, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();


  }

})
