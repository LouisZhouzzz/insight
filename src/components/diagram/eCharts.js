import * as echarts from '../../ec-canvas/echarts';
import geoJson from '../../ec-canvas/china.js';

require('../../ec-canvas/dark.js');

const bar = require('bar');
const line = require('line');
const map = require('map');
const gauge = require('gauge');
const pie = require('pie');

 //入参
 var para = {
    chartType: 'line', //图表类型
    titleText: 'title', //标题
    titleSubText: 'subtitle', //副标题
    //柱状图&折线图坐标轴名称
    xname: 'x',
    yname: 'y',
    graExpText: 'explaination', //说明
    graStaText: 'statistic', //统计值
    //地图visual Map指标
    mapMin: 0,
    mapMax: 1000,
};
//主题与布局参数
var TL = {
    //文字颜色
    textColor: /*'#DDA0DD',*/'#E1FFFF',
    //标题布局
    titleLeft: 'center',
    titleTop: '2%',
    //图例布局
    legLeft: 'center',
    legTop: '20%',
    legorient: 'horizontal',
    //附加文本栏布局
    graExpLeft: 'center',
    graExpTop: '15%',
    graStaLeft: 'center',
    graStaTop: '80%',
    //柱状图&折线图网格布局
    gridLeft: '5%',
    gridRight: '10%',
    gridTop: '30%',
    gridBottom: '25%',
    //饼图参数
    pieCenter: ['50%', '50%'], //圆心位置
    pieRadius: ['25%', '75%'], //半径
    //仪表盘参数
    gauCenter: ['50%', '50%'], //圆心位置
    gauRadius: '75%', //半径
    //地图参数
    mapCenter: [], //当前视角的中心点，用经纬度表示
    mapScale: 0.75, //地图长宽比，默认0.75
};
//数据
var localData = [
    /***************柱状图&折线图****************/
    ['product', '2012', '2013', '2014', '2015'],
    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
    /*******************************************/

    /******************仪表盘*******************
     60,
     /******************************************/

    /*******************饼图********************
     {value: 55, name: '北京'},
     {value: 20, name: '武汉'},
     {value: 10, name: '杭州'},
     {value: 20, name: '广州'},
     {value: 38, name: '上海'},
     /******************************************/

    /**************************地图**************************
     { name: '北京', value: Math.round(Math.random() * 1000) },
     { name: '天津', value: Math.round(Math.random() * 1000) },
     { name: '上海', value: Math.round(Math.random() * 1000) },
     { name: '重庆', value: Math.round(Math.random() * 1000) },
     { name: '河北', value: Math.round(Math.random() * 1000) },
     { name: '河南', value: Math.round(Math.random() * 1000) },
     { name: '云南', value: Math.round(Math.random() * 1000) },
     { name: '辽宁', value: Math.round(Math.random() * 1000) },
     { name: '黑龙江', value: Math.round(Math.random() * 1000) },
     { name: '湖南', value: Math.round(Math.random() * 1000) },
     { name: '安徽', value: Math.round(Math.random() * 1000) },
     { name: '山东', value: Math.round(Math.random() * 1000) },
     { name: '新疆', value: Math.round(Math.random() * 1000) },
     { name: '江苏', value: Math.round(Math.random() * 1000) },
     { name: '浙江', value: Math.round(Math.random() * 1000) },
     { name: '江西', value: Math.round(Math.random() * 1000) },
     { name: '湖北', value: Math.round(Math.random() * 1000) },
     { name: '广西', value: Math.round(Math.random() * 1000) },
     { name: '甘肃', value: Math.round(Math.random() * 1000) },
     { name: '山西', value: Math.round(Math.random() * 1000) },
     { name: '内蒙古', value: Math.round(Math.random() * 1000) },
     { name: '陕西', value: Math.round(Math.random() * 1000) },
     { name: '吉林', value: Math.round(Math.random() * 1000) },
     { name: '福建', value: Math.round(Math.random() * 1000) },
     { name: '贵州', value: Math.round(Math.random() * 1000) },
     { name: '广东', value: Math.round(Math.random() * 1000) },
     { name: '青海', value: Math.round(Math.random() * 1000) },
     { name: '西藏', value: Math.round(Math.random() * 1000) },
     { name: '四川', value: Math.round(Math.random() * 1000) },
     { name: '宁夏', value: Math.round(Math.random() * 1000) },
     { name: '海南', value: Math.round(Math.random() * 1000) },
     { name: '台湾', value: Math.round(Math.random() * 1000) },
     { name: '香港', value: Math.round(Math.random() * 1000) },
     { name: '澳门', value: Math.round(Math.random() * 1000) },
     /********************************************************/
];

var maxNum = 500; //单条数据量阈值上限
var minNum = 4; //单条数据量阈值下限

if (localData.length > maxNum) {
    //截取后Maxnum条数据
    localData[0] = localData[0].slice(-maxNum);
    localData[1] = localData[1].slice(-maxNum);
    localData[2] = localData[2].slice(-maxNum);
    localData[3] = localData[3].slice(-maxNum);
} else if (localData.length < minNum) {
    TL.gridLeft = '20%', TL.gridRight = '30%';
}

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, 'infographic', {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    let getOption;
    switch (para.chartType) {
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

    var option = getOption.getOption(localData, para, TL);

    chart.setOption(option);

    return chart;
};

module.exports = {
    initChart: initChart
}