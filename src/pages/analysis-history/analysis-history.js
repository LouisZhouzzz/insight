const service = require('../../service/test');
const computed = require('../../utils/vuelike').computed;

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
        service.getHandledExceptions(
            (res) => {
                this.setData({
                    records: res.records,
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
            }, this.data.page, this.data.size);
    },

    onReady: function () { // 监听页面初次渲染完成
        computed(this, {
            ifMore: function () { // 判断是否存在更多数据
                return this.data.page * this.data.size === this.data.records.length
            }
        })
    },

    onPullDownRefresh: function () {
        if (this.data.ifLoading || !this.data.ifMore) return;
        wx.startPullDownRefresh();
        this.onLoad();
    },

    onReachBottom: function() {
        this.loadMoreRecords();
    },

    loadMoreRecords: function () {
        if (this.data.ifLoading || !this.data.ifMore) return;
        this.setData({
            ifLoading: true
        });
        service.getHandledExceptions(
            (res) => {
                this.data.records.push(res.records);
                this.setData({
                    records: this.data.records,
                    page:  this.data.page + 1,
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