import * as echarts from "../../ec-canvas/echarts";

const service = require('../../service/test');
const analysisPie = require('../../components/diagram/analysis-pie');
import {BACKGROUND_COLOR, ACTIVE_COLOR} from '../../config/config';

let globalData = getApp().globalData;

Page({
  data: {
    confirmModalShow: false,
    sideLength: 200,
    ec: {
      lazyLoad: false
    },
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

  openConfirmModal() {
    this.setData({
      confirmModalShow: true
    });
    return new Promise((resolve, reject) => {
      this.onConfirmEvent = (e) => {
        if (e.detail) resolve();
        else reject();
        this.setData({
          confirmModalShow: false
        });
      }
    })
  },

  onReady() {
    this.scoreRing = this.selectComponent('#analysis-pie');
  },

  // 绘制分数面板
  showScoreAnim(value, max) {
    let sideLength = this.data.sideLength;
    let lineWidth = 6;
    let fontSize = 60;
    let radius = (sideLength - lineWidth) / 2;

    let colors = [
      [240, 101, 67],
      [244, 224, 77],
      [6, 214, 160],
    ];

    let ctx = wx.createCanvasContext('canvasArc');
    let t = 0;
    let timer = setInterval(() => {
      let frames = 50;
      let i = 0;
      if (t > 50) i = 1;

      let r = cubicEaseOut(t, colors[i][0], colors[i + 1][0] - colors[i][0], frames);
      let g = cubicEaseOut(t, colors[i][1], colors[i + 1][1] - colors[i][1], frames);
      let b = cubicEaseOut(t, colors[i][2], colors[i + 1][2] - colors[i][2], frames);

      t++;
      ctx.setLineWidth(lineWidth);
      ctx.setStrokeStyle('#eee');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(radius + lineWidth / 2, radius + lineWidth / 2, radius, 0, 2 * Math.PI, false);
      ctx.stroke();

      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.strokeStyle = 'rgb(' + [r, g, b].join() + ')';
      ctx.beginPath();
      ctx.arc(radius + lineWidth / 2, radius + lineWidth / 2, radius, -Math.PI / 2, 2 * Math.PI * (t / max) - Math.PI / 2, false);
      ctx.stroke();

      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = 'center';//文本水平对齐
      ctx.textBaseline = 'middle';//文本垂直方向，基线位置
      ctx.fillText(t + '', sideLength / 2, sideLength / 2 - fontSize / 2); // x,y分别设置两条基线位置

      ctx.setLineWidth(2);
      ctx.strokeStyle = '#eee';
      ctx.moveTo(fontSize, sideLength / 2 + 20);
      ctx.lineTo(sideLength - fontSize, sideLength / 2 + 20);
      ctx.stroke();

      ctx.font = "16px Arial";
      ctx.fillText('出现 ' + this.data.outline.exceptionNum + ' 个异常', sideLength / 2, sideLength / 4 * 3);

      ctx.draw();

      if (t >= value) {
        clearInterval(timer);
      }
    }, 15);

    // 动画算法，这里使用Cubic.easeOut算法
    function cubicEaseOut(t, b, c, d) {
      // return c * ((t = t/d - 1) * t * t + 1) + b;
      if (t > 50) return c * (t - 50) / d + b;
      else return c * (t / d) + b;
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'insight' });
    this.setData({
      ifLoading: true
    });
    service.getSystem(
      (res) => {
        this.setData({
          outline: res.data
        });
        this.setData({
          sideLength: 0.4 * globalData.windowHeight
        });
        this.showScoreAnim(this.data.outline.point, 100);
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

  delCollection(e) {
    let diagramId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.openConfirmModal().then(
      () => {
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
      },
      () => {
        console.log('取消了呗~');
      }
    );
  }
});
