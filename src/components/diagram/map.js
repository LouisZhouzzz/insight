function getOption(localData, para, TL) {
    let tabn = 36;
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
          text: textCov(para.graExpText, tabn),
          font: 'bolder 16px cursive',
          textAlign: 'left',
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
          text: ['最大值: ' + getExt(localData).max + ',\t省份: ' + extLoc(localData).maxLoc
          + '\n最小值: ' + getExt(localData).min + ',\t省份: ' + extLoc(localData).minLoc
          + '\n平均值: ' + getExt(localData).ave],
          font: 'bolder 16px cursive',
          textAlign: 'left',
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
      min: getMapExt(localData).min,
      max: getMapExt(localData).max,
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

      top: '25%',
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
            borderWidth:1.3
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

function textCov(text, n) {
    let outText = '';
    let mark = 0;
    for(let i = 0; i < text.length; i++) {
        outText += text[i];
        mark++;
        if(text[i].match(/[^\x00-\xff]/ig) != null)
            mark++;
        if(mark == n  + 1 || mark == n) {
            outText += '\n';
            mark = 0;
        }
    }
    return outText;
}

function extLoc(data) {
    let min = getExt(data).min;
    let max = getExt(data).max;
    let minLoc = '', maxLoc = '';
    for(let i in data) {
        if(data[i].value == min)
            minLoc += data[i].name + ' ';
        if(data[i].value == max)
            maxLoc += data[i].name + ' ';
    }
    return {
        minLoc: minLoc,
        maxLoc: maxLoc,
    }
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
    let n = temp[0].length -1;
    return{
        min: Math.floor(ext.min / Math.pow(10, n))*Math.pow(10, n),
        max: Math.ceil(ext.max / Math.pow(10, n))*Math.pow(10, n),
    }
}

module.exports = {
  getOption: getOption
}