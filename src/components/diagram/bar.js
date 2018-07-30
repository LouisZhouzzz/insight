function getOption(localData, para, TL){
  var option = {

    title: {
      show: true, //默认true
      text: para.titleText,
      subtext: para.titleSubText,
      textStyle: {
        fontSize: 30, //字体大小
        fontWeight: 'bold', //加粗
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
          text: para.graExpText,
          font: 'bolder 16px cursive',
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
          font: 'bolder 16px cursive',
          textAlign: 'center',
          fill: TL.textColor,
        }
      }
      ]
    },


    legend: {
      type:'scroll',                      //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      left: TL.legLeft,
      top: TL.legTop,
      width: 'auto',                      //图例组件的宽度和高度
      height: 'auto',
      orient: TL.legorient,               //默认为'horizontal'
      align: 'auto',                      //图例标记和文本对齐
      padding: 5,                         //图例内边距，默认5
      itemGap: 10,                        //图例间隔
      itemWidth: 25,                      //图例宽，默认25
      itemHeight: 14,                     //图例高，默认14
      formatter: '{name}',                //图例文本格式 
      //selectedMode:false,
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

    /*tooltip: {
      trigger:'axis',
      axisPointer: {
        type: 'cross',
        //snap:true,
        label: {
          show: true,
        }
      }
    },*/

    xAxis: {
      show: true,
      position: 'bottom',
      type: 'category',
      nameLocation: 'end',
      nameTextStyle: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
      },
      nameGap: 5,                         //坐标轴名称与轴线之间的距离,取默认
      nameRotate: null,
      //boundaryGap:['20%','20%'],
      boundaryGap: true,
      //xmin:
      //xmax:
      //triggerEvent:true,
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
      //splitLine:{},             //设置分隔线
    },

    yAxis: {
      show: true,
      position: 'left',
      type: 'value',
      name: para.yname,
      nameLocation: 'end',
      nameTextStyle: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
        align: 'auto',
        verticalAlign: 'auto',
      },
      nameGap: 5,
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
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    var item = {
      name: data[i].name,
      type: chartType,
      data: data.value,
      emphasis:{
        label:{
          show:true
        }
      }
    }
    serie.push(item);
  };
  return serie;
}

module.exports = {
  getOption: getOption
}