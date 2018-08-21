function getOption(localData) {
  // 得到最值
  let max = -1;
  let min = Infinity;
  for (let i = 0; i < localData.length; i++) {
    if (max < localData[i].value) max = localData[i].value;
    if (min > localData[i].value) min = localData[i].value;
  }

  let option = {
    grid: {
      left: "5%",
      right: "5%",
      top: "0",
      bottom: "30%",
    },
    visualMap: {
      show: false,
      min: min,
      max: max,
      inRange: {
        colorLightness: [0.3, 0.65]
      }
    },
    series: [
      {
        name: '应用指标分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: localData.sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: '#fff',
              fontSize: 16,
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: 'tomato',
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };

  return option;
}

module.exports = {
  getOption: getOption
};