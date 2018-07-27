//import geoJson from './china.js';
//echarts.registerMap('china', geoJson);

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

      type: para.chartType,
      mapType: 'china',
      aspectScale: TL.mapScale,
      label: {
        normal: {
          position: 'inside',
        },
      },
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}