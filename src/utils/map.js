function getOption(localData, para, TL) {
  var option = {

    title: {
      show: true, //默认true
      text: para.titleText,
      subtext: para.titleSubText,
      textStyle: {
        fontSize: 30,                             //字体大小
        fontWeight: 'bold',                       //加粗
      },
      subtextStyle: {
        fontSize: 16,
      },
      //padding:[number]                          //标题内边距
      itemGap: 10,                                //主副标题间距，默认10
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

    tooltip: {
      show: true,
      trigger: 'item',
    },

    visualMap: {
      min: para.mapMin,
      max: para.mapMax,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: [{

      top: '24%',
      bottom: '25%',
      left: '1%',
      right: '1%',

      type: para.chartType,
      mapType: 'china',
      //center: TL.mapCenter,
      aspectScale: TL.mapScale,
      //nameMap:{},自定义地区名称映射
      label: {
        normal: {
          //show: true,
          position: 'inside',
        },
        emphasis: {
          textStyle: {   
          }
        }
      },
      itemStyle: {
        normal: {
        },
        emphasis: {       
        }
      },
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}