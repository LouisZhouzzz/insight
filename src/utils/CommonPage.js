const service = require('../service/test');
let globalData = getApp().globalData;

export default class CommonPage {
  constructor (...args) {
  }
}

CommonPage.prototype.onFormSubmit = function (e) {
  service.patchUserFormId(globalData.openid, e.detail.formId)
    .then(res => {
      console.log('formid发送成功！');
    })
    .catch(res => {
      console.log('formid发送失败');
    });
};