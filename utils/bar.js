import * as echarts from '../ec-canvas/echarts.js';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  //var Dem = ['product', '2012', '2013', '2014', '2015'];
  var localData = [
    ['product', '2012', '2013', '2014', '2015'],
    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
  ];

  //标题
  var title = {
    show: true,                    //显示开关
    left: 'left',
    top: 0,                        //位置
    text: '这是用来调试的图表',      //标题名
    subtext: '数据来源：ICBCSDC',   //副标题名
  };

  var option = {
    color: [],
    title: {},
    legend: {},
    grid: {},
    xAxis: {},
    yAxis: {},
    //dataZoom: [],
    //visualMap: [],
    tooltip: {},
    //axisPointer: {},
    toolbox: {},
    //brush: {},
    //timeline: {},
    //graphic: {},
    //aria: {},
    dataset: {},
    series: {}
  };

  chart.setOption({
    //color: ['#37a2da', '#32c5e9', '#67e0e3'],

    //标题
    title: {
      //id: '填写id',
      show: title.show,
      left: title.left,
      top: title.top,
      text: title.text,
      testStyle: {
        fontSize: 16,
      },
      subtext: title.subtext,
      subtextStyle: {},
      //主副标题间距
      itemGap: 10,
    },

    //图例
    legend: {
      //id: '填写id',
      show: true,
      right: 'right',
      top: '0%',
      orient: 'vertical',
      //data: [],
    },

    grid: [
      {
        show: false,
        bottom: '10%',
      },
      //{ top: '55%' }
    ],
    xAxis: [
      {
        gridIndex: 0,
        name: '年份',
        nameLocation: 'center',
        type: 'category',
        position: 'bottom',
        inverse: false,
        min: 'datamin',
        max: 'datamax',
        axisLine: {},
        axisTick: {},
        axisLabel: {},
        axisPointer: {},
      },
      //{ type: 'category', gridIndex: 1 }
    ],
    yAxis: [
      {
        gridIndex: 0,
        name: '销量',
        nameLocation: '40%',
        nameTextStyle: {},
        boundaryGap: true,
      },
      //{ gridIndex: 1 }
    ],

    dataset: {
      //dimensions: Dem,
      source: localData
    },
    
    series: [
      // These series are in the first grid.
      { type: 'bar', seriesLayoutBy: 'row' },
      { type: 'bar', seriesLayoutBy: 'row' },
      { type: 'bar', seriesLayoutBy: 'row' }
      // These series are in the second grid.
      /*{
        type: 'bar',
        encode: {
          x: 0,
          y: 1
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        type: 'bar',
        encode: {
          x: 'product',
          y: '2013'
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        type: 'bar',
        encode: {
          x: 'product',
          y: '2014'
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        type: 'bar',
        encode: {
          x: 'product',
          y: '2015'
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }*/
    ]
  })

  chart.setOption(option);
  return chart;
}

module.exports = {
  initChart: initChart
}
