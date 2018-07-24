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
        }]
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

    series: [{
      color: ["#37A2DA", "#32C5E9", "#67E0E3"],
      type: para.chartType,
      center: TL.gauCenter,
      radius: TL.gauRadius, //仪表盘半径
      //min:
      //max:
      //startAngle:
      //endAngle:
      //splitNumber:                  //刻度分隔线段数
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
          /*color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]*/
        }
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

module.exports = {
  getOption: getOption
}