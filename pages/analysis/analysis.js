var service = require('../../service/test');

Page({
    data: {
        outline: { //概览面板数据
            appNum: 0, //异常应用数
            exceptionNum: 0, //异常总数
            point: 0 //系统总体评分
        },
        collectList: [], //收藏列表数据
        exceptionList: [ //异常列表数据
        ],
        ifLoading: true, //标识加载态，以防多次触发上拉加载事件
        page: 0, //异常列表页码
        size: 10 //异常列表单页项数
    },
    onLoad: function () {
        service.getOutline(
            (res) => {
                this.setData({
                    outline: {
                        appNum: 5, //异常应用数
                        exceptionNum: 11, //异常总数
                        point: 67 //系统总体评分
                    }
                });
                this.drawCircleProcess();
            },
            (res) => {
            }
        );

        service.getCollectionList(
            (res) => {
                this.setData({
                    collectList: [
                        {
                            name: 'XXXX图表',
                            id: 'mock id'
                        }, {
                            name: 'XXXX图表',
                            id: 'mock id'
                        }, {
                            name: 'XXXXXXXXXXXXXXXXXX图表',
                            id: 'mock id'
                        }, {
                            name: 'X图表',
                            id: 'mock id'
                        }, {
                            name: 'XXXX图表',
                            id: 'mock id'
                        }, {
                            name: 'XXXXXXXXXXXXXX图表',
                            id: 'mock id'
                        }, {
                            name: 'XXXXXXXXXXXXXX图表',
                            id: 'mock id'
                        }
                    ]
                });
            },
            (res) => {
            }
        );

        service.getExceptionList(
            (res) => {
                this.setData({
                    exceptionList: [
                        {
                            id: 'fake id',
                            name: '性能异常',
                            source: '生酮营养师'
                        }, {
                            id: 'fake id',
                            name: '支付异常',
                            source: '生酮营养师'
                        }, {
                            id: 'fake id',
                            name: 'GPS定位异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: '路线导航异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: '权限异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: '实时测距异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: '性能异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: 'GPS定位异常',
                            source: '数字园区导航'
                        }, {
                            id: 'fake id',
                            name: '数据处理异常',
                            source: '考勤打卡'
                        }, {
                            id: 'fake id',
                            name: '并发处理异常',
                            source: '考勤打卡'
                        }, {
                            id: 'fake id',
                            name: '流量统计异常',
                            source: '考勤打卡'
                        }],
                    page: this.data.page + 1,
                    loading: false
                });
            },
            (res) => {
                this.setData({
                    loading: false
                });
            },
            this.data.page,
            this.data.size
        );

    },

    loadExceptionList: function () {
        if (this.data.loading) return;
        this.setData({
            loading: true
        });
        service.getExceptionList(
            (res) => {
                this.data.exceptionList.push({
                    id: 'fake id',
                    name: '流量统计异常',
                    source: '考勤打卡'
                }, {
                    id: 'fake id',
                    name: '流量统计异常',
                    source: 'p2p网贷平台'
                }, {
                    id: 'fake id',
                    name: '并发异常',
                    source: '考勤打卡'
                }, {
                    id: 'fake id',
                    name: '人数统计异常',
                    source: '考勤打卡'
                });
                this.setData({
                    exceptionList: this.data.exceptionList,
                    page: this.data.page + 1,
                    loading: false
                });
            },
            (res) => {
                this.setData({
                    loading: false
                });
            },
            this.data.page,
            this.data.size
        );
    },

    onReachBottom: function() {
        // Do something when page reach bottom.
        this.loadExceptionList();
    },

    onReady: function () { // 监听页面初次渲染完成
    },

    drawCircleProcess: function () { // 绘制分析界面的概览圆
        const LINE_WIDTH = 10;
        const RADIUS = 50;
        const BACKGROUND_COLOR = '#f0f0f0';
        const ACTIVE_COLOR = '#F4D35E';

        let rate = this.data.outline.point / 100 * 2 - 0.5;

        // 页面渲染完成
        let cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
        cxt_arc.setLineWidth(LINE_WIDTH);
        cxt_arc.setStrokeStyle(BACKGROUND_COLOR);
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, 0, 2 * Math.PI, false);
        cxt_arc.stroke();//对当前路径进行描边

        cxt_arc.setLineWidth(LINE_WIDTH);
        cxt_arc.setStrokeStyle(ACTIVE_COLOR);
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, -Math.PI * 1 / 2, Math.PI * rate, false);
        cxt_arc.stroke();//对当前路径进行描边

        cxt_arc.draw();
    }

});
