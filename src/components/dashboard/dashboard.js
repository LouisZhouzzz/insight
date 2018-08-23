const service = require('../../service/test');
// let globalData = getApp().globalData;
const App = getApp();

Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal)
          this.onShow();
        else
          this.onHide();
      }
    }
  },
  data: {
    confirmModalShow: false,
    labels: ['收藏夹', '其他功能'],
    authorized: false,
    ifLoading: true,
    userInfo: {
      gender: '男',
      avatarUrl: '../../img/svgs/avatar.svg',
      nickName: '用户'
    }
  },

  attached() {
  },

  methods: {
    onLoad() {
      // 查看是否授权，若已授权直接获取授权信息
      this.getUserInfoBySetting();
    },
    onShow() {
      if (App.globalData.openid) {
        this.getUserDiagrams();
      } else {
        service.getLoginState()
          .then(res => {
            App.globalData.openid = res.data.openid;
            this.getUserDiagrams();
            this.getUserInfoBySetting();
          })
          .catch(res => {
              wx.showToast({
                title: '登录失败，无法获取收藏夹。',
                icon: 'none'
              });
            }
          )
      }
    },
    onHide() {

    },

    getUserInfoBySetting() {
      service.getUserInfoBySetting()
        .then(res => {
          this.setData({
            ifLoading: false
          });
          if (!res.userInfo) return;
          this.setData({
            userInfo: res.userInfo,
            authorized: true
          });
          App.globalData.userInfo = res.userInfo;
        })
        .catch(res => {
          wx.showToast({
            title: '收藏夹信息加载失败！',
            icon: 'none',
            duration: 2000
          });
        });
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
      App.globalData.userInfo = e.detail.userInfo;
    },

    getUserDiagrams() {
      service.getUserDiagrams(App.globalData.openid)
        .then(
          (res) => {
            this.setData({
              collections: res.data.records
            });
            App.globalData.dashboard = false
          })
        .catch(res => {
          wx.showToast({
            title: '收藏夹信息加载失败！',
            icon: 'none',
            duration: 2000
          });
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

    viewAnnouncements(e) {
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
      service.patchUserFormId(App.globalData.openid, e.detail.formId)
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

      this.openConfirmModal()
        .then((res) => {
            wx.showLoading({
              title: '删除中...',
              mask: true
            });
            service.toggleUserDiagram(App.globalData.openid, diagramId, false)
              .then(res => {
                let collections = this.data.collections;
                collections.splice(index, 1);
                this.setData({
                  collections: collections
                });
                App.globalData.ifCollectionsChange.monitor = true;

                wx.hideLoading();
                wx.showToast({
                  title: '取消收藏成功',
                });

              })
              .catch(res => {
                wx.hideLoading();
                wx.showToast({
                  title: '取消收藏失败',
                  icon: 'none'
                })
              })
          }
        ).catch(res => {
        console.log('取消了呗~');
      });
    }
  }
});