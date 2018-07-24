import * as echarts from '../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var titletext="title",
      subtext=["subtitle"],
      graphictext1='sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
      graphictext2='最大值：****\t最小值：****\n平均值：****\t标准差：****\n最稳定：****\t最跌宕：****\n',
      lengendtext= ["A", "B", "C"],
      gridleft = '5%', gridright = '15%', gridtop = '30%', gridbottom = '25%',
      Type = 'line',
      xdata= ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      data1= [18, 36, 65, 30, 78, 40, 33],
      data2= [12, 50, 51, 35, 70, 30, 20],
      data3= [10, 30, 31, 50, 40, 20, 10];
    
  var maxnum = 500;     //数据条数阈值上限
  var minnum = 5;       //数据条数阈值下限

  if (xdata.length > maxnum) {
    //截取后Maxnum条数据
    xdata = xdata.slice(-maxnum);
    data1 = data1.slice(-maxnum);
    data2 = data2.slice(-maxnum);
    data3 = data3.slice(-maxnum);
  }
  else if (xdata.length < nimnum)
  {
    gridleft = '20%', gridright = '30%';
  }

//修改option参数可以改变图表
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
          top: '80%',
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

    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      //type:'scroll',                    //可滚动翻页的图例，较多时使用，缺省为普通图例
      show: true,
      right: '2%',
      top: '30%',
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

    
    grid: {
      show:true,
      containLabel: true,
      left:gridleft,
      right:gridright,
      top:gridtop,
      bottom:gridbottom,
      //width:'auto',
      //height:'auto',
      //containLabel:true,
      backgroundColor:'transparent',
      borderColor:'#ccc', 
      borderWidth:1,  
    },

    tooltip:{
      axisPointer:{
        type:'cross',
        label:{
          show:true,
          color:'#000',
          backgroundcolor:'#fff',
        }
      }
    },

    xAxis: {
      show:true,
      position: 'bottom',
      type: 'category',
      name:"时间",
      nameLocation:'end',
      nameTextStyle:{
        color:'#ccc',
        fontStyle:'normal',
        fontWeight:'normal',
        fontFamily:'sans-serif',
        fontSize:12,
        align:'auto',
        verticalAlign:'auto', 
      },
      nameGap:15,                 //坐标轴名称与轴线之间的距离,取默认
      nameRotate:null,
      //boundaryGap:['20%','20%'],
      boundaryGap: false,
      //xmin:
      //xmax:
      //triggerEvent:true,
      axisLine:{
        show:true,
        onZero:true,

        lineStyle:{
          color:'#ccc',
          width:1,
          type:'solid',
        },
      },
      axisTick: {                //刻度线
        show: true,
        alignWithLabel: true,
      },
      axisLabel:{
        show:true,
        //fontSize,fontWeight,align，backgroundColor等等也可以在这里面设置
      },
      //splitLine:{},             //设置分隔线
      data: xdata,
    },

    yAxis: {
      show:true,
      position:'left',
      type: 'value',
      name:"y轴",
      nameLocation: 'end',
      nameTextStyle: {
        color: '#ccc',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
        align: 'auto',
        verticalAlign: 'auto',
      },
      nameGap: 15, 
      boundaryGap: ['0%', '2%'],
      //min:
      //max:

      splitLine: {
        lineStyle: {
          type: 'dotted',
          color:'#ccc'
        }
      },
      axisLine: {
        show:true,
        onZero:true,
        lineStyle: {
          color: 'white'
        }
      },
    },

    dataset:{},

    series: [{
      name: 'A',
      type: Type,
      //smooth: true,
      data: data1,
    }, {
      name: 'B',
      type: Type,
      //smooth: true,
      data: data2,
    }, {
      name: 'C',
      type: Type,
      //smooth: true,
      data: data3,
}]
  };
//后台传来的数据加载到这
  /*function fetchData(cb) {
    // 通过 setTimeout 模拟异步加载
    setTimeout(function () {
      cb({
        //titletext: ["title"],
        subtext:["subtitle"],
        text: 'sddjbgeakjghghkdfh\nsdhfskaohgioeahgidshg\ndhsjghdfkblkvk\n',
        categories: ["A", "B", "C"],
        xdata: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data1: [18, 36, 65, 30, 78, 40, 33],
        data2: [12, 50, 51, 35, 70, 30, 20],
        data3: [10, 30, 31, 50, 40, 20, 10]
      });
    }, 1000);
  }

//加载数据到option
  fetchData(function (data) {
    chart.hideLoading();
    chart.setOption({
      title: {
        //text: data.titletext,
        subtext:data.subtext,
      },
      graphic: {
        elements: [{
          style: {
            text: data.text,
          }
        }]
      },
      legend: {
        text: data.categories,
      },
      xAxis:{
        data:data.xdata,
      },
      series: [{
        data: data.data1
      },
      {
        data: data.data2
      },
      {
        data: data.data3
      }]
    });
  });
*/
    chart.setOption(option);
    return chart;
}

module.exports = {
  initChart: initChart
}