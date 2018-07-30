import * as echarts from "../../ec-canvas/echarts";
import geoJson from "../../ec-canvas/china";

let chart = null;

var bar = require('../../components/diagram/bar.js');
var line = require('../../components/diagram/line.js');
var pie = require('../../components/diagram/pie.js');
var map = require('../../components/diagram/map.js');
var gauge = require('../../components/diagram/gauge.js');

var barObject = {
    "chart": {
        "chartType": "bar",
        "titleText": "图表标题",
        "titleSubTex": "副标题",
        "xname": "x轴名称",
        "yname": "y轴名称",
        "graExpText": "图标说明文字",
        "graStaText": "各类统计值，如：平均值，最大值，最小值等"
    },

    "data":[
        ["product", "2012", "2013", "2014", "2015"],
        ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
        ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
        ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
    ]
};
var lineObject = {
    "chart": {
        "chartType": "line",
        "titleText": "图表标题",
        "titleSubTex": "副标题",
        "xname": "x轴名称",
        "yname": "y轴名称",
        "graExpText": "图标说明文字",
        "graStaText": "各类统计值，如：平均值，最大值，最小值等"
    },

    "data":[
        ["product", "2012", "2013", "2014", "2015"],
        ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
        ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
        ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
    ]
};
var pieObject = {
    "chart": {
        "chartType": "pie",
        "titleText": "图表标题",
        "titleSubTex": "副标题",
        "xname": "x轴名称",
        "yname": "y轴名称",
        "graExpText": "图标说明文字",
        "graStaText": "各类统计值，如：平均值，最大值，最小值等"
    },

    "data": [
        {"name": "北京", "value": 55},
        {"name": "武汉", "value": 20},
        {"name": "杭州", "value": 10},
        {"name": "广州", "value": 20},
        {"name": "上海", "value": 38}
    ]
};
var mapObject = {
    "chart": {
        "chartType": "map",
        "titleText": "图表标题",
        "titleSubTex": "副标题",
        "xname": "x轴名称",
        "yname": "y轴名称",
        "graExpText": "图标说明文字",
        "graStaText": "各类统计值，如：平均值，最大值，最小值等",
        "mapMin": 0,
        "mapMax": 1000,
    },

    data: [
        { "name": "北京", "value": "Math.round(Math.random() * 1000)" },
        { "name": "天津", "value": "Math.round(Math.random() * 1000)" },
        { "name": "上海", "value": "Math.round(Math.random() * 1000)" },
        { "name": "重庆", "value": "Math.round(Math.random() * 1000)" },
        { "name": "河北", "value": "Math.round(Math.random() * 1000)" },
        { "name": "河南", "value": "Math.round(Math.random() * 1000)" },
        { "name": "云南", "value": "Math.round(Math.random() * 1000)" },
        { "name": "辽宁", "value": "Math.round(Math.random() * 1000)" },
        { "name": "黑龙江", "value": "Math.round(Math.random() * 1000)" },
        { "name": "湖南", "value": "Math.round(Math.random() * 1000)" },
        { "name": "安徽", "value": "Math.round(Math.random() * 1000)" },
        { "name": "山东", "value": "Math.round(Math.random() * 1000)" },
        { "name": "新疆", "value": "Math.round(Math.random() * 1000)" },
        { "name": "江苏", "value": "Math.round(Math.random() * 1000)" },
        { "name": "浙江", "value": "Math.round(Math.random() * 1000)" },
        { "name": "江西", "value": "Math.round(Math.random() * 1000)" },
        { "name": "湖北", "value": "Math.round(Math.random() * 1000)" },
        { "name": "广西", "value": "Math.round(Math.random() * 1000)" },
        { "name": "甘肃", "value": "Math.round(Math.random() * 1000)" },
        { "name": "山西", "value": "Math.round(Math.random() * 1000)" },
        { "name": "内蒙古", "value": "Math.round(Math.random() * 1000)" },
        { "name": "陕西", "value": "Math.round(Math.random() * 1000)" },
        { "name": "吉林", "value": "Math.round(Math.random() * 1000)" },
        { "name": "福建", "value": "Math.round(Math.random() * 1000)" },
        { "name": "贵州", "value": "Math.round(Math.random() * 1000)" },
        { "name": "广东", "value": "Math.round(Math.random() * 1000)" },
        { "name": "青海", "value": "Math.round(Math.random() * 1000)" },
        { "name": "西藏", "value": "Math.round(Math.random() * 1000)" },
        { "name": "四川", "value": "Math.round(Math.random() * 1000)" },
        { "name": "宁夏", "value": "Math.round(Math.random() * 1000)" },
        { "name": "海南", "value": "Math.round(Math.random() * 1000)" },
        { "name": "台湾", "value": "Math.round(Math.random() * 1000)" },
        { "name": "香港", "value": "Math.round(Math.random() * 1000)" },
        { "name": "澳门", "value": "Math.round(Math.random() * 1000)" }
    ]
};
var gaugeObject = {
    "chart": {
        "chartType": "gauge",
        "titleText": "图表标题",
        "titleSubTex": "副标题",
        "xname": "x轴名称",
        "yname": "y轴名称",
        "graExpText": "图标说明文字",
        "graStaText": "各类统计值，如：平均值，最大值，最小值等"
    },

    "data": 60
};

var TL = {
    //文字颜色
    textColor: '#000',
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

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null , {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    let getOption;
    switch (mapObject.chart.chartType) {
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

    var option = getOption.getOption(mapObject.data, mapObject.chart, TL);

    chart.setOption(option);

    return chart
};

Page({

    data: {
        ec: {
            onInit: initChart
        }
    },

    onReady() {
        setTimeout(function () {
            // 获取 chart 实例的方式
            console.log(chart)
        }, 2000);
    }
});