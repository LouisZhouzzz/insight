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
        }]
    },


    series: [{
      type: para.chartType,
      center: TL.gauCenter,
      radius: TL.gauRadius, //仪表盘半径
      pointer: {
        show: true,
        length: '80%',
        width: '6%',
      },
      //设置文字块
      detail: { 
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