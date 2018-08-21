/*
 ***HotApp云笔记，基于HotApp小程序统计云后台
 ***免费云后台申请地址 https://weixin.hotapp.cn/cloud
 ***API 文档地址：https://weixin.hotapp.cn/api
 ***小程序技术讨论QQ群：173063969
 */
//引入全局
const app = getApp();
Page({
  data: {
    flag: true,//加号的控制打开/关闭
    userInfo: [],//用户信息，用于头像显示

    feedback: [
      {
        content: '你可以留下联系方式，文本，图片，进行反馈',
        content_type: 0,
        contract_info: '',//弹出框input值
        myDate: '',
        role: true,
        img: '../../img/feedback/hotapp_01_07.png',
      }
    ],//返回数据

    minutes: '',//分钟间隔
    addinput: '',//清楚input框的值
    sendflag: false,//发送按钮控制
    networkType: '',//判断当前网络类型
    addtell: {
      addtellHidden: true,//弹出框显示/隐藏
    },
  },

  onLoad (options) {
    // 页面监控
    //app.globalData.hotapp.count(this)
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  bindfocus (e) {
    wx.getNetworkType({
      success: (res) => {
        if (res.networkType === 'fail') {
          wx.showToast({
            title: '当前网络不可用',
            icon: 'loading',
            duration: 10000
          })
        } else {
          wx.hideToast()
        }
        this.setData({
          networkType: res.networkType// 返回网络类型2g，3g，4g，wifi
        })
      }
    });
    //当sendflag有值的时候，设置发送按钮显示
    this.setData({
      sendflag: true
    })
  },

  bindblur (e) {
    this.setData({
      sendflag: false
    });
    //提交输入框的数据
    if (e.detail.value !== '' && this.data.networkType !== 'fail') {

      //获取当前时间
      let myDate = new Date();
      let hours = myDate.getHours();       //获取当前小时数(0-23)
      let minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
      //如果两次时间
      let mydata = minutes === this.data.minutes ? '' : hours + ':' + minutes;

      //消息数组，系统默认
      let newfeedback = this.data.feedback;
      newfeedback.push({
        content: e.detail.value,
        content_type: 0,
        contract_info: this.data.contract_info,
        myDate: mydata,
        role: false,
        img: this.data.userInfo.avatarUrl,
      }, {
        content: '【系统消息】：您的反馈已收到！谢谢！',
        content_type: 0,
        contract_info: '',
        myDate: '',
        role: true,
        img: "../../img/feedback/hotapp_01_07.png"
      });

      //修改feedback,设置addaddinput为[]值为空
      this.setData({
        addinput: [],
        sendflag: false,
        minutes: minutes,
        feedback: newfeedback,

      });
      //上传文字到服务器

      app.globalData.hotapp.feedback(e.detail.value, 0, this.data.contract_info, function (res) {

        wx.showToast({
          title: '已成功反馈',
          icon: 'success',
          duration: 1000
        })
      })
    }


  },

  bindtapimg () {
    //打开添加图片框
    this.setData({
      flag: false
    })
  },
  closeimg () {
    //闭合添加图片框
    this.setData({
      flag: true
    })
  },
  footaddimg () {
    //使用hotapp接口获取图片路径
    app.globalData.hotapp.uploadFeedbackImage(res => {
      //添加到反馈数组
      let newfeedback = this.data.feedback;

      if (!res) {
        console.log(res);
        return;
      }

      newfeedback.push({
        content: res,
        content_type: 1,
        contract_info: '',
        role: false,
        img: this.data.userInfo.avatarUrl,
      }, {
        content: '【系统消息】：您的反馈已收到！谢谢！',
        content_type: 0,
        contract_info: this.data.contract_info,
        role: true,
        img: "../../img/feedback/hotapp_01_07.png"
      });
      //修改feedback
      this.setData({
        flag: true,
        feedback: newfeedback
      });
      //添加图片到服务器

      app.globalData.hotapp.feedback(res, 1, this.data.contract_info, function (res) {
        console.log(res)
      })

    })

  }
});