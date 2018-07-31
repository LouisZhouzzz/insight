function getOption(localData, para, TL) {
    let xData = [];
    let y = new Date().getMonth() + 1;
    for (let i = 0; i < 12; i++) {
        let t = y - i;
        if (t <= 0 ) t += 12;
        xData.unshift(t);
    }

    let option = {
        title: {
            text: '一年内异常发生',
            left: 'center',
            top: '0',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "30%",
        },

        xAxis: {
            name: '月',
            type: 'category',
            data: xData,
            nameTextStyle: {
                color: '#FFB8AB'
            },
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: '#FFB8AB',
                    type: 'solid',
                }
            }
        },
        yAxis: {
            name: '异常数',
            type: 'value',
            nameTextStyle: {
                color: '#FFB8AB'
            },
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: '#FFB8AB',
                    type: 'solid',
                }
            },
            splitLine: {
                lineStyle: {
                    width: 1,
                    color: '#FFB8AB',
                    type: 'solid',
                }
            }
        },

        series: [{
            data: localData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: '#FFB8AB',
                    width: 5,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    color: '#F9FBB2'
                }
            }
        }]
    };

    return option;
}

function getSeries(data, chartType) {
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    var item = {
      name: data[i].name,
      type: chartType,
      //seriesLayoutBy: 'row',
      data: data.value
    }
    serie.push(item);
  };
  return serie;
}

module.exports = {
  getOption: getOption
}

