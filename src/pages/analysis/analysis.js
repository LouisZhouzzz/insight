const service = require('../../service/test');
import {BACKGROUND_COLOR, ACTIVE_COLOR} from '../../config/config'
let globalData = getApp().globalData;

Page({
  data: {
    labels: ['存在异常', '收藏夹'],
    outline: { //概览面板数据
      appNum: '', //异常应用数
      exceptionNum: '', //异常总数
      point: '' //系统总体评分
    },
    collections: [], //收藏列表数据
    exceptionList: [], //异常列表数据
    ifLoading: true, //标识加载态，以防多次触发上拉加载事件
    page: 0, //异常列表页码
    size: 10 //异常列表单页项数
  },

  onLoad: function () {
    this.setData({
      ifLoading: true
    });
    service.getSystem(
      (res) => {
        this.setData({
          outline: res.data
        });
        this.drawCircleProcess();
      },
      (res) => {
      }
    );
    service.getUserDiagrams(
      (res) => {
        this.setData({
          collections: res.records
        });
      },
      (res) => {
      },
      getApp().globalData.openid
    );

    service.getUnhandledExceptions(
      (res) => {
        this.setData({
          exceptionList: res.records,
          page: this.data.page + 1
        });
        setTimeout(() => {
          this.setData({
            ifLoading: false
          })
        }, 1000);
        wx.stopPullDownRefresh()
      },
      (res) => {
        setTimeout(() => {
          this.setData({
            ifLoading: false
          })
        }, 1000);
        wx.stopPullDownRefresh()
      },
      this.data.page,
      this.data.size
    );

  },

  onFormSubmit: function (e) {
    service.patchUserFormId(
      (res) => {
        console.log(res);
      },
      (res) => {
      },
      getApp().globalData.openid,
      e.detail.formId
    );
  },

  loadExceptionList: function () {
    if (this.data.ifLoading) return;

    this.setData({
      ifLoading: true
    });

    service.getUnhandledExceptions(
      (res) => {
        let list = this.data.exceptionList;
        for (let i = 0; i < res.records.length; i++) {
          list.push(res.records[i]);
        }
        this.setData({
          exceptionList: list,
          page: this.data.page + 1,
          ifLoading: false
        });
      },
      (res) => {
        this.setData({
          ifLoading: false
        });
      },
      this.data.page,
      this.data.size
    );
  },

  onHide: function () {
    // 生命周期函数--监听页面隐藏
    wx.hideNavigationBarLoading();
  },

  onPullDownRefresh: function () {
    wx.startPullDownRefresh();
    if (this.data.ifLoading) return;
    this.onLoad();
  },

  drawCircleProcess: function () { // 绘制分析界面的概览圆
    const LINE_WIDTH = 10;
    const RADIUS = 50;

    let rate = this.data.outline.point / 100 * 2 - 0.5;

    // 页面渲染完成
    let cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(LINE_WIDTH);
    cxt_arc.setStrokeStyle(BACKGROUND_COLOR);
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, 0, 2 * Math.PI, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(LINE_WIDTH);
    cxt_arc.setStrokeStyle(ACTIVE_COLOR);
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, -Math.PI * 1 / 2, Math.PI * rate, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  },

  delCollection (e) {
    let diagramId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    service.toggleUserDiagram(
      (res) => {
        let collections = this.data.collections;
        collections.splice(index, 1);
        this.setData({
          collections: collections
        })
      },
      (res) => {

      },
      globalData.openid,
      diagramId,
      false
    )
  }
});
