import * as echarts from "../../ec-canvas/echarts";

const service = require('../../service/test');
const chartInit = require('../../components/diagram/eCharts').init;
const staBar = require('../../components/diagram/sta-bar');

Page({
  data: {
    id: null,
    ec: {
      lazyLoad: true
    },
    graExpText: ''
  },
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.staBarComponent = this.selectComponent('#sta-bar');
    service.getDiagram(this.data.id)
      .then(
        (res) => {
          // 设置标题
          wx.setNavigationBarTitle({title: res.data.chart.titleText});
          // 设置介绍文本
          this.setData({
            graExpText: res.data.chart.graExpText
          });
          // 加载图表
          this.ecComponent.init(chartInit(res.data));

          this.staBarComponent.init((canvas, width, height) => {
            let chart = echarts.init(canvas, {
              width: width,
              height: height
            });
            canvas.setChart(chart);

            const option = staBar.getOption(res.data.sta);

            chart.setOption(option);

            return chart;
          })
        })
      .catch((res) => {
          console.warn('获取图表信息失败！' + res)
        }
      );
  },

  onLoad(data) {
    this.setData({
      id: data.id
    });
  }
});