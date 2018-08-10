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

  onFormSubmit (e) {
    service.patchUserFormId(
      (res) => {
        console.log(res);
      },
      (res) => {
      },
      globalData.openid,
      e.detail.formId
    );
  },


  // 取消收藏
  delCollection(e) {
    let diagramId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.openConfirmModal().then(
      () => {
        service.toggleUserDiagram(
          (res) => {
            let collections = this.data.collections;
            collections.splice(index, 1);
            this.setData({
              collections: collections
            })
          },
          (res) => {

          },
          globalData.openid,
          diagramId,
          false
        )
      },
      () => {
        console.log('取消了呗~');
      }
    );
  },

  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        }
      },
      complete: () => {
        this.setData({
          ifLoading: false
        })
      }
    });

    service.getUserDiagrams(
      (res) => {
        this.setData({
          collections: res.records
        });
      },
      (res) => {
      },
      globalData.openid
    );
  }
});