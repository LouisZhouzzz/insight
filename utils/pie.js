import * as echarts from '../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var titletext= ["title"],
      subtext=["subtitle"],
      lengendtext = ["北京", "武汉", "杭州", "广州", "上海"],
      graphictext1='sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
      graphictext2 = '最大值：****\t最小值：****\n',
      type='pie',
      data= [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      },
      ],
      center= ['40%', '50%'],
      radius= ['25%', '65%'];
 
 
 //修改option的各种参数即可以修改图表的各种格式
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


    legend: {
      //type:'scroll',                    //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      right: '3%',
      top: '35%',
      width: 'auto',                       //图例组件的宽度和高度
      height: 'auto',
      orient: 'vertical',                //默认为'horizontal'
      align: 'auto',                       //图例标记和文本对齐
      padding: 5,                          //图例内边距，默认5
      itemGap: 10,                         //图例间隔
      itemWidth: 25,                       //图例宽，默认25
      itemHeight: 14,                      //图例高，默认14
      formatter: '{name}',                 //图例文本格式 
      //selectedMode:false,
      inactiveColor: '#ccc',
      //selected:{} ,                     //图例选中状态表

      text: lengendtext,
      textStyle: {
        color: 'white',
        //fontStyle:'italic',               //字体风格，默认normal
        fontWeight: 'lighter',               //字体粗细
        fontFamily: 'sans-serif',
        fontSize: '12',
        //lineHeight:number,                //行高
        background: 'transparent',
        border: 'transparent',
        padding: 0,
      },
      backgroundColor: 'transparent',
    },

    //grid:{},
    //dataZoom:{},
    //visualMap:{},
    //brush:{},                 //区域选择组件

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

    dataset: {
      source: []
    },


    series: [{

      type: 'pie',
      center: center,
      radius: radius,
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{b}:{c}\n({d}%)',
          color: '#fff',
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
          //color: {},
          borderColor: '#fff',
          borderWidth: 0,
          borderType: 'solid',
          //shadowBlur:5,
          //shadowColor:'#ccc'
        },
        emphasis: {
          label: {
            formatter: "{b}:{c}\n{d}%",
            color: '#fff',
            position: 'inner',
            fontFamily: 'san-serif',
            fontStyle: 'normal',
            fontSize: '14',
            fontWeight: 'bold',
          }
        }
      },

      data: data,
      //ayoutBy:'column',       //当使用dataset时，指定行对应还是列对应

    }]
  };

  /*function fetchData(cb) {
    // 通过 setTimeout 模拟异步加载
    setTimeout(function () {
      cb({
        titletext:["title"],
        subtext:["subtitle"],
        text:'sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
        categories: ["北京", "武汉", "杭州", "广州", "上海"],
        data: [{
          value: 55,
          name: '北京'
        }, {
          value: 20,
          name: '武汉'
        }, {
          value: 10,
          name: '杭州'
        }, {
          value: 20,
          name: '广州'
        }, {
          value: 38,
          name: '上海'
        },
        ],
      });
    }, 1000);
  }

  fetchData(function (data) {
    chart.hideLoading();
    chart.setOption({
      title:{
        text:data.titletext,
        subtext:data.subtext
      },
      graphic:{
        elements:[{
          style:{
            text:data.text,
          }}]
      },
      legend:{
        text: data.categories,
      },
      series: [{
        data: data.data
      }]
    });
  });
*/

  chart.setOption(option);          //展示图表
  return chart;
}

module.exports = {
  initChart: initChart
}