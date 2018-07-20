import * as echarts from '../ec-canvas/echarts';
import geoJson from './china.js';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  echarts.registerMap('china', geoJson);

  var titletext = ["title"],
      subtext = ["subtitle"],
      type = 'map',
      graphictext1 = 'sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
      graphictext2 = '需要展示的统计数据，如最大：***',
      center=[],             //当前视角的中心点，用经纬度表示
      aspectscale=0.6       //地图长宽比，默认0.75

  var localData = [
    { name: '北京', value: Math.round(Math.random() * 1000) },
    { name: '天津', value: Math.round(Math.random() * 1000) },
    { name: '上海', value: Math.round(Math.random() * 1000) },
    { name: '重庆', value: Math.round(Math.random() * 1000) },
    { name: '河北', value: Math.round(Math.random() * 1000) },
    { name: '河南', value: Math.round(Math.random() * 1000) },
    { name: '云南', value: Math.round(Math.random() * 1000) },
    { name: '辽宁', value: Math.round(Math.random() * 1000) },
    { name: '黑龙江', value: Math.round(Math.random() * 1000) },
    { name: '湖南', value: Math.round(Math.random() * 1000) },
    { name: '安徽', value: Math.round(Math.random() * 1000) },
    { name: '山东', value: Math.round(Math.random() * 1000) },
    { name: '新疆', value: Math.round(Math.random() * 1000) },
    { name: '江苏', value: Math.round(Math.random() * 1000) },
    { name: '浙江', value: Math.round(Math.random() * 1000) },
    { name: '江西', value: Math.round(Math.random() * 1000) },
    { name: '湖北', value: Math.round(Math.random() * 1000) },
    { name: '广西', value: Math.round(Math.random() * 1000) },
    { name: '甘肃', value: Math.round(Math.random() * 1000) },
    { name: '山西', value: Math.round(Math.random() * 1000) },
    { name: '内蒙古', value: Math.round(Math.random() * 1000) },
    { name: '陕西', value: Math.round(Math.random() * 1000) },
    { name: '吉林', value: Math.round(Math.random() * 1000) },
    { name: '福建', value: Math.round(Math.random() * 1000) },
    { name: '贵州', value: Math.round(Math.random() * 1000) },
    { name: '广东', value: Math.round(Math.random() * 1000) },
    { name: '青海', value: Math.round(Math.random() * 1000) },
    { name: '西藏', value: Math.round(Math.random() * 1000) },
    { name: '四川', value: Math.round(Math.random() * 1000) },
    { name: '宁夏', value: Math.round(Math.random() * 1000) },
    { name: '海南', value: Math.round(Math.random() * 1000) },
    { name: '台湾', value: Math.round(Math.random() * 1000) },
    { name: '香港', value: Math.round(Math.random() * 1000) },
    { name: '澳门', value: Math.round(Math.random() * 1000) }
  ];
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
      color:['yellow','lightblue'],
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      textStyle:{
        color:'white',
      },

      calculable: true
    },
    //legend: {},
    //grid: {},
    //xAxis: {},
    //yAxis: {},
    //dataZoom: [],
    //axisPointer: {},
    //toolbox: {},
    //brush: {},
    dataset: {},
    series: [{
      
      type: type,
      mapType: 'china',
      center:center,
      aspectScale:aspectscale,
      //nameMap:{},自定义地区名称映射

      label: {
        normal: {
          //show: true,
          position:'inside',
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },

      itemStyle: {
        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      //animation: false,

      data: localData

    }]
  };

  

    


  chart.setOption(option);
  return chart;
}

module.exports = {
  initChart: initChart
}