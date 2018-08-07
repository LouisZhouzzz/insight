function getOption(localData) {
  let sta = localData;
  let staKeys = Object.keys(sta.charts);
  let staData = Object.keys(sta.charts).map(function (key) {
    return sta.charts[key];
  });

  return {
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      show: false
    },
    yAxis: {
      type: 'category',
      data: staKeys,
      axisLine: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        data: Object.keys(sta.charts).map(function (key) {
          return sta.charts[key] / (sta.range.max - sta.range.min) * 100
        }),
        stack: 'chart',
        z: 3,
        label: {
          normal: {
            position: 'right',
            formatter: function (o) {
              return staData[o.dataIndex] + '%'
            },
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#2C75B3'
          }
        },
      }, {
        type: 'bar',
        silent: true,
        stack: 'chart',
        data: Object.keys(sta.charts).map(function (key) {
          return 100 - sta.charts[key] / (sta.range.max - sta.range.min) * 100
        }),
        itemStyle: {
          normal: {
            color: '#eee'
          }
        },
      }
    ]
  };

}

module.exports = {
  getOption: getOption
};

