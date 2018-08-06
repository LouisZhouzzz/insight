function getOption(localData) {
    let option = {

        // title: {
        //     text: '指标类型分布',
        //     left: 'center',
        //     top: 0,
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        grid: {
            left: "5%",
            right: "5%",
            top: "0",
            bottom: "30%",
        },
        visualMap: {
            show: false,
            min: 0,
            max: 30,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'应用指标分布',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:localData.sort(function (a, b) { return a.value - b.value; }),
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
                        color: '#F8B9A9',
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