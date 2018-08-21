const service = require('../../service/test');
const globalData = getApp().globalData;

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
    status: 'loading'
  },
  attached(options) {
  },
  methods: {
    onLoad () {
      this.getApps();
    },
    onShow () {

    },
    onHide () {

    },
    getApps () {
      this.setData({
        status: 'loading'
      });
      service.getApps()
        .then(
          (res) => {
            this.setData({
              apps: res.data.records,
              status: 'normal'
            });
          })
        .catch(
          (res) => {
            this.setData({
              status: 'error'
            });
            console.log('加载应用列表失败！' + res);
          }
        );
    },
    onFormSubmit(e) {
      service.patchUserFormId(globalData.openid, e.detail.formId)
        .then(res => {
          console.log('formid发送成功！');
        })
        .catch(res => {
          console.log('formid发送失败');
        });
    }
  }
});