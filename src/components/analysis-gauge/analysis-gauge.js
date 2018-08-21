import * as echarts from "../../ec-canvas/echarts";

const gaugeStyle = require('../../components/diagram/analysis-gauge');

Component({
  properties: {
    shotPath: null,
    max: {
      type: Number,
      value: 100
    },
    point: {
      type: Number,
      value: 0
    }
  },
  data: {
    ec: { // ec-canvas 参数
      lazyLoad: true
    }
  },

  attached () {

  },

  ready () {
    this.ecComponent = this.selectComponent('#analysis-header-gauge');
    this.showChart(this.data.point);
  },

  methods: {
    showChart (val) {
      if (!this.ecComponent || this.data.shotPath) return;
      this.ecComponent.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        chart.setOption(gaugeStyle.getOption(val, 100));

        return chart;
      });

      this.ecComponent.canvasToTempFilePath({
        canvasId: 'analysis-header-gauge',
        success: (res) => {
          console.log(res.tempFilePath);
          this.setData({
            shotPath: res.tempFilePath
          });
        },
        fail: (err) => {
          wx.showToast({
            title: err,
            duration: 2000
          })
        }
      });
    },
  }
});
