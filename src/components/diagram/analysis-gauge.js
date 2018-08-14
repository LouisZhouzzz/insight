module.exports = {
  getOption: function (score, max) {
    if (score < 0) throw Error('分数不能为负数！');
    if (score > max) throw Error('分数不能超过最大值！');
    return {
      backgroundColor: '#2c75b3',
      grid: {
        left: "10%",
        right: "10%",
        top: "10%",
        bottom: "10%",
      },
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 100,
          startAngle: 220,
          endAngle: -40,
          splitNumber: 10,
          center: ['50%', '60%'],
          radius: '100%',
          axisLine: {            // 坐标轴线
            lineStyle: {
              width: 4,
              color: [[0.25, 'rgba(166,177,225,0.85)'], [0.5, 'rgba(239,189,235,0.85)'], [0.75, 'rgba(243,248,242,0.85)'], [1, 'rgba(175,238,239,0.85)']],
              shadowBlur: 5,
              shadowColor: 'rgba(255,255,255,0.3)'
            }
          },
          axisTick: {               // 坐标轴小标记
            length: '10%',        // 属性length控制线长
            lineStyle: {          // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          splitLine: {           // 分隔线
            length: '13%',
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            borderRadius: 2,
            color: 'rgba(255,255,255,0.5)',
            textShadowColor: '#222'
          },
          detail: {
            formatter: '{value}',
            fontWeight: 'bolder',
            fontSize: 44,
            offsetCenter: [0, '40%']
          },
          data: [93]
        }
      ]
    };


  }
};