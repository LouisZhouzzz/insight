function getOption(localData, para, TL) {
    let tabn = 36;
    let option = {
        title: {
            text: para.titleText,
            subtext: para.titleSubText,
            textStyle: {
                fontSize: 30,                           //字体大小
                fontWeight: 'bold',                     //加粗
            },
            //padding:[number]                         //标题内边距
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
                    text: textCov(para.graExpText, tabn),
                    font: 'bolder 16px cursive',
                    textAlign: 'left',
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
                        text: [textCov('最大值: ' + getExt(localData).max + ',\t对应项:' + extLoc(localData).maxLoc, tabn)
                        + '\n' + textCov('最小值: ' + getExt(localData).min + ',\t对应项:' + extLoc(localData).minLoc, tabn)
                        + '\n' +  textCov('平均值: ' + getExt(localData).ave, tabn)],
                        font: 'bolder 16px cursive',
                        textAlign: 'left',
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

function textCov(text, n) {
    let outText = '';
    let mark = 0;
    for(let i = 0; i < text.length; i++) {
        outText += text[i];
        mark++;
        if(text[i].match(/[^\x00-\xff]/ig) != null)
            mark++;
        if(mark == n  + 1 || mark == n) {
            outText += '\n';
            mark = 0;
        }
    }
    return outText;
}

function getExt(data) {
    let min, max, ave = 0;
    min = data[1][1];
    max = data[1][1];
    for (let i = 1; i< data.length; i++)
        for(let j = 1; j<data[0].length; j++) {
            if (data[i][j] > max)
                max = data[i][j];
            if (data[i][j] < min)
                min = data[i][j];
            ave += data[i][j];
        }

    ave /= data.length*data[0].length;

    return {
        min: min,
        max: max,
        ave: ave.toFixed(2),
    }
}

function extLoc(data) {
    let min = getExt(data).min;
    let max = getExt(data).max;
    let minLoc = '', maxLoc = '';
    for (let i = 1; i < data.length; i++)
        for(let j = 1; j <data[0].length; j++) {
            if (data[i][j] == min)
                minLoc += ' ' + data[i][0] + ' ' + data[0][j] + ';';
            if (data[i][j] == max)
                maxLoc += ' ' + data[i][0] + ' ' + data[0][j] + ';';
        }
    return {
        minLoc: minLoc,
        maxLoc: maxLoc,
    }
}

function getSeries(data, chartType) {
    let series = [];
    for (let i = 0; i < data[0].length - 1; i++) {
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

