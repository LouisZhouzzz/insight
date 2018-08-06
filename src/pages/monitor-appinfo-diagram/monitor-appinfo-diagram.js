import * as echarts from "../../ec-canvas/echarts";
import geoJson from "../../ec-canvas/china";

const service = require('../../service/test');
const bar = require('../../components/diagram/bar.js');
const line = require('../../components/diagram/line.js');
const pie = require('../../components/diagram/pie.js');
const map = require('../../components/diagram/map.js');
const gauge = require('../../components/diagram/gauge.js');
const TL = require('../../components/diagram/config.js');
const chartInit = require('../../components/diagram/eCharts').init;

Page({
  data: {
    id: null,
    ec: {
      lazyLoad: true
    },
    progresses: [{
      key: '最大值',
      value: 80
    }, {
      key: '平均值',
      value: 70
    }, {
      key: '最小值',
      value: 30
    }
    ]
  },
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    service.getDiagram(
      (res) => {
        this.ecComponent.init(chartInit(res));

      },
      () => {
      },
      this.data.id
    );
  },

  onLoad(data) {
    this.setData({
      id: data.id
    });
  },

  setChart(bundle) {
    let type;
    switch (bundle.chart.chartType) {
      case 'bar':
        type = bar;
        break;
      case 'line':
        type = line;
        break;
      case 'pie':
        type = pie;
        break;
      case 'gauge':
        type = gauge;
        break;
      case 'map':
        type = map;
        echarts.registerMap('china', geoJson);
        break;
    }

    this.chart.setOption(type.getOption(bundle.data, bundle.chart, TL));
  }
});