module.exports = {
  getOption: function (score, max) {
    if (score < 0) throw Error('分数不能为负数！');
    if (score > max) throw Error('分数不能超过最大值！');
    return {
      series: [
        {
          type:'pie',
          radius: ['90%', '100%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#0c9', '#ccc'],
          data: [score, max - score]
        }
      ]
    }
  }
};