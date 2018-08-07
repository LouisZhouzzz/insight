function getOption(localData, para, TL) {
  let tabn = 36;
  let option = {
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '0',
      containLabel: true
    },
    legend: {
      // type: 'scroll',                         //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      top: '0%',
      bottom: '0%',
      left: TL.legLeft,
      width: '100%',                            //图例组件的宽度和高度
      orient: TL.legorient,                     //默认为'horizontal'
      align: 'auto',                            //图例标记和文本对齐
      padding: 5,                               //图例内边距，默认5
      itemGap: 10,                              //图例间隔
      itemWidth: 25,                            //图例宽，默认25
      itemHeight: 14,                           //图例高，默认14
      formatter: '{name}',                      //图例文本格式 
      selectedMode: false,
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
      source: localData
    },

    series: [{
      type: para.chartType,
      center: TL.pieCenter,
      radius: TL.pieRadius,
      label: {
        normal: {
          show: true,
          position: 'outside',
          formatter: '{b}\n({d}%)',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          align: 'auto',
          verticalAlign: 'auto',
        },
      },
      labelLine: {
        length: 16,
        length2: 10,
        lineStyle: {
          width: 2
        }

      },
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
};