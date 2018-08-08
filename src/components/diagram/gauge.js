function getOption(localData, para, TL) {
    let tabn = 36;
  var option = {

      series: [{
      type: para.chartType,
      center: TL.gauCenter,
      radius: TL.gauRadius, //仪表盘半径
      axisLabel: {},
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