const service = require('../../service/test');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        apps: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        service.getApps(
            (res) => {
                this.setData({
                    apps: res.records
                });
            },
            (res) => {}
        );
    },

    onFormSubmit: function (e) {
        service.patchUserFormId(
            (res) => {
                console.log(res.msg);
            },
            (res) => {},
            'user id',
            e.detail.formId
        );
    },
});