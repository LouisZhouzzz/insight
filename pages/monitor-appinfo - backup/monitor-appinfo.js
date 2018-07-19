// pages/monitor-appinfo/monitor-appinfo.js
var watch = require('../../utils/vuelike.js').watch;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // windowHeight: getApp().globalData.windowHeight,
        windowHeight: null,
        headerHeight: 30,
        swiperIndex: 0,
        appOutline: {
            title: '生酮营养师',
            bio: '这是一款专为佛系青年打造的养生App。'
        },
        checkedKey: 'batch',
        typeItems: {
            batch: '批量',
            online: '联机',
            service: '业务',
            performance: '性能',
            property: '资源'
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
        },
        toView: 'header',
        ifOuterScroll: true //是否允许外层scrollView滑动，两个scrollView不能同时滑动，所以内层取反即可
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
    swip: function (e) {
        this.setData({
            swiperIndex: 1
        });
    },

    updateSwiperCurrent: function (e) {
        console.log(e);
        this.setData({
            swiperIndex: e.detail.current
        });
        if (e.detail.current === 0)
            this.setData({
                headerHeight: 30
            });
    },

    outerscroll: function (e) {
        if (e.detail.deltaY < 0) //滑动条向下移动
            this.setData({
                toView: 'body',
                ifOuterScroll: false
            });
    },

    outerscrolltoupper: function (e) {
        this.setData({
            toView: 'header',
            ifOuterScroll: true
        });
    },

    outerscrolltolower: function (e) { // 外层scrollview滑到底部解除滑动，启动内层scrollview滑动
        // this.setData({
        //     ifOuterScroll: false
        // });
    },

    scrolltoupper: function (e) {
        console.log(e);
        this.setData({
            ifOuterScroll: true,
            toView: 'header'
        });
    },

    scroll: function (e) {
        console.log(e);
        if (this.data.toView === 'header') //内层滑动时，外层还定位在header处
            this.setData({
                ifOuterScroll: true
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
        // watch(this, {
        //   swiperIndex: function (newVal) {
        //     if (newVal === 0 && this.data.headerHeight === 0)
        //       this.setData({
        //         headerHeight: 30
        //       });
        //   }
        // });
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
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