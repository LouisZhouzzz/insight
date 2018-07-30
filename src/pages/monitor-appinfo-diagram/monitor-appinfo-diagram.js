import * as echarts from "../../ec-canvas/echarts";
import geoJson from "../../ec-canvas/china";

const service = require('../../service/test');
const bar = require('../../components/diagram/bar.js');
const line = require('../../components/diagram/line.js');
const pie = require('../../components/diagram/pie.js');
const map = require('../../components/diagram/map.js');
const gauge = require('../../components/diagram/gauge.js');

const TL = require('../../components/diagram/config.js');

let chart = null;

Page({
    data: {
        id: null,
        ec: {
            onInit: function (canvas, width, height) {
                chart = echarts.init(canvas, null , {
                    width: width,
                    height: height
                });
                canvas.setChart(chart);
                return chart
            }
        }
    },
    onReady () {
        service.getDiagram(
            (res) => {
                this.setChart(res);
            },
            () => {
            },
            this.data.id
        );
    },

    onLoad (data) {
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

        let option = type.getOption(bundle.data, bundle.chart, TL);

        chart.setOption(option);
    }
});