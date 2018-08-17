function getOption(localData) {
  let sta = localData;
  let staKeys = Object.keys(sta.charts);
  let staData = Object.keys(sta.charts).map(function (key) {
    return sta.charts[key];
  });

  return {
    grid: {
      left: 0,
      right: 0,
      bottom: 'auto',
      top: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 112,
      show: false
    },
    yAxis: {
      type: 'category',
      data: staKeys,
      inverse:true,
      max:5,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show:false,
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        barMaxWidth: 18,
        type: 'bar',
        data: Object.keys(sta.charts).map(function (key) {
          return (sta.charts[key] - sta.range.min) / (sta.range.max - sta.range.min) * 100
        }),
        stack: 'chart',
        //z: 3,
        label: {
          normal: {
            position: 'right',
            formatter: function (o) { // 显示实际数值而非百分值
              return staData[o.dataIndex]
            },
            color: '#eee',

            show: true
          },
          emphasis: {
            color: '#fff',
            fontSize: 14
          }
        },
        itemStyle: {
          normal: {
            color: '#eee'
          },
          emphasis: {
            color: '#fff'
          }
        },
      }, {
        barMaxWidth: 18,
        type: 'bar',
        silent: true,
        stack: 'chart',
        data: Object.keys(sta.charts).map(function (key) {
          return 100 - (sta.charts[key] - sta.range.min) / (sta.range.max - sta.range.min) * 100
        }),
        itemStyle: {
          normal: {
            barBorderRadius: [0, 10, 10, 0],
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
      }
    ]
  };

}

module.exports = {
  getOption: getOption
};

