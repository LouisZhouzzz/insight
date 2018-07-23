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
        service.getAppList(
            () => {
                this.setData({
                    apps: [
                        {
                            id: "mock id",
                            title: "数字园区导航",
                        }, {
                            id: "mock id",
                            title: "生酮营养师"
                        }, {
                            id: "mock id",
                            title: "考勤打卡应用"
                        }, {
                            id: "mock id",
                            title: "快眼看书"
                        }, {
                            id: "mock id",
                            title: "工行云服务"
                        }, {
                            id: "mock id",
                            title: "无聊的应用"
                        }, {
                            id: "mock id",
                            title: "不存在的小游戏"
                        }
                    ]
                });
            },
            () => {}
        );
    },

    onFormSubmit: function (e) {
        service.sendFormId(
            (res) => {
                console.log('FormId:' + e.detail.formId + ', 发送成功。');
            },
            (res) => {},
            e.detail.formId
        );
    },
});