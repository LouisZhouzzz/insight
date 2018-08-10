const service = require('../../service/test');
let globalData = getApp().globalData;

Page({
  data: {
    confirmModalShow: false,
    labels: ['收藏夹', '设置'],
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
        if (!res.authSetting['scope.userInfo']) return;
        service.wxUserInfo().then(res => {
          this.setData({
            userInfo: res.userInfo,
            authorized: true,
            ifLoading: false
          })
        })
      })
      .catch(res => {
        console.log('获取用户配置失败！' + res);
      });

    service.getUserDiagrams(globalData.openid)
      .then(
        (res) => {
          this.setData({
            collections: res.data.records
          });
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
            })
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