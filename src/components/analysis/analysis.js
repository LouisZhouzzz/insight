import * as echarts from "../../ec-canvas/echarts";

const service = require('../../service/test');

let globalData = getApp().globalData;

Component({
  properties: {
    show: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal)
          this.onShow();
        else
          this.onHide();
      }
    }
  },
  data: {
    shotPath: null,
    sideLength: 200,
    outline: { //概览面板数据
      appNum: '', //异常应用数
      exceptionNum: '', //异常总数
      point: false //系统总体评分
    },
    collections: [], //收藏列表数据
    exceptionList: [], //异常列表数据
    ifLoading: true, //标识加载态，以防多次触发上拉加载事件
    page: 0, //异常列表页码
    size: 10 //异常列表单页项数
  },

  attached () {
    this.setData({
      ifLoading: true,
      sideLength: 0.4 * globalData.windowHeight
    });

    // 向服务器请求系统概览信息与未处理的异常信息
    Promise.all([
      service.getSystem(),
      service.getUnhandledExceptions()
    ]).then(res => {
      wx.stopPullDownRefresh();
      this.setData({
        outline: res[0].data.data,
        exceptionList: res[1].data.records,
        ifLoading: false
      });
    }).catch(res => {
      wx.stopPullDownRefresh();
      console.log('error: ' + res);
      this.setData({
        ifLoading: false
      });
    });
  },
  methods: {
    onShow () {
      // this.showChart();
    },
    onHide () {

    },
    onFormSubmit(e) {
      service.patchUserFormId(globalData.openid, e.detail.formId)
        .then(res => {
          console.log('formid发送成功！');
        })
        .catch(res => {
          console.warn('formid发送失败');
        });
    }
  }
});
