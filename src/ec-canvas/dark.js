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

  var colorPalette = ['#8A2BE2', '#800080', '#BA55D3', '#CD00CD', '#FF69B4', '#4B0082', '#FF00FF', '#FFBBFF', '#FFE1FF','#DDA0DD']

    //var colorPalette = ['#00BFFF','#00FFFF', '#00CED1', '#AFEEEE','#20B2AA']

    //var colorPalette = ['#0080ff','#46a3ff','#66b3ff','#00ffff','#80ffff']

    //var colorPalette = ["#fa0909", "#005eaa", "#ffee51","#43e6c1","#2b821d","#339ca8","#cda819","#32a487"]
    //var colorPalette = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
    var theme = {
        color: colorPalette,
      backgroundColor: '#080808',//'#1c122a',
        visualMap: {
          //color: ['#C1232B', '#FCCE10'],
          color: ['#4B0082', '#8A2BE2','#FFBBFF'],
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
            color: contrastColor
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
            symbol: 'circle'
        },
        graph: {
            color: colorPalette
        },
        
        gauge: {
          axisLine: {
            lineStyle: {
              color: [[0.2, '#BA55D3'], [0.8, '#8A2BE2'], [1, '#FFBBFF']]
            }
          },
          axisTick: {
            lineStyle: {
              color: '#4B0082'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#4B0082'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#4B0082'
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