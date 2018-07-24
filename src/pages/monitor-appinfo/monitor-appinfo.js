// pages/monitor-appinfo/monitor-appinfo.js
const computed = require('../../utils/vuelike.js').computed;
const service = require('../../service/test');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        ifTypeSelectedShow: false, // 是否显示固定类型选择栏
        typeItems: {
            batch: '批量',
            online: '联机',
            service: '业务',
            performance: '性能',
            property: '资源'
        },
        swiperIndex: 0,
        types: [
            {
                name: '批量',
                value: 'batch',
                checked: true
            }, {
                name: '联机',
                value: 'online'
            }, {
                name: '业务',
                value: 'service'
            }, {
                name: '性能',
                value: 'performance'
            }, {
                name: '资源',
                value: 'property'
            }
        ],
        appOutline: {
            title: '',
            bio: ''
        },
        size: 10,
        batch: {
            name: 'batch',
            data: []
        },
        online: {
            name: 'online',
            data: []
        },
        service: {
            name: 'service',
            data: []
        },
        performance: {
            name: 'performance',
            data: []
        },
        property: {
            name: 'property',
            data: []
        },
    },
    collapse: function (e) {
        var type = this.data.types[this.data.swiperIndex].value;
        var list = this.data[type];
        var row = list.data[e.currentTarget.dataset.index];
        row.ifCollapsed = !row.ifCollapsed;
        this.setData({
            [type]: list
        })
    },

    onFormSubmit: function (e) {
        service.sendFormId(
            (res) => {
                console.log('FormId:' + e.detail.formId + ', 发送成功。');
            },
            (res) => {
            },
            e.detail.formId
        );
    },
    collect: function (e) {
        var outerIndex = e.currentTarget.dataset.outer;
        var innnerIndex = e.currentTarget.dataset.index;
        var type = this.data.types[this.data.swiperIndex].value;
        var list = this.data[type];
        list.data[outerIndex].items[innnerIndex].ifCollected = !list.data[outerIndex].items[innnerIndex].ifCollected;
        this.setData({
            [type]: list
        });
    },
    outerscroll: function (e) {
        if (this.data.ifTypeSelectedShow === (e.detail.scrollTop > 400)) return;
        this.setData({
            ifTypeSelectedShow: e.detail.scrollTop > 400
        });
    },
    radioChange: function (e) {
        let types = this.data.types;
        types[this.data.swiperIndex].checked = false;
        types[e.detail.value].checked = true;
        this.setData({
            types,
            swiperIndex: parseInt(e.detail.value)
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        service.getAppInfo(
            (res) => {
                this.setData({
                    appOutline: {
                        title: '生酮营养师',
                        bio: '这是一款专为佛系青年打造的养生App。'
                    }
                });
            },
            (res) => {
            }
        );
        service.getAppQuotaList(
            (res) => {
                let batch = this.data.batch;
                let online = this.data.online;
                let service = this.data.service;
                let performance = this.data.performance;
                let property = this.data.property;
                batch.data = [
                    {
                        name: 'CPU性能指标',
                        ifCollapsed: false,
                        items: [
                            {
                                name: '应用服务器CPU使用率',
                                ifCollected: true
                            }, {
                                name: '数据库服务器CPU使用率',
                                ifCollected: false
                            }, {
                                name: '应用服务器CPU功耗',
                                ifCollected: false
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }];
                online.data = [
                    {
                        name: 'CPU性能指标',
                        ifCollapsed: false,
                        items: [
                            {
                                name: '应用服务器CPU使用率',
                                ifCollected: true
                            }, {
                                name: '数据库服务器CPU使用率',
                                ifCollected: false
                            }, {
                                name: '应用服务器CPU功耗',
                                ifCollected: false
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }];
                service.data = [
                    {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }, {
                        name: '语句解析性能',
                        ifCollapsed: true,
                        items: [
                            {
                                name: '单次耗时过长语句',
                                ifCollected: false
                            }, {
                                name: '数据库硬解析次数',
                                ifCollected: true
                            }
                        ]
                    }];
                performance.data = [];
                property.data = [];
                this.setData({
                    batch,
                    online,
                    service,
                    performance,
                    property
                });
                wx.stopPullDownRefresh();
            },
            (res) => {
                wx.stopPullDownRefresh();
            }
        )
    },

    onPullDownRefresh: function () {
        wx.startPullDownRefresh();
        this.onLoad();
    }
});