import * as echarts from '../../ec-canvas/echarts';
import geoJson from '../../ec-canvas/china.js';
import deepblue from '../../ec-canvas/deepblue';


const bar = require('bar');
const line = require('line');
const map = require('map');
const gauge = require('gauge');
const pie = require('pie');
const TL = require('config');

function init(bundle) {
    let maxNum; //单条数据量阈值上限
    if (bundle.chart.chartType == 'bar')
        maxNum = 30;
    else if (bundle.chart.chartType == 'line')
        maxNum = 365;
    let minNum = 4; //单条数据量阈值下限
    if (bundle.data.length > maxNum) {
        //截取后Maxnum条数据
        bundle.data[0] = bundle.data[0].slice(-maxNum);
        bundle.data[1] = bundle.data[1].slice(-maxNum);
        bundle.data[2] = bundle.data[2].slice(-maxNum);
        bundle.data[3] = bundle.data[3].slice(-maxNum);
    } else if (bundle.data.length < minNum) {
        TL.gridLeft = '20%', TL.gridRight = '30%';
    }

    return (canvas, width, height) => {
        let chart = echarts.init(canvas, 'deepblue', {
            width: width,
            height: height
        });
        canvas.setChart(chart);

        let getOption;
        switch (bundle.chart.chartType) {
            case 'bar':
                getOption = bar;
                break;
            case 'line':
                getOption = line;
                break;
            case 'pie':
                getOption = pie;
                break;
            case 'gauge':
                getOption = gauge;
                break;
            case 'map':
                getOption = map;
                echarts.registerMap('china', geoJson);
                break;
        }

        const option = getOption.getOption(bundle.data, bundle.chart, TL);

        chart.setOption(option);

        return chart;
    };
}

module.exports = {
    init: init
};