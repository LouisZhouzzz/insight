function getOption(localData, para, TL) {
    let option = {
        title: {
            text: para.titleText,
            subtext: para.titleSubText,
            textStyle: {
                fontSize: 30,                           //字体大小
                fontWeight: 'bold',                     //加粗
            },
            subtextStyle: {
                fontSize: 16,
            },
            //padding:[number]                         //标题内边距
            itemGap: 10, //主副标题间距，默认10
            left: TL.titleLeft,
            top: TL.titleTop,
        },

        graphic: {
            elements: [{
                type: 'text',
                left: TL.graExpLeft,
                top: TL.graExpTop,
                invisible: false,
                draggable: false,
                style: {
                    text: para.graExpText,
                    font: 'bolder 16px cursive',
                    textAlign: 'center',
                    fill: TL.textColor,
                }
            },
                {
                    type: 'text',
                    left: TL.graStaLeft,
                    top: TL.graStaTop,
                    invisible: false,
                    draggable: false,
                    style: {
                        text: para.graStaText,
                        font: 'bolder 16px cursive',
                        textAlign: 'center',
                        fill: TL.textColor,
                    }
                }
            ]
        },

        legend: {
            type: 'scroll',                            //可滚动翻页的图例，较多时使用，缺省为普通图例
            show: true,
            left: TL.legLeft,
            top: TL.legTop,
            width: '80%',                              //图例组件的宽度和高度
            height: 'auto',
            orient: TL.legorient,                       //默认为'horizontal'
            formatter: '{name}',                        //图例文本格式

            textStyle: {
                fontWeight: 'lighter',                    //字体粗细
                fontFamily: 'sans-serif',
                fontSize: '12',
                padding: 0,
            },
        },

        grid: {
            //show: true,
            containLabel: true,
            left: TL.gridLeft,
            right: TL.gridRight,
            top: TL.gridTop,
            bottom: TL.gridBottom,


            borderWidth: 1,
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            }
        },

        xAxis: {
            show: true,
            position: 'bottom',
            type: 'category',
            name: para.xname,
            nameLocation: 'end',
            nameTextStyle: {
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 12,
            },
            nameGap: 5,                         //坐标轴名称与轴线之间的距离,默认15
            nameRotate: null,
            boundaryGap: true,
            axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: {                            //刻度线
                show: true,
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                //fontSize,fontWeight,align，backgroundColor等等也可以在这里面设置
            },
        },

        yAxis: {
            show: true,
            position: 'left',
            type: 'value',
            name: para.yname,
            nameLocation: 'end',
            nameGap: 5,
            boundaryGap: ['0%', '2%'],
            //min:
            //max:
            splitLine: {
                lineStyle: {
                    type: 'dotted',
                }
            },
            axisLine: {
                show: true,
                onZero: true,
            },
        },

        dataset: {
            //dimensions: Dem,
            source: localData
        },

        series: getSeries(localData, para.chartType),
    };

    return option;
}

function getSeries(data, chartType) {
    let series = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            name: data[i].name,
            type: chartType,
            //seriesLayoutBy: 'row',
            data: data.value
        };
        series.push(item);
    }
    return series;
}

module.exports = {
    getOption: getOption
}

