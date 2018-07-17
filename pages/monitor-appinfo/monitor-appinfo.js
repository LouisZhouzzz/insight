// pages/monitor-appinfo/monitor-appinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: getApp().globalData.windowHeight,
    swiperIndex: 0,
    checkedKey: 'batch',
    typeItems: {
      batch: '批量',
      online: '联机',
      service: '业务',
      performance: '性能',
      property: '资源'
    },
    diagramListData: { // 记录全部图表名
      batch: [
        {
          title: '应用服务器CPU使用率',
          ifCollected: true
        }, {
          title: '数据库服务器CPU使用率',
          ifCollected: false
        }, {
          title: '数据库DB TIME',
          ifCollected: false
        }, {
          title: '单次耗时过长语句',
          ifCollected: false
        }, {
          title: '数据库硬解析次数过多',
          ifCollected: false
        }
      ],
      online: [
        {
          title: '接口响应时间',
          ifCollected: false
        }, {
          title: '技术类错误',
          ifCollected: true
        }, {
          title: '错误率异常的业务报错',
          ifCollected: true
        }, {
          title: '交易成功率',
          ifCollected: false
        }, {
          title: '联机小批量流量监控',
          ifCollected: false
        }
      ],
      service: [],
      performance: [],
      property: []
    }
  },

  collect: function (e) {
    this.data.diagramListData[this.data.checkedKey][e.currentTarget.dataset.index].ifCollected = !this.data.diagramListData[this.data.checkedKey][e.currentTarget.dataset.index].ifCollected;
    this.setData({
      diagramListData: this.data.diagramListData
    });
  },

  swip: function (e) {
    this.setData({
      swiperIndex: this.data.swiperIndex ? 0 : 1
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