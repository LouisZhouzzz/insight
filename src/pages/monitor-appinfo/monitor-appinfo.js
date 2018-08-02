import * as echarts from "../../ec-canvas/echarts";
import geoJson from "../../ec-canvas/china";

const service = require('../../service/test');
const bar = require('../../components/diagram/bar.js');
const line = require('../../components/diagram/outline-line.js');
const pie = require('../../components/diagram/outline-pie.js');
const map = require('../../components/diagram/map.js');
const gauge = require('../../components/diagram/gauge.js');
const TL = require('../../components/diagram/config.js');

const computed = require('../../utils/vuelike').computed;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        canvasLabels: ['一年异常发生', '指标类型分布'],
        canvasIndex: 0,
        ec: {
            lazyLoad: true
        },
        ifTypeSelectedShow: false, // 是否显示固定类型选择栏
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
        appId: 'mockID',
        appOutline: {
            title: '',
            bio: ''
        },
        charts: [],
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
        }
    },
    collapse: function (e) {
        let type = this.data.types[this.data.swiperIndex].value;
        let list = this.data[type];
        let row = list.data[e.currentTarget.dataset.index];
        row.ifCollapsed = !row.ifCollapsed;
        this.setData({
            [type]: list
        })
    },

    onFormSubmit: function (e) {
        service.patchUserFormId(
            (res) => {
                console.log(res.msg);
            },
            (res) => {
            },
            'user id',
            e.detail.formId
        );
    },
    collect: function (e) {
        let outerIndex = e.currentTarget.dataset.outer;
        let innnerIndex = e.currentTarget.dataset.index;
        let type = this.data.types[this.data.swiperIndex].value;
        let list = this.data[type];
        list.data[outerIndex].items[innnerIndex].ifCollected = !list.data[outerIndex].items[innnerIndex].ifCollected;
        service.toggleUserDiagram(
            (res) => {
                this.setData({
                    [type]: list
                });
            },
            (res) => {},
            'user id',
            e.currentTarget.dataset.id
        )
    },
    outerscroll: function (e) {
        if (this.data.ifTypeSelectedShow === (e.detail.scrollTop > 400)) return;
        this.setData({
            ifTypeSelectedShow: e.detail.scrollTop > 400
        });
    },
    canvasChange (e) {
        let index = parseInt(e.detail.value);
        this.setData({
           canvasIndex: index
        });
        this.ecComponents[index].init((canvas, width, height) => {

            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });

            this.setChart(this.data.charts[index], chart);

            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
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
    onLoad: function () {
        service.getApp(
            (res) => {
                this.setData({
                    appOutline: res.data,
                    charts: res.charts
                });

                wx.setNavigationBarTitle({ title: this.data.appOutline.title });

                this.ecComponents.push(this.selectComponent('#preview-chart-1'));
                this.ecComponents.push(this.selectComponent('#preview-chart-2'));
                this.ecComponents.push(this.selectComponent('#preview-chart-3'));

                this.ecComponents[0].init((canvas, width, height) => {

                    // 获取组件的 canvas、width、height 后的回调函数
                    // 在这里初始化图表
                    const chart = echarts.init(canvas, null, {
                        width: width,
                        height: height
                    });

                    this.setChart(res.charts[0], chart);

                    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                    return chart;
                });

                // for (let i = 0; i < res.charts.length; i++) {
                //     this.ecComponents[i].init((canvas, width, height) => {
                //
                //         // 获取组件的 canvas、width、height 后的回调函数
                //         // 在这里初始化图表
                //         const chart = echarts.init(canvas, null, {
                //             width: width,
                //             height: height
                //         });
                //
                //         // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                //         this.chart = chart;
                //
                //         this.setChart(res.charts[i]);
                //
                //         // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                //         return chart;
                //     });
                // }

            },
            (res) => {
            },
            this.data.appId
        );
        service.getAppQuotas(
            (res) => {
                this.data.batch.data = res.batch;
                this.data.online.data = res.online;
                this.data.service.data = res.service;
                this.data.performance.data = res.performance;
                this.data.property.data = res.property;
                this.setData({
                    batch: this.data.batch,
                    online: this.data.online,
                    service: this.data.service,
                    performance: this.data.performance,
                    property: this.data.property
                });
                wx.stopPullDownRefresh();
            },
            (res) => {
                wx.stopPullDownRefresh();
            },
            this.data.appId
        )
    },

    onReady: function () {
        this.ecComponents = [];
        computed(this, {
            canvasNavs () {
                let s = this.data.canvasLabels.map(function (e) {
                    return {
                        name: e,
                        checked: false
                    }
                });
                s[this.data.canvasIndex].checked = true;

                return s;
            }
        });
    },

    onPullDownRefresh: function () {
        wx.startPullDownRefresh();
        this.onLoad();
    },

    setChart(bundle, chart) {
        let type;
        switch (bundle.chart.chartType) {
            case 'bar':
                type = bar;
                break;
            case 'line':
                type = line;
                break;
            case 'pie':
                type = pie;
                break;
            case 'gauge':
                type = gauge;
                break;
            case 'map':
                type = map;
                echarts.registerMap('china', geoJson);
                break;
        }

        let option = type.getOption(bundle.data, bundle.chart, TL);

        chart.setOption(option);
    }
});