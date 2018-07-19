//logs.js
const util = require('../../utils/util.js');

Page({
    data: {
        outline: {
            appNum: 3,
            exceptionNum: 10,
            point: 50
        },
        headerHeight: 130,
        ifFixedBtnShow: false,
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
            }, {
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
            }
        ],
        toView: 'header'
    },

    backToTop: function (e) {
        this.setData({
            ifFixedBtnShow: false,
            toView: 'header'
        });
    },

    scroll: function (e) {
        let ifBeyond = e.detail.scrollTop > this.data.headerHeight - 24;
        if (this.data.ifFixedBtnShow === ifBeyond) return;
        this.setData({
            ifFixedBtnShow: ifBeyond
        });
    },

    onTapGroup: function (e) {
        let exceptionList = this.data.exceptionList;
        let row = exceptionList[e.currentTarget.dataset.index];
        row.flag = !row.flag;
        this.setData({
            exceptionList: exceptionList
        })
    },

    onReady: function () {
        const LINE_WIDTH = 10;
        const RADIUS = 50;
        const BACKGROUND_COLOR = '#d2d2d2';
        const ACTIVE_COLOR = '#F4D35E';

        let rate = this.data.outline.point / 100 * 2 - 0.5;

        // 页面渲染完成
        let cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
        cxt_arc.setLineWidth(LINE_WIDTH);
        cxt_arc.setStrokeStyle(BACKGROUND_COLOR);
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, 0, 2 * Math.PI, false);
        cxt_arc.stroke();//对当前路径进行描边

        cxt_arc.setLineWidth(LINE_WIDTH);
        cxt_arc.setStrokeStyle(ACTIVE_COLOR);
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(RADIUS + LINE_WIDTH, RADIUS + LINE_WIDTH, RADIUS, -Math.PI * 1 / 2, Math.PI * rate, false);
        cxt_arc.stroke();//对当前路径进行描边

        cxt_arc.draw();
    }

})
