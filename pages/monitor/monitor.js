var service = require('../../service/test');

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
});