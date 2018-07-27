function getOption(localData, para, TL) {
  var option = {
    title: {
      show: true,                                 //默认true
      text: para.titleText,   
      subtext: para.titleSubText,   
      textStyle: {
        fontSize: 30,                              //字体大小
        fontWeight: 'bold',                        //加粗
      },
      subtextStyle: {
        color: TL.textColor,
        fontSize: 16,
      },
      itemGap: 10,                                 //主副标题间距，默认10
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
      type:'scroll',                         //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      left: TL.legLeft,
      top: TL.legTop,
      width: '80%',                            //图例组件的宽度和高度
      height: 'auto',
      orient: TL.legorient,                     //默认为'horizontal'
      align: 'auto',                            //图例标记和文本对齐
      padding: 5,                               //图例内边距，默认5
      itemGap: 10,                              //图例间隔
      itemWidth: 25,                            //图例宽，默认25
      itemHeight: 14,                           //图例高，默认14
      formatter: '{name}',                      //图例文本格式 
      selectedMode:false,
      
      textStyle: {
        fontWeight: 'lighter',                  //字体粗细
        fontFamily: 'sans-serif',
        fontSize: '12',
        background: 'transparent',
        border: 'transparent',
        padding: 0,
      },
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
          formatter: '{b}\n({d}%)',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          align: 'auto',
          verticalAlign: 'auto',
        },
      },
      labelLine: {},
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderType: 'solid',
          //shadowBlur:5,
        },
        emphasis: {
          label: {
            //formatter: "{b}:{c}\n{d}%",
            formatter: "{b}\n{d}%",
            position: 'inner',
            fontFamily: 'san-serif',
            fontStyle: 'normal',
            fontSize: '14',
            fontWeight: 'bold',
          }
        }
      },
      //ayoutBy:'column',       //当使用dataset时，指定行对应还是列对应
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}