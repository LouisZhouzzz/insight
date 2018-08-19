const service = require('../../service/test');
let globalData = getApp().globalData;
let showToast = require('../../utils/util').showToast;

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
    // 查看是否授权，若已授权直接获取授权信息
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
        globalData.userInfo = res.userInfo;
      })
      .catch(res => {
        console.log('获取用户配置失败！' + res);
      });
  },

  methods: {
    onShow () {
      this.getUserDiagrams();
    },
    onHide () {

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
      globalData.userInfo = e.detail.userInfo;
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

              showToast({
                title: '取消收藏成功',
                icon: 'success'
              })
            })
            .catch(res => {
              console.log('取消收藏失败！ ' + res);
              showToast({
                title: '取消收藏失败',
                icon: 'success'
              })
            })
        }
      ).catch(res => {
        console.log('取消了呗~');
      });
    }
  }

  //TODO
  // onShow() {
  //   if (globalData.ifCollectionsChange.dashboard) this.getUserDiagrams();
  // },


});