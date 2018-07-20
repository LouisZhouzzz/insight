var service = require('service.js');

var testModule = {};

Object.keys(service).forEach(function (e) {
    this[e] = test;
}, testModule);

function test (success, fail) {
    wx.showNavigationBarLoading();
    setTimeout(() => {
        wx.hideNavigationBarLoading();
        success();
    } , 1000);
}



module.exports = testModule;