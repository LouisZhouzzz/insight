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
      //orient:'horizontal',
      bottom: '0%',
      itemHeight:60,
      itemWidth:10,
      //text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },

    dataset: {
      source: localData
    },

    series: [{

      top: '0%',
      left: '3%',
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

function getExt(data) {
    let arr = new Array;
    let ave = 0;
    for(let i in data) {
        arr.push(data[i].value);
        ave += arr[i];
    }
    ave /= arr.length;

    return {
        min: Math.min.apply(Math, arr),
        max: Math.max.apply(Math, arr),
        ave: ave.toFixed(2),
    }
}

function getMapExt(data) {
    let ext = getExt(data);
    let temp = ext.max.toString().split('.');
    let temp1 = ext.min.toString().split('.');
    let n = temp[0].length -1;
    let m = temp1[0].length -1;
    let precision = 0;
    if(ext.min<1){
        precision = 2
    };
    return{
        min: Math.floor(ext.min / Math.pow(10, m))*Math.pow(10, m),
        max: Math.ceil(ext.max / Math.pow(10, n))*Math.pow(10, n),
        precision:precision
    }
}

module.exports = {
  getOption: getOption
}