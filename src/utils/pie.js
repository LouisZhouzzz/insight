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

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: [{
      type: para.chartType,
      center: TL.pieCenter,
      radius: TL.pieRadius,
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{b}:\n{d}%',
        },
      },
      //ayoutBy:'column',       //当使用dataset时，指定行对应还是列对应
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}