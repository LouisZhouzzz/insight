function getOption(localData) {
    let xData = [];
    let y = new Date().getMonth() + 1;
    for (let i = 0; i < 12; i++) {
        let t = y - i;
        if (t <= 0 ) t += 12;
        xData.unshift(t);
    }

    let option = {
        grid: {
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "20%",
        },

        xAxis: {
            name: '月',
            type: 'category',
            data: xData,
            nameTextStyle: {
                color: 'rgba(255,255,255,0.9)'
            },
            axisLine: {
                lineStyle: {
                    width: 2,
                    color: 'rgba(255,255,255,0.7)',
                    type: 'solid',
                }
            }
        },
        yAxis: {
            name: '异常数',
            type: 'value',
            nameTextStyle: {
                color: 'rgba(255,255,255,0.9)'
            },
            axisLine: {
                lineStyle: {
                    width: 2,
                    color: 'rgba(255,255,255,0.7)',
                    type: 'solid',
                }
            },
            splitLine: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(255,255,255,0.5)',
                    type: 'dotted',
                }
            }
        },

        series: [{
            data: localData,
            type: 'line',
            symbol: 'diamond',
            symbolSize:10,
            lineStyle: {
                normal: {
                    color: '#EFBDEB',
                    width:3 ,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    color: '#F3F8F2'
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
};

