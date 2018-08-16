module.exports = {
    getOption: function (score, max) {
        if (score < 0) throw Error('分数不能为负数！');
        if (score > max) throw Error('分数不能超过最大值！');
        let data=[93];
        return {
            backgroundColor: '#2c75b3',
            series: [
                {
                    type: 'gauge',
                    min: 0,
                    max: 100,
                    startAngle: 220,
                    endAngle: -40,
                    splitNumber: 100,
                    center: ['50%', '50%'],
                    radius: '100%',
                    axisLine: {
                        lineStyle: {
                            width: 0,
                            color: [/*[0.25, 'rgba(166,177,225,1)'], */[0.3, 'rgba(239,189,235,1)'], [0.7, 'rgba(243,248,242,1)'], [1, 'rgba(175,238,239,1)']],
                            //shadowBlur: 4,
                            //shadowColor: 'rgba(255,255,255,0.7)'
                        }
                    },
                    axisTick: {               // 坐标轴小标记
                        show:false,
                        length: '15%',
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: '18%',
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        show:false,
                        color: 'rgba(255,255,255,0.5)',
                        //padding: 3,
                        //textShadowBlur: 2,
                        //textShadowOffsetX: 1,
                        //textShadowOffsetY: 1,
                        //textShadowColor: '#222'
                    },
                    detail: {
                        formatter: '{value}',
                        fontWeight: 'bolder',
                        fontSize: 44,
                        offsetCenter: [0, '40%']
                    },
                    data: data
                },
                {
                    type:'gauge',
                    min: 0,
                    max: 100,
                    startAngle: 220-data/100*260,
                    endAngle: -40,
                    splitNumber:(100-data),
                    center: ['50%', '50%'],
                    radius: '100%',
                    axisLabel:{show:false},
                    axisLine:{lineStyle:{width:0}},
                    axisTick:{show:false},
                    splitLine:{
                        lineStyle:{
                            color:'rgba(44,117,179,0.9)',
                        },

                        length:'25%'
                    },
                    detail: {
                        formatter: '分',
                        fontSize: 14,
                        offsetCenter: ['27%', '50%'],
                        color:'rgba(255,255,255,0.7)'
                    }

                }

            ]
        };


    }
};