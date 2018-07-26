function getOption(localData, para, TL) {
  var option = {

    title: {
      show: true, //默认true
      text: para.titleText,
      subtext: para.titleSubText,
      textStyle: {
        fontSize: 30,                           //字体大小
        fontWeight: 'bold',                     //加粗
      },
      subtextStyle: {
        fontSize: 16,
      },
      //padding:[number]                        //标题内边距
      itemGap: 10,                              //主副标题间距，默认10
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
        }]
    },

    series: [{
      type: para.chartType,
      center: TL.gauCenter,
      radius: TL.gauRadius, //仪表盘半径
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
        }
      },
      axisLabel: {},
      pointer: {
        show: true,
        length: '80%',
        width: '6%',
      },
      itemStyle: {},
      emphasis: {},
      //title:{},
      detail: { //设置文字块
        show: true,
        formatter: '{value}%'
      },
      data: localData,
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}