function getOption(localData, para, TL){
  const option = {

    legend: {
      type:'scroll',                      //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      left: TL.legLeft,
      top: TL.legTop,
      width: 'auto',                      //图例组件的宽度和高度
      height: 'auto',
      orient: TL.legorient,               //默认为'horizontal'
      formatter: '{name}',                //图例文本格式

      textStyle: {
        fontWeight: 'lighter',            //字体粗细
        fontFamily: 'sans-serif',
        fontSize: '12',
        padding: 0,
      },
    },

    grid: {
      //show: true,
      containLabel: true,
      left: TL.gridLeft,
      right: TL.gridRight,
      top: TL.gridTop,
      bottom: TL.gridBottom,
      borderWidth: 1,
    },

    xAxis: {
      show: true,
      position: 'bottom',
      type: 'category',
      name: para.xname,
      nameLocation: 'end',
      nameTextStyle: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
      },
      nameGap: 5,                         //坐标轴名称与轴线之间的距离,取默认
      nameRotate: null,
      boundaryGap: true,
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      axisTick: { //刻度线
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        //fontSize,fontWeight,align，backgroundColor等等也可以在这里面设置
      },
    },

    yAxis: {
      show: true,
      position: 'left',
      type: 'value',
      name: para.yname,
      nameLocation: 'end',
      nameGap: 10,
      boundaryGap: ['0%', '2%'],
      splitLine: {
        lineStyle: {
          type: 'dotted',
        }
      },
      axisLine: {
        show: true,
        onZero: true,
      },
    },

    dataset: {
        source: localData
    },

    series: getSeries(localData, para.chartType),
  };

  return option;
}

function getSeries(data, chartType) {
  let series = [];
  for (let i = 0; i < data[0].length - 1; i++) {
    let item = {
      name: data[i].name,
      type: chartType,
      data: data.value,
      emphasis:{
        label:{
          show:true,
          textStyle: {
            fontColor:'darkred'
          }
        }
      }
    };
    series.push(item);
  };
  return series;
}

module.exports = {
  getOption: getOption
};