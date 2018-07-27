const service = require('../../service/test');

Page({
    /**
     * 页面的初始数据
     */
    data: {
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
        service.getApp(
            (res) => {
                this.setData({
                    appOutline: res.data
                });
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

    onPullDownRefresh: function () {
        wx.startPullDownRefresh();
        this.onLoad();
    }
});