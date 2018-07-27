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
      show: true,
      containLabel: true,
      left: TL.gridLeft,
      right: TL.gridRight,
      top: TL.gridTop,
      bottom: TL.gridBottom,
    },

    tooltip: {
      axisPointer: {
        type: 'cross',
        label: {
          show: true,
        }
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
      splitLine: {
        lineStyle: {
          type: 'dotted',
        }
      },
      axisLine: {
        show: true,
        onZero: true,
      },
    },

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: getSeries(localData, para.chartType),
  };

  return option;
}

function getSeries(data, chartType) {
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    var item = {
      name: data[i].name,
      type: chartType,
      data: data.value
    }
    serie.push(item);
  };
  return serie;
}

module.exports = {
  getOption: getOption
}