function getOption(localData, para, TL) {
    let tabn = 36;
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
            text: textCov(para.graExpText, tabn),
            font: 'bolder 16px cursive',
            textAlign: 'left',
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

module.exports = {
  getOption: getOption
}