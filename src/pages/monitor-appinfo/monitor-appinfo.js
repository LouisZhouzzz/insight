import * as echarts from "../../ec-canvas/echarts";

const service = require('../../service/test');
let globalData = getApp().globalData;
let showToast = require('../../utils/util').showToast;

const diagram = {
  line: require('../../components/diagram/outline-line.js'),
  pie: require('../../components/diagram/outline-pie.js')
};

const computed = require('../../utils/vuelike').computed;

Page({
  data: {
    status: 'loading',
    labels: ['业务', '联机', '批量', '性能', '资源'],
    canvasLabels: ['一年异常发生', '指标类型分布'],
    canvasValues: ['line', 'pie'],
    canvasIndex: 0,
    ec: {
      lazyLoad: true
    },
    swiperIndex: 0,
    types: [
      {
        name: '批量',
        value: 'batch',
        checked: true
      }, {
        name: '联机',
        value: 'online'
      }, {
        name: '业务',
        value: 'service'
      }, {
        name: '性能',
        value: 'performance'
      }, {
        name: '资源',
        value: 'property'
      }
    ],
    appId: null,
    appOutline: {
      app: '',
      title: '',
      bio: ''
    },
    charts: {
      line: [],
      pie: []
    },
    size: 10,
    batch: {
      name: 'batch',
      data: []
    },
    online: {
      name: 'online',
      data: []
    },
    service: {
      name: 'service',
      data: []
    },
    performance: {
      name: 'performance',
      data: []
    },
    property: {
      name: 'property',
      data: []
    }
  },
  collapse(e) {
    let type = this.data.types[this.data.swiperIndex].value;
    let list = this.data[type];
    let row = list.data[e.currentTarget.dataset.index];
    row.ifNotCollapsed = !row.ifNotCollapsed;
    this.setData({
      [type]: list
    })
  },

  onFormSubmit(e) {
    service.patchUserFormId(globalData.openid, e.detail.formId)
      .then(res => {
        console.log('formid发送成功！');
      })
      .catch(res => {
        console.log('formid发送失败');
      });
  },

  collect(e) {
    let outerIndex = e.currentTarget.dataset.outer;
    let innerIndex = e.currentTarget.dataset.index;
    let type = this.data.types[this.data.swiperIndex].value;
    let list = this.data[type];
    let ifCollected = !list.data[outerIndex].items[innerIndex].ifCollected;

    list.data[outerIndex].items[innerIndex].ifCollected = ifCollected;
    service.toggleUserDiagram(globalData.openid, e.currentTarget.dataset.id, list.data[outerIndex].items[innerIndex].ifCollected)
      .then(res => {
        this.setData({
          [type]: list
        });
        globalData.ifCollectionsChange.dashboard = true;
        showToast({
          title: (ifCollected ? '' : '取消') + '收藏成功',
        }, 1000)
      })
      .catch(res => {
        console.log('收藏状态变更失败！' + res);
        showToast({
          title: (ifCollected ? '' : '取消') + '收藏失败',
        }, 1000)
      });
  },
  canvasChange(e) {
    let index = parseInt(e.detail.value);
    this.setData({
      canvasIndex: index
    });

    let type = index === 0 ? 'line' : 'pie';

    this.ecComponents[index].init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      chart.setOption(diagram[type].getOption(this.data.charts[type]));

      return chart;
    });
  },
  radioChange(e) {
    let types = this.data.types;
    types[this.data.swiperIndex].checked = false;
    types[e.detail.value].checked = true;
    this.setData({
      types,
      swiperIndex: parseInt(e.detail.value)
    });
  },
  onLoad(option) {
    this.setData({
      appId: option.id,
      status: 'loading'
    });

    Promise.all([service.getApp(this.data.appId), service.getAppQuotas(this.data.appId, globalData.openid)])
      .then(res => {
        this.data.batch.data = res[1].data.piliang;
        this.data.online.data = res[1].data.lianji;
        this.data.service.data = res[1].data.yewu;
        this.data.performance.data = res[1].data.xingneng;
        this.data.property.data = res[1].data.ziyuan;

        this.setData({
          appOutline: res[0].data.data,
          charts: res[0].data.charts,
          batch: this.data.batch,
          online: this.data.online,
          service: this.data.service,
          performance: this.data.performance,
          property: this.data.property,
          status: 'normal'
        });
        globalData.ifCollectionsChange.monitor = false;
        this.initCharts(res[0].data.charts.line);
      })
      .catch(err => {
        this.setData({
          status: 'error'
        });
      });

    // service.getApp(this.data.appId)
    //   .then((res) => {
    //     this.setData({
    //       appOutline: res.data.data,
    //       charts: res.data.charts,
    //       status: 'normal'
    //     });
    //   })
    //   .catch((res) => {
    //     console.log('获取应用详情失败！' + res);
    //     this.setData({
    //       status: 'error'
    //     });
    //   });
    //

  },

  onShow() {
    if (globalData.ifCollectionsChange.monitor) this.getAppQuotas();
  },

  initCharts(data) {
    this.ecComponents.push(this.selectComponent('#preview-chart-1'));
    this.ecComponents.push(this.selectComponent('#preview-chart-2'));

    this.ecComponents[0].init((canvas, width, height) => {

      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      chart.setOption(diagram.line.getOption(data));
      return chart;
    });
  },

  getAppQuotas() {
    service.getAppQuotas(this.data.appId, globalData.openid)
      .then(
        (res) => {
          this.data.batch.data = res.data.piliang;
          this.data.online.data = res.data.lianji;
          this.data.service.data = res.data.yewu;
          this.data.performance.data = res.data.xingneng;
          this.data.property.data = res.data.ziyuan;
          this.setData({
            batch: this.data.batch,
            online: this.data.online,
            service: this.data.service,
            performance: this.data.performance,
            property: this.data.property
          });
          globalData.ifCollectionsChange.monitor = false;
          wx.stopPullDownRefresh();
        })
      .catch((res) => {
        wx.stopPullDownRefresh();
        console.log('获取应用指标失败！' + res);
      });
  },

  onReady() {
    this.ecComponents = [];
    computed(this, {
      canvasNavs() {
        let s = this.data.canvasLabels.map(function (e, index) {
          return {
            name: e,
            checked: false,
          }
        });
        s[this.data.canvasIndex].checked = true;

        return s;
      }
    });
  },

  onPullDownRefresh() {
    wx.startPullDownRefresh();
    this.onLoad();
  }
});