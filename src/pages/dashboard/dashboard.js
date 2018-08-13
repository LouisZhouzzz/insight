const service = require('../../service/test');
let globalData = getApp().globalData;

Page({
  data: {
    confirmModalShow: false,
    labels: ['收藏夹', '其他功能'],
    authorized: false,
    ifLoading: true,
    userInfo: {
      gender: '男',
      avatarUrl: '../../img/svgs/avatar.svg',
      nickName: '用户'
    },
    settings: [
      {
        "title": "官方公告",
        "url": '../dashboard-announcement/dashboard-announcement'
      }, {
        "title": "意见反馈",
        "url": '../dashboard-feedback/dashboard-feedback'

      }, {
        "title": "留言板",
        "url": '../dashboard-message-board/dashboard-message-board'
      }]
  },

  onLoad() {
    wx.setNavigationBarTitle({title: '慧眼'});
    // 查看是否授权

    service.wxSetting()
      .then(res => {
        this.setData({
          ifLoading: false
        });
        if (!res.authSetting['scope.userInfo']) return;
        service.wxUserInfo().then(res => {
          this.setData({
            userInfo: res.userInfo,
            authorized: true
          })
        })
      })
      .catch(res => {
        console.log('获取用户配置失败！' + res);
      });

    this.getUserDiagrams();

  },

  onShow() {
    if (globalData.ifCollectionsChange.dashboard) this.getUserDiagrams();
  },

  onSettingItemTap () {

  },

  getUserDiagrams() {
    service.getUserDiagrams(globalData.openid)
      .then(
        (res) => {
          this.setData({
            collections: res.data.records
          });
          globalData.dashboard = false
        })
      .catch(res => {
        console.log('收藏夹信息加载失败！' + res)
      })
  },

  //打开确认框
  openConfirmModal() {
    this.setData({
      confirmModalShow: true
    });
    return new Promise((resolve, reject) => {
      this.onConfirmEvent = (e) => {
        if (e.detail) resolve();
        else reject();
        this.setData({
          confirmModalShow: false
        });
      }
    })
  },

  getUserInfo(e) {
    if (!e.detail.userInfo) return;

    if (e.currentTarget.dataset.url)
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });

    this.setData({
      userInfo: e.detail.userInfo,
      authorized: true,
    });
  },

  viewAnnouncements (e) {
    if (!e.detail.userInfo) return;

    wx.navigateTo({
      url: '../dashboard-announcement/dashboard-announcement'
    });

    this.setData({
      userInfo: e.detail.userInfo,
      authorized: true,
    });
  },

  onFormSubmit(e) {
    service.patchUserFormId(globalData.openid, e.detail.formId)
      .then(res => {
        console.log('formid发送成功！');
      })
      .catch(res => {
        console.log('formid发送失败');
      });
  },

  // 取消收藏
  delCollection(e) {
    let diagramId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.openConfirmModal().then(
      (res) => {
        service.toggleUserDiagram(globalData.openid, diagramId, false)
          .then(res => {
            let collections = this.data.collections;
            collections.splice(index, 1);
            this.setData({
              collections: collections
            });
            globalData.ifCollectionsChange.monitor = true;
          })
          .catch(res => {
            console.log('取消收藏失败！ ' + res)
          })
      }
    ).catch(res => {
      console.log('取消了呗~');
    });
  }
});