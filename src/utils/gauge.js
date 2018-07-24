import * as echarts from '../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var titletext = ["title"],
      subtext = ["subtitle"],
      //lengendtext = ["北京", "武汉", "杭州", "广州", "上海"],
      graphictext1 = 'sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
      graphictext2 = '最大值：****\t最小值：****\n',
      type = 'gauge',
      data = [60],
      center=['50%','50%'],
      radius='75%';
   


//修改option参数可以改变图表的状态
  var option = {

    title: {
      show: true,//默认true
      text: titletext,
      //link:[],                                //超链接
      subtext: subtext,
      //sublnk:[],                              //超链接
      textStyle: {
        color: '#fff',                          //颜色
        fontSize: 30,                           //字体大小
        fontWeight: 'bold',                     //加粗
        //align:'right',                        //文字水平对齐方式
        //verticalAlign: 'top',                 //文字垂直对齐方式
        //fontFamily:'sans-serif',              //文字字体系列
        //lineHeight:number,                    //行高
        //textBorderColor:'transparent',        //文字描边颜色
        //textShadowColor:'color',              //阴影颜色
        //textShadowBlur:number,                //阴影长度
      },
      subtextStyle: {
        color: '#fff',
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
      itemGap: 10,                                 //主副标题间距，默认10
      left: 'center',
      top: '2%',
      backgroundColor: 'transparent',
      borderColor: 'transparent',

    },

    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '15%',
          invisible: false,
          draggable: false,
          style: {
            text: graphictext1,
            font: 'italic bolder 16px cursive',
            textAlign: 'center',
            fill: '#fff',
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '75%',
          invisible: false,
          draggable: false,
          style: {
            text: graphictext2,
            font: 'italic bolder 16px cursive',
            textAlign: 'center',
            fill: '#fff',
          }
        }
      ]
    },
    //legend:{},
    //grid:{},
    //dataZoom:{},
    //visualMap:{},
    //brush:{},                 //区域选择组件
    //tooltip:{},

    backgroundColor: "#000",
    
    series: [{

      color: ["#37A2DA", "#32C5E9", "#67E0E3"],
      type: type,
      center:center,
      radius:radius,                   //仪表盘半径
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
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      axisLabel:{},
      pointer:{
        show:true,
        length:'80%',
        width:8,
      },
      itemStyle:{},
      emphasis:{},
      //title:{},
      detail: {                       //设置文字块
        show:true,
        formatter: '{value}%'
      },
      
      data: data,

    }]
  };

  chart.setOption(option, true);     //展现图表命令
  return chart;
}

module.exports = {
  initChart: initChart
}