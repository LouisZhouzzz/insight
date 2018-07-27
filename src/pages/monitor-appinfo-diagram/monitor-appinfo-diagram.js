let chart = null;
var initChart = require('../../components/diagram/eCharts.js');
Page({

    data: {
        ec: {
            onInit: initChart.initChart
        }
    },
    onReady() {
        setTimeout(function () {
            // 获取 chart 实例的方式
            console.log(chart)
        }, 2000);
    }
});