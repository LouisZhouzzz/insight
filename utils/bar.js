function getOption(localData, para, TL){
  var option = {

    //color: TL.color,

    title: {
      show: true, //默认true
      text: para.titleText,
      //link:[],                                //超链接
      subtext: para.titleSubText,
      //sublnk:[],                              //超链接
      textStyle: {
        //color: TL.textColor, //颜色
        fontSize: 30, //字体大小
        fontWeight: 'bold', //加粗
        //align:'right',                        //文字水平对齐方式
        //verticalAlign: 'top',                 //文字垂直对齐方式
        //fontFamily:'sans-serif',              //文字字体系列
        //lineHeight:number,                    //行高
        //textBorderColor:'transparent',        //文字描边颜色
        //textShadowColor:'color',              //阴影颜色
        //textShadowBlur:number,                //阴影长度
      },
      subtextStyle: {
        //color: TL.textColor,
        fontSize: 16,
        //fontWeight: 'bold',                   //加粗
        //align:'right',                        //文字水平对齐方式
        //verticalAlign: 'top',                 //文字垂直对齐方式
        //fontFamily:'sans-serif',              //文字字体系列
        //lineHeight:number,                    //行高
        //textBorderColor:'transparent',        //文字描边颜色
        //textShadowColor:'color',              //阴影颜色
        //textShadowBlur:number,                //阴影长度
      },
      //padding:[number]                          //标题内边距
      itemGap: 10, //主副标题间距，默认10
      left: TL.titleLeft,
      top: TL.titleTop,
      //backgroundColor: 'transparent',
      //borderColor: 'transparent',

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


    legend: {
      //type:'scroll',                    //可滚动翻页的图例，较多时使用，缺省为普通图例
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
      //inactiveColor: '#ccc',
      //selected:{} ,                     //图例选中状态表

      //text: para.legText,
      textStyle: {
        //color: TL.textColor,
        //fontStyle:'italic',             //字体风格，默认normal
        fontWeight: 'lighter',            //字体粗细
        fontFamily: 'sans-serif',
        fontSize: '12',
        //lineHeight:number,                //行高
        //background: 'transparent',
        //border: 'transparent',
        padding: 0,
      },
      //backgroundColor: 'transparent',
    },

    grid: {
      show: false,
      containLabel: true,
      left: TL.gridLeft,
      right: TL.gridRight,
      top: TL.gridTop,
      bottom: TL.gridBottom,
      //width:'auto',
      //height:'auto',
      //containLabel:true,
      //backgroundColor: 'transparent',
      //borderColor: '#ccc',
      borderWidth: 1,
    },

    tooltip: {
      axisPointer: {
        type: 'cross',
        label: {
          show: true,
          //color: '#000',
          //backgroundcolor: '#fff',
        }
      }
    },

    xAxis: {
      show: true,
      position: 'bottom',
      type: 'category',
      name: para.xname,
      nameLocation: 'end',
      nameTextStyle: {
        //color: 'white',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
        align: 'auto',
        verticalAlign: 'auto',
      },
      nameGap: 5, //坐标轴名称与轴线之间的距离,取默认
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
          //color: '#ccc',
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
      //data: xdata,
    },

    yAxis: {
      show: true,
      position: 'left',
      type: 'value',
      name: para.yname,
      nameLocation: 'end',
      nameTextStyle: {
        //color: '#ccc',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
        align: 'auto',
        verticalAlign: 'auto',
      },
      nameGap: 5,
      boundaryGap: ['0%', '2%'],
      //min:
      //max:

      splitLine: {
        lineStyle: {
          type: 'dotted',
          //color: '#ccc'
        }
      },
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          //color: 'white'
        }
      },
    },

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: [{
      //name: 'A',
      type: para.chartType,
      //smooth: true,
      //data: data1,
    }, {
      //name: 'B',
      type: para.chartType,
      //smooth: true,
      //data: data2,
    }, {
      //name: 'C',
      type: para.chartType,
      //smooth: true,
      //data: data3,
    }, {
      type: para.chartType,
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption 
}