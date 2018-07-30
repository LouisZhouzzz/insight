(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    var contrastColor = '#A5EFEF';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                  color: '#E1FFFF'
                }
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        };
    };

    //var colorPalette = ['#8A2BE2', '#800080', '#BA55D3', '#CD00CD', '#FF69B4', '#4B0082', '#FF00FF', '#FFBBFF', '#FFE1FF','#DDA0DD']//purple

    var colorPalette = ['#00BFFF', '#00FFFF', '#00CED1', '#AFEEEE', '#20B2AA', '#87CEEB', '#48D1CC', '#008B8B',]//green
    var colorVisualmap =[ '#00ffff', '#bbffff']
    //var colorVisualmap=
    var theme = {
        color: colorPalette,
        backgroundColor: '#080808',//'#1c122a',
        visualMap: {
          //color: ['#4B0082', '#8A2BE2','#FFBBFF'],
          //color: ['#6495ED','#6495ED', '#87CEFA','#AFEEEE'],
          color: colorVisualmap,
          textStyle: {
            color: contrastColor,
          },
        },

        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: contrastColor
                },
                crossStyle: {
                    color: contrastColor,
                },
                label:{
                      show: true,
                      color: '#000'
                }
            }
        },
        legend: {
            textStyle: {
                color: contrastColor
            }
        },
        textStyle: {
            //color: contrastColor,
          color:'#2F4F4F'
        },
        title: {
            textStyle: {
              color: contrastColor,
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: contrastColor
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: contrastColor
            }
        },
        timeline: {
            lineStyle: {
                color: contrastColor
            },
            itemStyle: {
                normal: {
                    color: colorPalette[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: contrastColor
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: contrastColor,
                    borderColor: contrastColor
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),

        line: {
            symbol: 'circle',
        },
        graph: {
            color: colorPalette
        },
        
        gauge: {
          axisLine: {
            lineStyle: {
              //color: [[0.2, '#BA55D3'], [0.8, '#8A2BE2'], [1, '#FFBBFF']]
              color: [[0.3, '#AFEEEE'], [0.7, '#00FFFF'], [1, '#00CED1']]
            }
          },
          axisTick: {
            lineStyle: {
              //color: '#4B0082'
              color: '#2F4F4F'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#4B0082'
            }
          },
          splitLine: {
            lineStyle: {
              //color: '#4B0082'
              //color:'#6495ED'
              color: '#2F4F4F'
            }
          },
          title: {
            offsetCenter: [0, -20]
          }
        },


        candlestick: {
            itemStyle: {
                normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            }
        }
    };
    theme.categoryAxis.splitLine.show = false;
    echarts.registerTheme('dark', theme);
}));