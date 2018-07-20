// pages/monitor-appinfo/monitor-appinfo.js
var watch = require('../../utils/vuelike.js').watch;
var service = require('../../service/test');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifTypeSelectedShow: false, // 是否显示固定类型选择栏
        checkedKey: 'batch',
        typeItems: {
            batch: '批量',
            online: '联机',
            service: '业务',
            performance: '性能',
            property: '资源'
        },
        appOutline: {
            title: null,
            bio: null
        },
        list: {
            batch: [
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
                }
            ],
            online: [
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
                }
            ],
            service: [],
            performance: [],
            property: [
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
                }
            ]
        }
    },
    onTapGroup: function (e) {
        var list = this.data.list;
        var row = list[this.data.checkedKey][e.currentTarget.dataset.index];
        row.ifCollapsed = !row.ifCollapsed;
        this.setData({
            list: list
        })
    },
    collect: function (e) {
        this.data.diagramListData[this.data.checkedKey][e.currentTarget.dataset.index].ifCollected = !this.data.diagramListData[this.data.checkedKey][e.currentTarget.dataset.index].ifCollected;
        this.setData({
            diagramListData: this.data.diagramListData
        });
    },

    outerscroll: function (e) {
        if (this.data.ifTypeSelectedShow === (e.detail.scrollTop > 400)) return;
        this.setData({
            ifTypeSelectedShow: e.detail.scrollTop > 400
        });
    },
    radioChange: function (e) {
        this.setData({
            checkedKey: e.detail.value
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
        // service.getAppQuotaList(
        //     (res) => {
        //         this.setData({
        //         });
        //     },
        //     (res) => {
        //
        //     }
        // );
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})