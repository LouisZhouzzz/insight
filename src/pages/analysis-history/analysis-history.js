var service = require('../../service/test.js');
var computed = require('../../utils/vuelike').computed;

Page({
    data: {
        records: [],
        page: 0,
        size: 5,
        ifLoading: true
    },
    onLoad: function () {
        this.setData({
            ifLoading: true
        });
        service.getExceptionHistory(
            (res) => {
                this.setData({
                    records: [
                        {
                            date: '2018-07-01',
                            exceptions: [
                                {
                                    time: '19:30',
                                    name: '性能异常',
                                    source: '生酮营养师'
                                }, {
                                    time: '10:30',
                                    name: '性能异常',
                                    source: '数字园区导航'
                                }, {
                                    time: '07:30',
                                    name: '性能异常',
                                    source: '生酮营养师'
                                }
                            ]
                        }, {
                            date: '2017-08-21',
                            exceptions: [
                                {
                                    time: '11:30',
                                    name: '性能异常',
                                    source: '生酮营养师'
                                }, {
                                    time: '00:30',
                                    name: '性能异常',
                                    source: '汕大课程表'
                                }, {
                                    time: '00:29',
                                    name: '发布异常',
                                    source: '生酮营养师'
                                }
                            ]
                        }
                    ],
                    page:  1,
                    ifLoading: false
                });
                wx.stopPullDownRefresh();
            },
            (res) => {
                this.setData({
                    ifLoading: false
                });
                wx.stopPullDownRefresh();
            });
    },

    onReady: function () { // 监听页面初次渲染完成
        computed(this, {
            ifMore: function () {
                return this.data.page * this.data.size === this.data.records.length
            }
        })
    },

    onPullDownRefresh: function () {
        wx.startPullDownRefresh();
        this.onLoad();
    },

    onReachBottom: function() {
        this.loadMoreRecords();
    },

    loadMoreRecords: function () {
        if (this.data.ifLoading) return;
        this.setData({
            ifLoading: true
        });
        service.getExceptionHistory(
            (res) => {
                this.data.records.push(
                    {
                        date: '2018-07-01',
                        exceptions: [
                            {
                                time: '19:30',
                                name: '性能异常',
                                source: '生酮营养师'
                            }, {
                                time: '10:30',
                                name: '性能异常',
                                source: '数字园区导航'
                            }, {
                                time: '07:30',
                                name: '性能异常',
                                source: '生酮营养师'
                            }
                        ]
                    }, {
                        date: '2017-08-21',
                        exceptions: [
                            {
                                time: '11:30',
                                name: '性能异常',
                                source: '生酮营养师'
                            }, {
                                time: '00:30',
                                name: '性能异常',
                                source: '汕大课程表'
                            }, {
                                time: '00:29',
                                name: '发布异常',
                                source: '生酮营养师'
                            }
                        ]
                    }
                );
                this.setData({
                    records: this.data.records,
                    page:  1,
                    ifLoading: false
                });
            },
            (res) => {
                this.setData({
                    ifLoading: false
                })
            });
    }
});