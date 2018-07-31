import * as echarts from "../../ec-canvas/echarts";
import geoJson from "../../ec-canvas/china";

const service = require('../../service/test');
const bar = require('../../components/diagram/bar.js');
const line = require('../../components/diagram/line.js');
const pie = require('../../components/diagram/pie.js');
const map = require('../../components/diagram/map.js');
const gauge = require('../../components/diagram/gauge.js');
const TL = require('../../components/diagram/config.js');

Page({
    data: {
        id: null,
        ec: {
            lazyLoad: true
        }
    },
    onReady() {
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        service.getDiagram(
            (res) => {
                this.ecComponent.init((canvas, width, height) => {

                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                        width: width,
                        height: height
                    });

                    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                    this.chart = chart;

                    this.setChart(res);

                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                });
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