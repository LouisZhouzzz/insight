function getOption(localData, para, TL) {
  var option = {

    tooltip: {
      show: true,
      trigger: 'item',
    },

    visualMap: {
      min: getMapExt(localData).min,
      max: getMapExt(localData).max,
      precision:getMapExt(localData).precision,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },

    dataset: {
      source: localData
    },

    series: [{

      top: '0%',
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
          color: '#A5EFEF',
        },
        emphasis: {
          textStyle: {
            //color: '#4B0082', 
            color:'#2c75b3'
          }
        }
      },
      itemStyle: {
        normal: {
            borderColor:'rgba(255,255,255,0.6)',
            borderWidth:2
        },
        emphasis: {
          areaColor:'yellow'
          //areaColor: '#A5EFEF'      
        }
      },
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}