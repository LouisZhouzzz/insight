function getOption(localData, para, TL) {
  var option = {

    title: {
      show: true, //默认true
      text: para.titleText,
      //link:[],                                //超链接
      subtext: para.titleSubText,
      //sublnk:[],                              //超链接
      left: TL.titleLeft,
      top: TL.titleTop,
    },

    graphic: {
      elements: [{
          type: 'text',
          left: TL.graExpLeft,
          top: TL.graExpTop,
          invisible: false,
          draggable: false,
          style: {
            text: para.graExpText,
            font: 'italic bolder 16px cursive',
            textAlign: 'center',
            fill: TL.textColor,
          }
        },
        {
          type: 'text',
          left: TL.graStaLeft,
          top: TL.graStaTop,
          invisible: false,
          draggable: false,
          style: {
            text: para.graStaText,
            font: 'italic bolder 16px cursive',
            textAlign: 'center',
            fill: TL.textColor,
          }
        }
      ]
    },

    legend: {
      show: true,
      left: TL.legLeft,
      top: TL.legTop,
      orient: TL.legorient, //默认为'horizontal'
      formatter: '{name}', //图例文本格式 
    },

    grid: {
      show: false,
      containLabel: true,
      left: TL.gridLeft,
      right: TL.gridRight,
      top: TL.gridTop,
      bottom: TL.gridBottom,
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },

    xAxis: {
      show: true,
      position: 'bottom',
      type: 'category',
      name: para.xname,
      nameLocation: 'end',
      axisLine: {
        show: true,
        onZero: true,
      },
      axisTick: { //刻度线
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
      },
    },

    yAxis: {
      show: true,
      position: 'left',
      type: 'value',
      name: para.yname,
      nameLocation: 'end',
      splitLine: {},
      axisLine: {
        show: true,
        onZero: true,
      },
    },

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: [{
      type: para.chartType,
    }, {
      type: para.chartType,
    }, {
      type: para.chartType,
    }, {
      type: para.chartType,
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}