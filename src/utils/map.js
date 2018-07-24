//import geoJson from './china.js';
//echarts.registerMap('china', geoJson);

function getOption(localData, para, TL) {
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

    /*legend: {
      //type:'scroll',                    //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      left: TL.legLeft,
      top: TL.legTop,
      width: 'auto', //图例组件的宽度和高度
      height: 'auto',
      orient: TL.legorient, //默认为'horizontal'
      align: 'auto', //图例标记和文本对齐
      padding: 5, //图例内边距，默认5
      itemGap: 10, //图例间隔
      itemWidth: 25, //图例宽，默认25
      itemHeight: 14, //图例高，默认14
      formatter: '{name}', //图例文本格式 
      //selectedMode:false,
      inactiveColor: '#ccc',
      //selected:{} ,                     //图例选中状态表

      //text: para.legText,
      textStyle: {
        color: TL.textColor,
        //fontStyle:'italic',               //字体风格，默认normal
        fontWeight: 'lighter', //字体粗细
        fontFamily: 'sans-serif',
        fontSize: '12',
        //lineHeight:number,                //行高
        background: 'transparent',
        border: 'transparent',
        padding: 0,
      },
      backgroundColor: 'transparent',
    },*/

    /*grid: {
      show: false,
      containLabel: true,
      left: 'TL.gridLeft',
      right: TL.gridRight,
      top: TL.gridTop,
      bottom: TL.gridBottom,
      //width:'auto',
      //height:'auto',
      //containLabel:true,
      backgroundColor: 'transparent',
      borderColor: '#ccc',
      borderWidth: 1,
    },*/

    tooltip: {
      show: true,
      trigger: 'item',
      //showContent:true,                       //是否提示显示悬浮窗，以及悬浮窗的设置
      //alwaysShowContent:false,
      //triggerOn:'none',
      //confine:true,
      //formatter: '{b}:{c}\n({d}%)',
      //background:'#333',
      //borderColor:'color',
      //textStyle:{},
      //extraCssText:'box-shadow: 0 0 3px rgba(0,0,0,0.3);',
    },

    visualMap: {
      //color: ['yellow', 'lightblue'],
      min: para.mapMin,
      max: para.mapMax,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      textStyle: {
        //color: TL.textColor,
      },
      calculable: true
    },

    dataset: {
      //dimensions: Dem,
      source: localData
    },

    series: [{

      top: '25%',
      bottom: '25%',
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
        },
        emphasis: {
          textStyle: {
            //color: TL.textColor,
          }
        }
      },
      itemStyle: {
        normal: {
          //borderColor: '#389BB7',
          //areaColor: '#fff',
        },
        emphasis: {
          //areaColor: '#389BB7',
          //borderWidth: 0
        }
      },
      //animation: false,
      //data: localData
    }]
  };

  return option;
}

module.exports = {
  getOption: getOption
}